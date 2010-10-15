/*global dojo, rforms*/
dojo.provide("rforms.model.PropertyBinding");
dojo.require("rforms.model.Binding");
			
dojo.declare("rforms.model.PropertyBinding", rforms.model.Binding, {
	_objectBinding: null,
	_choice: null,

	constructor: function(args) {
		this._objectBinding = args.objectBinding;
	},
	remove: function() {
	},
	setChoice: function(choice) {
		this._choice = choice;
		if (this.getValue() != choice.d) {
			this.setValue(choice.d);			
		}
	},
	getChoice: function() {
		return this._choice;
	},
	setValue: function(value) {
		this._objectBinding.setPredicate(value);
	},
	getValue: function() {
		return this._objectBinding.getPredicate();
	},
	isValid: function() {
		return false;
	}
});