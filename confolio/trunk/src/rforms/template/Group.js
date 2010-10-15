dojo.provide("rforms.template.Group");
dojo.require("rforms.template.Item");


dojo.declare("rforms.template.Group", rforms.template.Item, {
	_children: [],
	
	constructor: function(source, children) {
		this._children = children;
	},
	getChildren: function() {
		return this._children;
	}
});