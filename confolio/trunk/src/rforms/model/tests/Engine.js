/*global rforms, dojo, doh, rdfjson*/
dojo.provide("rforms.model.tests.Engine");
dojo.require("rforms.model.Engine");
dojo.require("rforms.template.ItemStore");
dojo.require("rdfjson.Graph");

var setup = function() {
	this.itemStore = new rforms.template.ItemStore();
	this.template = this.itemStore.createTemplate(rforms.template.tests.template1);
	this.graph = new rdfjson.Graph(rdfjson.tests.graph2);
};

doh.register("Engine test", [
  { name: "First test",
	setUp: setup,
	runTest: function() {
		var binding = rforms.model.match(this.graph, "http://example.org/about", this.template);
		doh.t(binding instanceof rforms.model.GroupBinding);
	}
  }
]);