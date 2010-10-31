/*global dojo, rforms*/
dojo.provide("rforms.template.OntologyStore");
dojo.require("rforms.template.Choice");

/**
 * Simple store of ontologies to allow reuse across templates and items. 
 */
dojo.declare("rforms.template.OntologyStore", null, {
	//===================================================
	// Private attributes
	//===================================================
	_registry: null,
	
	//===================================================
	// Public API
	//===================================================	
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
	},

	//===================================================
	// Inherited methods
	//===================================================
	constructor: function() {
		this._registry = {};
	}
});