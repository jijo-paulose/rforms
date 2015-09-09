
# A simple RForms driven editor #
We start by going through a simple RForms driven editor, It does not illustrate all the strengths of RForms, rather the focus is on getting the basic understanding on how to include an editor in a webpage.

## Understanding the editor ##
The editor looks like this:
<wiki:gadget url="http://rforms.googlecode.com/svn/trunk/samples/gadgetwrapper.xml" height="250" width="100%" border="0" up\_url="http://rforms.googlecode.com/svn/trunk/samples/editorView-gcode.html"/>
This is an embedding via a simple gadget, you can also see it by following [this link](http://rforms.googlecode.com/svn/trunk/samples/editorView-gcode.html). Or view the [code in SVN](http://code.google.com/p/rforms/source/browse/trunk/samples/editorView-gcode.html).
This sample editor allows editing of titles and authors of a resource. And the authors are represented by their firstname and surname. Note how there is an upper and a lower restrictions on how many titles that is allowed.
## Javascript library loading ##
To start with we need to make sure that the library is loaded. As RForms is built on top of dojo we need to load dojo base as well as the RForms library itself.
```
<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.6.1/dojo/dojo.js" type="text/javascript"></script>
<script type="text/javascript" src="http://rforms.googlecode.com/files/rforms_ROOT.js"></script>
<script type="text/javascript" src="http://rforms.googlecode.com/files/rforms.js"></script>
<script type="text/javascript" src="testdata.js"></script>
```
Note that the `rforms_ROOT.js` is for localization purposes and only provided to avoid cross domain loading issues which occurs when dojo and rforms is loaded from different domains (googleapis.com and googlecode.com). Hence, a proper installation of RForms, downloaded, built and integrated into your application of choice this script can, and should, be removed to benefit from the full localization of features that are provided with dojo.
Compare with [code in SVN](http://code.google.com/p/rforms/source/browse/trunk/samples/editorView-gcode.html) and [editorView-build.html](http://code.google.com/p/rforms/source/browse/trunk/samples/editorView-build.html) (the localization file is included in the -build variant in the SVN to better support loading via the `file:///` protocol).

We also load the [testdata.js](http://code.google.com/p/rforms/source/browse/trunk/samples/testdata.js) javascript which contains some tes RDF data and an test RForm-template, see below for a discussion of the formats used.

Even though we already have included the libraries via script tags, it good custom to declare which classes we aim to use from this file, this is similar to the good practice of explicit import statements in java. In addition, if we are not running a built version of RForms, this step is neccessary as javascript is loaded on the fly.
```
dojo.require("rforms.template.ItemStore");		
dojo.require("rdfjson.Graph");
dojo.require("rforms.model.Engine");
dojo.require("rforms.view.Editor");
```
The `dojo.require` statements have to be in a separate script tag that is after the script tags that bootstrap dojo and include RForms.

## Include neccessary CSS ##
Here two things are important, first you need to include the dojo theme css and the RForms css:
```
<style>
	@import "http://ajax.googleapis.com/ajax/libs/dojo/1.6.1/dijit/themes/tundra/tundra.css";
	@import "http://rforms.googlecode.com/files/rforms.css";
</style>
```
Secondly you need to provide the dojo theme class somewhere higher up in the DOM tree from where the editor is positioned, in this case it is on the body element:
```
<body class="tundra">
```

## Provide some RDF ##
The following RDF, included in the [testdata.js](http://code.google.com/p/rforms/source/browse/trunk/samples/testdata.js) file, contains three statements on the `http://example.org/about`, two with the dcterms:title predicate and one with the dcterms:creator predicate pointing to a blank node. The blank node is the subject in three additional statements indicating it to be a foaf:Person (using the predicate rdf:type) and providing a foaf:firstName of "Anna" and a foaf:surname of "Wilder". In layman-terms, the rdf expressions expresses that the resource is titled "Anna's Homepage" in english and "Annas hemsida" in swedish and that it is created by a person named "Anna Wilder". The format used is [RDF/JSON](http://docs.api.talis.com/platform-api/output-types/rdf-json).
```
rdfSrc = {
  "http://example.org/about" : {
	"http://purl.org/dc/terms/title"       : [ { "value" : "Anna's Homepage", "type" : "literal", "lang" : "en" },
						   { "value" : "Annas hemsida", "type" : "literal", "lang" : "sv" } ],
	"http://purl.org/dc/terms/creator"     : [ { "value" : "_:person", "type" : "bnode" } ]
  },
  "_:person" : {
	"http://www.w3.org/TR/rdf-schema/type" : [ { "value" : "http://xmlns.com/foaf/0.1/Person", "type" : "uri"}],
	"http://xmlns.com/foaf/0.1/firstName"  : [ { "value" : "Anna", "type" : "literal" } ] ,
	"http://xmlns.com/foaf/0.1/surname"    : [ { "value" : "Wilder", "type" : "literal" } ]
  }
};
```
In the sample editor code the RDF is provided as a hardcoded object-literal assigned to the variable `rdfSrc`. This is realistic if the HTML page where the editor resides is being generated on the server. The server side typically has access to a database from where relevant RDF can be extracted. But this is not the only way to get a hold of RDF. Another option is to make an XHR request yielding the RDF. Information about how this is done, both for retrieving and saving rdf is discussed in the ServerIntegration page or for that matter in the javascript toolkit of your choice, for example [Dojo](http://dojotoolkit.org) or [jQuery](http://jquery.com/).

## Provide an RForm-template ##
Below is an actual example of how a configuration, an RForm-template, looks like. The example template, loaded from the [testdata.js](http://code.google.com/p/rforms/source/browse/trunk/samples/testdata.js) file, captures a title and a creator represented as a firstname and surname. Further down we discuss individual parts of the RForm-template in more detail.
```
templateSrc = {
    "root":{
	"type":"group",
	"content":[
	    {
		"type":"text",
		"nodetype":"LANGUAGE_LITERAL",
		"property":"http://purl.org/dc/terms/title",
		"cardinality": {"min": 2, "pref": "4", "max": 5},
		"label":{"en":"Title"},
		"description":{"en":"A short title of the resource"}
	    },{
		"type":"group",
		"nodetype":"RESOURCE",
		"label":{"en":"Creator"},
		"property":"http://purl.org/dc/terms/creator",
		"cardinality": {"min": 0, "max": 5},
		"constraints":{"http://www.w3.org/TR/rdf-schema/type":"http://xmlns.com/foaf/0.1/Person"},
		"content":[
		    {
			"type":"text",
			"nodetype":"ONLY_LITERAL",
			"property":"http://xmlns.com/foaf/0.1/firstName",
			"cardinality": {"min": 1, "max": 1},
			"label":{"en":"First name"}
		    },{
			"type":"text",
			"nodetype":"ONLY_LITERAL",
			"property":"http://xmlns.com/foaf/0.1/surname",
			"cardinality": {"min": 1},
			"label":{"en":"Surname"}
		    }
		]
	    }
	]
    }
};
```
Just as for the section on RDF above, the RForm-template is provided as a hardcoded object-literal assigned to a variable, in this case to the variable `templateSrc`. Again, see the ServerIntegration page for other options on how to get a hold of RForm-templates.

### The container and the root ###
In this example the RForm-templates container is a object with only a single attribute - `root`. Further attributes are possible like `cachedChoices` and `auxilirary`, more in the [RForm-template container reference](ConfigurationFormat#Rforms-templates_container.md). The root contains a [Group form item](ConfigurationFormat#Group_items.md) which is indicated by the `type` attribute having the value `group`. A group always contains an array of children form items given by the `content` attribute.

### The title ###
The title is captured by a _text form item_ and is the first child of the root, that is the first object in the `content` attribute of the root.
```
{
	"type":"text",
	"nodetype":"LANGUAGE_LITERAL",
	"property":"http://purl.org/dc/terms/title",
	"cardinality": {"min": 2, "pref": "4", "max": 5},
	"label":{"en":"Title"},
	"description":{"en":"A short title of the resource"}
}
```
This is a text form item becaus the `type` attribute says `text`. This means it is supposed to match a triple where the subject is the resource from the parent group form item (the root) and the predicate should be matched by the value of the `property` attribute. In addition, the object of any matched literal must correspond to what the `nodetype` attribute proscribes. In this case it says it should match a literal with a language. For other options see the [text form item reference](ConfigurationFormat#Text_items.md).

The cardinality specifies the `min` and `max` number of triples that should be supported by the editor. The `pref` indicates the amount of preferred fields that should be available when the editor is opened, that is, even if there is only two matching triples, two additional rows will be generated by default in the form. Note that these restrictions are provided just for illustrating what can be done and does not represent a typical situation for titles. If more than four titles are found in the RDF, they will be displayed in the editor, but you cannot add more, and if you remove the extra titles you will not be able to recreate more than 4 of them from the editor interface.

The `label` attribute provides a set of language coded labels to show in front or above the text values, depending on the locale of your environment the most relevant language coded label will be displayed. Finally, the `description` attribute provides a longer helpful text that often is shown as a tooltip or after a click on the label.

### The creator ###
We use a group form item to capture a creator, that is, a blank node typed as `foaf:Person` pointed to by a `dcterms:creator` property since we do not want to expose the identifier of the blank node in a text field. Instead of a text field, the creator will be exposed by children form items, in this case two text form items, one for the firstname and one for the surname.

```
{
	"type":"group",
	"nodetype":"RESOURCE",
	"property":"http://purl.org/dc/terms/creator",
	"cardinality": {"min": 0, "max": 5},
	"constraints":{"http://www.w3.org/TR/rdf-schema/type":"http://xmlns.com/foaf/0.1/Person"},
	"label":{"en":"Creator"},
	"content":[
	    ...
	]
}
```
Even though the group form item will have no explicit input field for itself as it relies on the children form items for this, it will provide the possibility to add new or remove entire person constructs. This is controlled by the `cardinality` attribute, just as how it works for text form items. Please, if unsure of how this works, take a look on the running example (for example the embedded form at the [top of this page](#A_simple_RForms_driven_editor.md)) and experiment with adding and removing creators. Note the difference between adding an entire creator and adding just an additional surname inside of one creator. In this case we have arbitrarily constrained the editor to allow only up to 5 creators.

To make sure we match correct triples we have specified the property to be the `dcterms:creator`, the object to be a `RESOURCE` (which includes blank nodes) and also the `constraint` attribute that indicates that the blank node will have to be typed `foaf:Person`.

The children form items in the `content` attribute are not discussed further as they work just like the title, see discussion above.

Finally, the creator construction in the form is a bit bulky with two subrows for each creator added. An alternative is to use the table editing mode of RForms, this mode is triggered by adding the `rformsTable` class in the `cls` attribute on the group form item:
```
"cls": ["rformsTable"],
```
In this case all the children form items are forced to have a max and min cardinality of 1, hence the cardinality information can be left out for them. You can see how this looks in the embedded form at the [bottom of this page](#Experiment_yourself.md), where you also can experiment by changing the RForm-template directly.

## Init the editor ##
To make sure we do not try to modify the document structure before it has finished loading, or before some javascript dependency indicated via `dojo.require` is loaded the code that initiates the editor has to be inside of a callback. Dojo provides such a mechanism:
```
dojo.addOnLoad(function() {
		var itemStore = new rforms.template.ItemStore();
	 	var template = itemStore.createTemplate(tesdata.templateSrc);
		var graph = new rdfjson.Graph(testdata.rdfSrc);
		var binding = rforms.model.match(graph, "http://example.org/about", template);
		new rforms.view.Editor({template: template, binding: binding}, "compactView");
	});
```
Now, lets try to understand the code in the callback:
### Creating an `rforms.template.Template` ###
```
		var itemStore = new rforms.template.ItemStore();
	 	var template = itemStore.createTemplate(testdata.templateSrc);
```
In addition to the JSON representation of the RForm-template there is a javascript class [rforms.template.Template](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/template/Template.js). This class encapsulates some of the business logic associated with the JSON representation, especially when some of the form items are referenced rather than inline.
The [rforms.template.ItemStore](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/template/ItemStore.js) is responsible for loading the JSON representation of the RForm-template containers into `rforms.template.Template`'s and their constituents as well as indexing and assembling them into larger templates when needed.

### Creating an `rdfjson.Graph` ###
```
		var graph = new rdfjson.Graph(rdfSrc);
```
Dealing directly with object-literal representations of RDF/JSON is quite easy, especially if compared with working with XML-DOM representations of RDF/XML. Still, the API provided by [rdfjson.Graph](http://code.google.com/p/rforms/source/browse/trunk/src/rdfjson/Graph.js) is quite useful for protecting the developer from some idiosyncraties of the format, for instance managing repeated properties. It also provides additional functionality like a mechanism to search for triples as well as having a representation of a triple via the [rdfjson.Statement](http://code.google.com/p/rforms/source/browse/trunk/src/rdfjson/Statement.js) class that allows a triple to be temporarily unasserted,

### Creating an `rforms.view.Editor` ###
```
		var binding = rforms.model.match(graph, "http://example.org/about", template);
		new rforms.view.Editor({template: template, binding: binding}, "compactView");
```
Before we create the editor we have to use the template to match relevants part of the RDF graph. This is achieved by calling the `rforms.model.match` method (defined in [rforms.model.Engine.js](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/model/Engine.js)) that creates a hierarchical binding tree of [rforms.model.Binding's](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/model/Binding.js) which roughly speaking corresponds to the pairing of a RDF triple with a form item, that is a [rdfjson.Statement](http://code.google.com/p/rforms/source/browse/trunk/src/rdfjson/Statement.js) with a [rforms.template.Item](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/template/Item.js). Note that the `rforms.mode.match` method requires not only a graph and a template but also which resource, indicated by a URI, to start the matching process from.

Now we have all ingredients to create the RForms editor, we use the [rforms.view.Editor](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/view/Editor.js) class. It takes both the template and the top level binding as input. The last parameter indicates the id of an existing DOM node where the editor should be inserted, optionally an actual DOM node instance can be provided instead of the id.

If an RForms presenter is required rather than an editor, just replace the [rforms.view.Editor](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/view/Editor.js) class with the [rforms.view.Presenter](http://code.google.com/p/rforms/source/browse/trunk/src/rforms/view/Presenter.js) class.

# Experiment yourself #
This small webapp provides four tabs containing an RForms editor, RForms presenter, a two text-editors containing an RForm-template and RDF data respectively. It allows you to experiment by changing the RDF data and see the results in the editor, or vice versa, change in the editor and see the result in the RDF data. You can also see how the RForms presenter shows the RDF data. Finally you can try to change the RForm-template, for instance to include more fields, both the editor and the presenter will reflect the changes.
<wiki:gadget url="http://rforms.googlecode.com/svn/trunk/samples/gadgetwrapper.xml" height="500" width="100%" border="0" up\_url="http://rforms.googlecode.com/svn/trunk/samples/tutorial-gcode.html"/>