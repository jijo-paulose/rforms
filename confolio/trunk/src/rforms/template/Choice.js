/*global dojo, rforms*/
dojo.provide("rforms.template.Choice");
dojo.require("rforms.template.Item");

/**
 * A choice item type indicates that the value should be one of a range of predefined choices,
 * these predefined choices can be defined manually in the template or extracted from an external
 * ontlogy (indicated by the ontologyUrl) by means of a query that can be constructed from the constraints.
 * 
 * TODO:
 * The choices can also be organized into a hierarchy using the parent and hierarchy properties.
 */
dojo.declare("rforms.template.Choice", rforms.template.Item, {
	//===================================================
	// Private attributes
	//===================================================	
	_source: null,
	_ontologyStore: null,
	_choices: {},

	//===================================================
	// Public API
	//===================================================	
	/**
	 *  A choice is an object which looks like:
	 * {"d": "http://example.com/choice1",
	 *  "label": {"en": "First choice", "sv": "Första valet"}
	 * }
	 *  
	 * @return {Array} of choices.
	 */
	getChoices: function() {
		return this.getStaticChoices() || this.getDynamicChoices();
	},
	/**
	 * @return {Array} of choices defined manually in the Template.
	 */
	getStaticChoices: function() {
		return this._source.choices;
	},
	/**
	 * Fetches choices from an external ontology.
	 * 
	 * @param {Object} callback will be called asynchronously, if undefined the call is made synchronously.
	 * @return {Array} of choice objects, only provided if method called without callback.
	 */
	getDynamicChoices: function(callback) {
		if (this._dynamicChoicesUrl === undefined) {
			var params = [];
			params.push("constr="+encodeURIComponent(dojo.toJson(this._source.constraints)));
			if (this._source.parentproperty !== undefined) {
				var pp = this._source.isparentpropertyinverted === true ? "ipp=" : "pp=";
				params.push(pp+encodeURIComponent(this._source.parentproperty));
			}
			if (this._source.hierarchyproperty !== undefined) {
				var hp = this._source.ishierarchypropertyinverted === true ? "ihp=" : "hp=";
				params.push(hp+encodeURIComponent(this._source.hierarchyproperty));
			}
			this._dynamicChoicesUrl = this._source.ontologyUrl+"?"+params.join("&");
		}
		return this._ontologyStore.getChoices(this._dynamicChoicesUrl, callback);
	},
	getOntologyUrl: function() {
		return this._source.ontologyUrl;
	},
	getParentProperty: function() {
		return this._source.parentproperty;
	},
	getHierarchyProperty: function() {
		return this._source.hierarchyproperty;
	},
	isParentPropertyInverted: function() {
		return this._source.isparentpropertyinverted === undefined ? false : this._source.isparentpropertyinverted;
	},
	isHierarchyPropertyInverted: function() {
		return this._source.ishierarchypropertyinverted === undefined ? false : this._source.ishierarchypropertyinverted;
	},
	
	//===================================================
	// Inherited methods
	//===================================================	
	constructor: function(source, ontologyStore) {
		this._ontologyStore = ontologyStore;
	}
});