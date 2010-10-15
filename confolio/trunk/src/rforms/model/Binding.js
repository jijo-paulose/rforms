/*global dojo, rforms, rdfjson*/
dojo.provide("rforms.model.Binding");
dojo.require("rforms.model.CardinalityTracker");
dojo.require("rforms.template.Template");
dojo.require("rforms.template.Item");
dojo.require("rdfjson.Graph");
dojo.require("rdfjson.Statement");

/**
 * Hepp hopp
 * @constructor
 * @classDescription humpty dumpty
 * @alias rforms.model.Binding
 * @param {Object} item
 * @param {Object} statement
 */
dojo.declare("rforms.model.Binding", null, {
	_item: null,
	_statement: null,
	_ancestorValid: true,
	_cardinalityTracker: null,

	constructor: function(args) {
		this._item = args.item;
		this._statement = args.statement;
	},
	getGraph: function() {
		return this._statement.getGraph();
	},
	remove: function() {
	},
	getCardinalityTracker: function() {
		return this._cardinalityTracker;
	},
	setCardinalityTracker: function(cardTracker) {
		this._cardinalityTracker = cardTracker;
	},
	getItem: function() {
		return this._item;
	},
	/**
	 * @method
	 * @memberOf rforms.model.Binding
	 */
	getStatement: function() {
		return this._statement;
	},
	getParent: function() {
		return this._parent;
	},
	setParent: function(parent) {
		this._parent = parent;
	},
	
	
	/**
	 * A binding is valid if:
	 * <ol><li> it is a leaf and the corresponding statement is valid, </li>
	 * <li>if it is a group and at least one of its children is valid, or</li>
	 * <li>if it is a predicategroup and both the predicate and the object binding are valid.</ol>   
	 */
	isValid: function() {
		//Override
	},
	
	/**
	 * stores the validity of ancestors.
	 */
	setAncestorValid: function(valid) {
		this._ancestorValid = valid;
		this.updateAssertions();
	},
	/**
	 * 
	 */
	updateAssertions: function() {
		//Override
	},
	
	_isValidValue: function(value) {
		return value !== undefined && value !== null && value !== "";
	}
});