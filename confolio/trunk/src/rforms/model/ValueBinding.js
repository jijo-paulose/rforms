/*global dojo, rforms*/
dojo.provide("rforms.model.ValueBinding");
dojo.require("rforms.model.Binding");
			
dojo.declare("rforms.model.ValueBinding", rforms.model.Binding, {
	_validObject: true,
	_validPredicate: true,

	remove: function() {
		this.setValue(null);
		this._parent.removeChildBinding(this);
		this.inherited("remove", arguments);
	},
	setValue: function(value) {
		var oValidObject = this._validObject;
		if (this._isValidValue(value)) {
			this._statement.setValue(value);
			this._validObject = true;
			if (oValidObject !== true && this._validPredicate === true) {
				this._parent.oneChildValidityChanged(true);
			}
		} else {
			//Note that we actually do not set the invalid value, just unassert the statement.
			this._validObject = false;
			if (oValidObject !== false && this._validPredicate === true) {
				this._parent.oneChildValidityChanged(false);
			}
		}
		this.updateAssertions();
	},
	setPredicate: function(predicate) {
		var oValidPredicate = this._validPredicate;
		if (this._isValidValue(predicate)) {
			this._statement.setPredicate(predicate);
			this._validPredicate = true;
			if (oValidPredicate !== true && this._validObject === true) {
				this._parent.oneChildValidityChanged(true);
			}
		} else {
			//Note that we actually do not set the invalid value, just unassert the statement.
			this._validPredicate = false;
			if (oValidPredicate !== false && this._validObject === true) {
				this._parent.oneChildValidityChanged(false);
			}
		}
		this.updateAssertions();
	},
	getPredicate: function() {
		return this._statement.getPredicate();
	},
	updateAssertions: function() {
		var assert = this._ancestorValid && this._validObject && this._validPredicate;
		this._statement.setAsserted(assert);
	},
	getValue: function() {
		return this._statement.getValue();
	},
	setLanguage: function(lang) {
		this._statement.setLanguage(lang);
	},
	getLanguage: function() {
		return this._statement.getLanguage();
	},
	setDatatype: function(dt) {
		this._statement.setDatatype(dt);
	},
	getDatatype: function() {
		return this._statement.getDatatype();
	},
	isValid: function() {
		return this._validObject && this._validPredicate;
	}
});