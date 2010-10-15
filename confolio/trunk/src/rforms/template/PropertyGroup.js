/*global dojo, rforms*/
dojo.provide("rforms.template.PropertyGroup");
dojo.require("rforms.template.Group");

dojo.declare("rforms.template.PropertyGroup", rforms.template.Group, {
	
	constructor: function(source, children) {
		this._children = children;
	},
	getPropertyItem: function() {
		return this._children[0];
	},
	getObjectItem: function() {
		return this._children[1];
	}
});