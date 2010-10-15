/*global dojo, rforms*/
dojo.provide("rforms.template.Template");
dojo.require("rforms.template.Group");


dojo.declare("rforms.template.Template", rforms.template._BaseItem, {
	_itemStore: null,
	_root: null,
	
	constructor: function(source, root, itemStore) {
		this._itemStore = itemStore;
		this._ontologies = source.ontologies;
		this._root = root;
	},
	getRoot: function() {
		return this._root;
	},
	getItemStore: function() {
		return this._itemStore;
	},
	getOntologies: function() {
		return this._ontologies;
	}
});