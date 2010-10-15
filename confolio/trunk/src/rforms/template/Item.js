/*global dojo, rforms*/
dojo.provide("rforms.template.Item");
dojo.require("rforms.template._BaseItem");

dojo.declare("rforms.template.Item", rforms.template._BaseItem, {
	getProperty: function() {
		return this._source.property;
	},
	getConstraints: function() {
		return this._source.constraints;
	},
	getDatatype: function() {
		return this._source.datatype;
	},
	getLanguage: function() {
		return this._source.language;
	},
	getMember: function() {
		return this._source.member;
	},
	/**
	 * Allowed values are:
	 * LITERAL, RESOURCE, URI, BLANK, LITERAL, PLAIN_LITERAL, ONLY_LITERAL, LANGUAGE_LITERAL, DATATYPE_LITERAL
	 */
	getNodetype: function() {
		return this._source.nodetype;
	},
	getValue: function() {
		return this._source.value;
	},
	getCardinality: function() {
		return this._source.cardinality;
	},
	isEnabled: function() {
		return this._source.enabled === undefined ? true : this._source.enabled;
	}
});