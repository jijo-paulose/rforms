/*global dojo, rforms*/
dojo.provide("rforms.template.ItemStore");
dojo.require("rforms.template.Item");
dojo.require("rforms.template.Template");
dojo.require("rforms.template.Group");
dojo.require("rforms.template.PropertyGroup");
dojo.require("rforms.template.Text");
dojo.require("rforms.template.Choice");
dojo.require("rforms.template.OntologyStore");

/**
 * Keeps a registry of templates and reusable items.
 * Use the createTemplate method to create templates from a source
 * json structure, if the structure contains reusable items they are
 * created and stored separately as well. 
 */
dojo.declare("rforms.template.ItemStore", null, {
	//===================================================
	// Private Attributes
	//===================================================
	_registry: null,
	_tRegistry: null,
	_ontologyStore: null,
	
	//===================================================
	// Public API
	//===================================================
	getTemplate: function(id) {
		return this._tRegistry[id];
	},
	getItem: function(id) {
		return this._registry[id];
	},
	createTemplate: function(source) {
		if (dojo.isArray(source.auxilliary)) {
			this._createItems(source.auxilliary);
		}
		if (dojo.isObject(source.cachedChoices)) {
			this._ontologyStore.importRegistry(source.cachedChoices);
		}
		var t = new rforms.template.Template(source, this._createItem(source.root), this);
		if (t["@id"]) {
			this._tRegistry[t["@id"]] = t;
		}
		return t;
	},

	//===================================================
	// Inherited methods
	//===================================================
	constructor: function(ontologyStore) {
		this._registry = {};
		this._tRegistry = {};
		this._ontologyStore = ontologyStore || new rforms.template.OntologyStore();
	},
	
	//===================================================
	// Private methods
	//===================================================
	_createItems: function(sourceArray) {
		return dojo.map(sourceArray, function(child) {
			return this._createItem(child);
		}, this);
	},
	_createItem: function(source) {
		var item;
		if (source.hasOwnProperty("@type")) {
			switch(source["@type"]) {
			case "text":
				item = new rforms.template.Text(source);
				break;
			case "choice":
				item = new rforms.template.Choice(source, this._ontologyStore);
				break;
			case "group":
				item = new rforms.template.Group(source, this._createItems(source.content || []));
				break;
			case "propertygroup":
				item = new rforms.template.PropertyGroup(source, this._createItems(source.content || []));
				break;
			}
			if (source["@id"] !== undefined) {
				this._registry[source["@id"]] = item;
			}
			return item;
		} else {
			if (source["@id"] === undefined) {
				throw "Cannot create subitem, '@type' for creating new or '@id' for referencing external are required.";
			}
			if (this._registry[source["@id"]] === undefined) {
				throw "Cannot find referenced subitem using identifier: "+source["@id"];
			}
			return this._registry[source["@id"]];
		}
	}
});