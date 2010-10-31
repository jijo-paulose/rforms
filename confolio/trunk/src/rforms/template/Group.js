dojo.provide("rforms.template.Group");
dojo.require("rforms.template.Item");

/**
 * Group extends an Item by having children.
 */
dojo.declare("rforms.template.Group", rforms.template.Item, {
	//===================================================
	// Private attributes
	//===================================================	
	_children: [],

	//===================================================
	// Public API
	//===================================================	
	getChildren: function() {
		return this._children;
	},
	
	//===================================================
	// Inherited methods
	//===================================================	
	constructor: function(source, children) {
		this._children = children;
	}
});