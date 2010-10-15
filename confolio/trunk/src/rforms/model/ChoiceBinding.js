/*global dojo, rforms*/
dojo.provide("rforms.model.ChoiceBinding");
dojo.require("rforms.model.ValueBinding");
			
dojo.declare("rforms.model.ChoiceBinding", rforms.model.ValueBinding, {
	_choice: null,

	constructor: function(args) {
		this._choice = args.choice;
	},
	remove: function() {
		this.setValue(null);
		this._parent.removeChildBinding(this);
		this.inherited("remove", arguments);
	},

	setChoice: function(choice) {
		this._choice = choice;
		if (this.getValue() !== choice.d) {
			this.setValue(choice.d);			
		}
	},
	getChoice: function() {
		return this._choice;
	}
});