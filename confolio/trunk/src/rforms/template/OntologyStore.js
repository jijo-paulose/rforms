/*global dojo, rforms*/
dojo.provide("rforms.template.OntologyStore");
dojo.require("rforms.template.Choice");

dojo.declare("rforms.template.OntologyStore", null, {
	_registry: null,
	constructor: function() {
		this._registry = {};
	},
	importRegistry: function(registry) {
		dojo.mixin(this._registry, registry);
	},
	getChoices: function(choiceUrl, callback) {
		var choices = this._registry[choiceUrl];
		if (choices !== undefined) {
			if (callback === undefined) {
				return choices;
			} else {
				callback(choices);				
			}
		} else {
			//TODO load via xhr and deferred.
		}
	}
});