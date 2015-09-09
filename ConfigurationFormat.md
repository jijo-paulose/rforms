
# RForms-templates #

An RForm-template is a hierarchy of form-items that comes in three flavours, group, text and choice form-item. RForm-templates always come inside of a container structure that contains descriptive information, a list of form items, and an optional default form-item when the container is supposed to correspond to a single RForm-template. The container also contains cached choices, i.e. preprepared values, drawn from ontologies, that are to be displayed and choosen from in dropdown menues etc. Below is the json representation of the RForm-template container, the three kinds of form-items and the choices described and examplified.

# Rforms-templates container #

## Reference ##

| **Key** | **Explanation** |
|:--------|:----------------|
| label   | A user readable label for the entire container. The label is an object containing several translations of the label, the ISO language code is used as key, for example `{en: "Some text", sv: "En text"} |
| description | A user readable longer description to accompany the label, typically provided after the user clicks on the label or some help icon nearby. Same format as for the label. |
| root    | Points to a single group item that is the default RForm-template of this container. |
| auxilliary | An array of items that this container wants to make available. |
| cachedChoices | An indexed set of choices, provided so the client can avoid additional requests. See section on choice item and cached choices further down. |

## Example ##

```
 {
	"label":{"en":"Bibliography", "sv":"Bibliografi"},
	"description":{"en":"Some nice information about books", "sv":"Lite trevlig bokinformation"},
	"root":{
		"type":"group",
		"id":"http://example.ch/books/book",
		"label":{"en":"Book"},
		"constraints":{"http://www.w3.org/TR/rdf-schema/type":"http://xmlns.com/foaf/0.1/Document"},
		"nodetype":"RESOURCE",
		"content":[
			{
				"@type":"text",
				"label":{"en":"Title"},
				"nodetype":"LANGUAGE_LITERAL",
				"property":"http://purl.org/dc/terms/title",
				"cardinality": {"min": 2, "pref": "4", "max": 5}
			},
			{"id":"publisheddate"}
		]
	},
	"auxilliary":[{
			"@id":"publisheddate",
			"type":"text",
			"label":{"en":"Published"},
			"description":{"en":"The date this book was first published"},
			"nodetype":"LITERAL",
			"datatype":"http://www.w3.org/2001/XMLSchema.xsd#date",
			"property":"http://purl.org/dc/terms/date"
		}],
	"cachedChoices": {}
}
```

# Group items #


## Reference ##

| **Key** | **Explanation** |
|:--------|:----------------|
| type    | Must be "group" for group items. |
| id      | A unique identity to allow the group item to be reused. The recommendation is to use full URIs. |
| property | A leading property required to be matched for this group item. For example if the group corresponds to a creator of a resource the leading property could be `http://purl.org/dc/terms/creator`. If the property is left out, the grouping corresponds to the root of an editor, or it is a visual construction that have no effect on the underlying RDF graph. |
| cardinality | An object containing the min, max and preferred cardinality for this item. For example `{min: 0, max: 5, pref: 1}`. If max is not provided there is no limit. The default for group items are min 0, pref 0 and max unlimited. |
| constraints | An object with attribute value pairs corresponding to predicate and objects constraints, that is, for a resource to be matched to this group there must exist a corresponding statements for each pair. A common case is to require a type, that is, `{"http://www.w3.org/TR/rdf-schema/type": "http://example.com/SomeClass"}`. |
| nodetype | The RDF nodetype allowed on the object of the matched statement (only used when a property is provided). Only URI or BLANK is allowed for group items, URI is default. |
| cls     | Array of style-classes that are to be interpreted by the renderer. Special style classes for group items are "table" and "firstcolumnfixedtable". See separate section on style classes. |
| label   | Same as for container |
| description | Same as for container |
| items   | Array of child items may be group, text or choice items. Loops are discouraged although they do work when treated carefully. (The itemstore lazy loads children and the renderer provides user expandable stubs for group items. Note that stubs are only provided for group items that have pref cardinality set to 0, which is the default, so do not change this if you have loops.) |

## Example ##

```
{
	"id":"http://example.com/rforms/author",
	"type":"group",
	"label":{"en":"Author"},
	"description":{"en":"The author of the book"},
	"property":"http://purl.org/dc/terms/publisher",
	"cardinality": {"min": 0, "max": 5},
	"constraints":{"http://www.w3.org/TR/rdf-schema/type":"http://xmlns.com/foaf/0.1/Person"},
	"nodetype":"RESOURCE",
	"cls": ["table"],
	"items":[
		{"id": "http://example.com/rforms/firstname"},
		{"id": "http://example.com/rforms/surame"}
	]
}
```

# Text items #


## Reference ##

| **Key** | **Explanation** |
|:--------|:----------------|
| type    | Must be "text" for text items |
| id      | A unique identity to allow the text item to be reused. The recommendation is to use full URIs. |
| property | A leading property required to be matched for this text item. For  example, `http://purl.org/dc/terms/title` corresponding to the predicate of a RDF statement where the object is specified to be a language controlled literal via the nodeType. The property must always be specified for text items. |
| cardinality | Same as for group except that the default pref cardinality is 1. This means that the editor will by default create an empty field when no value is found. |
| nodetype | The RDF nodetype allowed for the object of the matched RDF statement, for text item the allowed values are ONLY\_LITERAL, LANGUAGE\_LITERAL, DATATYPE\_LITERAL, and URI. |
| datatype | A datatype URI, for example xsd:Integer, only if nodeType is DATATYPE\_LITERAL.&nbsp; |
| cls     | Array of style-classes that are to be interpreted by the renderer. |
| label   | Same as for container |
| description | Same as for container |

## Example ##

```
{
	"id": "http://example.com/rforms/firstname",
	"type": "text",
	"property": "http://xmlns.com/foaf/0.1/firstName",
	"label": {"en":"First name", sv: "Förnamn"},
	"nodetype": "ONLY_LITERAL"
}
```

# Choice items #


## Reference ##

| **Key** | **Explanation** |
|:--------|:----------------|
| type    | Must be "choice" for choice items. |
| id      | A unique identity to allow the choice item to be reused. The recommendation is to use full URIs. |
| property | A leading property required to be matched for  this choice item. For example if the group corresponds to a creator of a  resource the leading property could be http://purl.org/dc/terms/subject. |
| cardinality | Same as for text items. |
| constraints | An object with attribute value pairs  corresponding to predicate and objects constraints, that is, for a  resource to be matched to this group there must exist a corresponding  statements for each pair. A common case is to require a type, that is,  `{"http://www.w3.org/TR/rdf-schema/type":  "http://example.com/SomeClass"}`. |
| nodetype | The RDF nodetype allowed on the object of the  matched statement. Only RESOURCE, URI,  or BLANK is allowed for group items. Default is URI. |
| cls     | Array of style-classes that are to be interpreted by the renderer. |
| label   | Same as for container |
| description | Same as for container |
| ontologyUrl | The URL to an ontology from where dynamic choices are to be retrieved. |
| parentProperty | If the choices are to be organized into a tree, the parentProperty is used to detect the parent child relation from which the tree is derived. For example the `http://www.w3.org/2004/02/skos/core#narrower` relation is a good example of relating the concepts into a tree. |
| hierarchyProperty | If the hierarchy of the tree is built out of resources that are related to the choice resources this can be specified by the hierarchyProperty. A common example is when the tree is when the choices are instances of classes where the tree is constructed from the subclass relationsships between the classes not the instances (choices). Hence, in this case the hierarchyProperty would be `http://www.w3.org/TR/rdf-schema/type` while the parentProperty would be `http://www.w3.org/2000/01/rdf-schema#]subclassOf`. |
| isParentPropertyInverted | Indicates if the parentProperty should be used in the opposite direction. |
| isHierarchyPropertyInverted | Indicated if the hierarchyProperty should be used in the opposite direction. |
| choices | Array of choices, see choice expression below. |

Note, if neither choices or ontologyUrl is provided the choice form item is interpreted to refer to system specific choices. That is, the application that embeds rforms need to implement the methods rforms.getSystemChoice(item, value) and rforms.openSystemChoiceSelector(binding, callback) to get a choice from a uri and open a dialog to select/search for system specific choices respectively.


## Example ##

```
{
	"id":"http://example.com/rforms/subjectVocab",
	"type":"choice",
	"label":{"en":"Subject"},
	"description":{"en":"The book's subject"},
	"nodetype":"RESOURCE",
	"constraints": {"http://www.w3.org/2004/02/skos/core#inScheme":"http://example.com/bookSubjects"},
	"ontologyUrl": "http://example.com/bookOntology",
	"property":"http://purl.org/dc/terms/subject",
	"cardinality": {"min": 0, "max": 3},
	"parentProperty": "http://www.w3.org/2004/02/skos/core#narrower",
}
```

# Choice expression #


## Reference ##

| **Key** | **Explanation** |
|:--------|:----------------|
| value   | A string which corresponds to a URI in most cases even though it can be a BLANK resource, the nodetype for the choice item rules. |
| label   | Same as for container. |
| description | Same as for container. |
| top     | If true the choice is one of the root nodes, only used for choices that are organized into a tree. |
| selectable | If false the choice is not an acceptable choice, only sensible when it is an intermediate levels in a tree that only serves as a visual grouping. |
| children | An array of references to other choices. Each child of the array must be an object that looks like `{_reference: anotherChoiceValue}`. That is, other choices are referenced via their value property. |

## Example ##

```
choices: [{
		"top":true,
		"value": "http://example.com/instanceTop",
		"selectable": false,
		"label": {"sv": "Toppen", "en":"Ze top!"},
		"children":[
			{"_reference": "http://example.com/instance1"},
			{"_reference": "http://example.com/instance2"}
		]
	},{
		"value": "http://example.com/instance1",
		"label": {"sv": "Matematik", "en":"Mathematics"},
		"description": {"sv": "Matematik är ett coolt ämne", "en":"Mathematics is a cool subject"}
	},{
		"value": "http://example.com/instance2",
		"label": {"sv": "Kemi", "en":"Chemistry"}
	}
]
```

# Cached Choices #

The cached choices may be available in an rforms container to minimize the amount of requests. If the choices for a choice item is not provided inline they are always calculated from the ontology specified via the ontolotyUrl key. But a single ontology can serve several choice items with different choices, the array of choices is determined via the constraints, parentProperty, hierarchyProperty, isParentPropertyInverted, and isHierarchyPropertyInverted parameters. Hence, in the cache choices it is not enough to index with respect to the ontologyUrl. The following format is used:
```
cachedChoices: {
    ontologyUrl1: [
	{
		"constraints": {...}, "parentProperty": "...", "hierarchyProperty": "...",
		"isParentPropertyInverted": false, "isHierarchyPropertyInverted": false,
		"choices": [...]
	}, {
		"constraints": {...}, "parentProperty": "...", "hierarchyProperty": "...",
		"isParentPropertyInverted": false, "isHierarchyPropertyInverted": false,
		"choices": [...]
	}],
    ontologyUrl2: [...]
}
```
Note that it is important to have exact the same constraints, parentProperty etc. in the cachedChoices as in the choice item, otherwise there will be no match and a request will be sent to the ontologyUrl instead with the other attributes as parameters.

TODO, describe the parameters in the url.

# Style classes #

| **class** | **Description**|
|:----------|:---------------|
| rformstable | May only be added to groups and assumes that all children form items has a cardinality of 1. There will be one row in the table for each matched group where every child form item get one column. |
| rformsFirstcolumnfixedtable | A variant of th rformstable where the first child is assumed to be a choice form item. The editor automatically generates a row for each of the choices of the choice form item. Nothing will be exposed in the RDF for empty rows.|
| rformsNoneditable | Makes a text or choice form item noneditable. |
| rformsmultiline | Only applies to text form items and makes the text editor to allow multiple lines of text to be edited.|
| rformsexpandable | Only applies to group form items, introduces an expandable section containing all the children. |
| rformsverticalRadioButtons | Forces the radiobuttons to be vertically ordered.|
| rformshorizontalRadioButtons | Forces the radiobuttons to be horixontally ordered, this is the default. |

## PropertyGroup item ##

TODO