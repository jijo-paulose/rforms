# Introduction #

RForms does not provide any solutions for storing RDF. Hence, RForms need to be integrated with a server side solution for storing RDF.

In general, as was explained in detail in the [tutorial](Tutorial.md), a RForms editor requries the RForms javascript library, the RForms css, the RForms-template to use and finally the RDF data to edit. We will now focus on how to get the RDF data and the RForm-template from the server side solution.

# HTML Form-based solution (non-AJAX) #
A server side solution that generate html pages which contains RForms based editors or presentations could be based on a wide range of solutions, for instance ASP, PHP or java servlets. The RForms-template and RDF data can be included simply by inserting the corresponding object literals in script tags or as strings in textareas.
See http://code.google.com/p/rforms/source/browse/trunk/samples/editor-gcode-inline-FORM.html for an example how it looks like with inline RDF data and RForm-template in a script tag.

In the next step you have to post the data back to the server. This is simply done with a HTML form that has a save button and a hidden field (named rdfjson) that will contain the RDF data, or rather a rdf/json serialized version of it:
```
<form id="rforms_form" name="rforms" method="POST">
	<input name="rdfjson" id="rdfjson" style="display:none;">
	<input style="float:right;" id="save" type="submit" name="save" value="Save">
</form>
```
There is a javacript that captures the submit event and get the RDF data from the RForms editor:
```
document.getElementById("rforms_form").onsubmit = function() {
	var data = dojo.toJson(graph.exportRDFJSON(), 1);
	document.getElementById("rdfjson").value = data;				
};
```
This is done by getting a clean copy of RDF/JSON from the `rdfjson.Graph` instance via the `exportRDFJSON()` method, check [the full code](http://code.google.com/p/rforms/source/browse/trunk/samples/editor-gcode-inline-FORM.html) for how the graph variable was initialized. The RDF data is now inserted into the input field with id `rdfjson` and the HTML Form is submittet via POST.

# XHR-based solution (AJAX) #
See http://code.google.com/p/rforms/source/browse/trunk/samples/editor-gcode-XHR.html for an example where the RDF data and the RForm-template is loaded via XHR GET and later saved via an XHR POST. Note that this is only an example. A RESTful approach would load RDF data from specific urls and then doing an HTTP PUT to the same URL when saving the RDF data again.

**Note** the XHR-based approach is limited by cross domain restrictions on the XHR object, that is, you cannot load RDF data or RForm-templates from other domains than from where the html page that contains the javascript is loaded from. There is several ways around this, HTTP proxies, [CORS](http://www.w3.org/TR/cors/), script loading with jsonp and client side proxy in java or flash. The HTTP proxy provided to OpenSocial Gadgets is outlined below.

# Open Social gadget http proxy #
The following code is from [the ExperimentGadget.xml](http://code.google.com/p/rforms/source/browse/trunk/samples/ExperimentGadget.xml) that loads RForm-templates (the templateSrc variable) by utilizing the `gadgets.io.makeRequest` call.
```
var params = {};
params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.JSON;
gadgets.io.makeRequest(templateSrc, function(response) {
	var e = new rforms.apps.Experiment({templateObj: dojo.fromJson(response.data), graphObj: {}}, "container");
	e.startup();
});
```
See for example http://code.google.com/p/opensocial-resources/wiki/GadgetsMakeRequest for some examples of how to use the OpenSocial proxy.