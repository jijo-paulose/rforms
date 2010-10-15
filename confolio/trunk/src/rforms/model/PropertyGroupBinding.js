/*global dojo, rforms*/
dojo.provide("rforms.model.PropertyGroupBinding");
dojo.require("rforms.model.GroupBinding");
dojo.require("rforms.model.PropertyBinding");
dojo.require("rforms.model.ValueBinding");
dojo.require("rforms.model.ChoiceBinding");
			
dojo.declare("rforms.model.PropertyGroupBinding", rforms.model.GroupBinding, {

	constructor: function(args) {
		this._statement = undefined;
		this._constraints = [];
		var children = this._item.getChildren();
		var pBinding, oBinding, pItem = children[0], oItem = children[1];
		if (oItem instanceof rforms.template.Group) {
			oBinding = new rforms.model.GroupBinding({item: oItem, statement: args.statement, constraints: args.constraints});
		} else if (oItem instanceof rforms.template.PropertyGroup) {
			oBinding = new rforms.model.PropertyGroupBinding({item: oItem, statement: args.statement});
		} else if (oItem instanceof rforms.model.Choice) {
			oBinding = new rforms.model.ChoiceBinding({item: oItem, statement: args.statement});
		} else {
			oBinding = new rforms.model.ValueBinding({item: oItem, statement: args.statement});
		}
		pBinding = new rforms.model.PropertyBinding({item: children[0], objectBinding: oBinding});
		this.addChildBinding(pBinding);
		this.addChildBinding(oBinding);
	},
	getPredicateBinding: function() {
		return this._childBindings[0][0];
	},
	getObjectBinding: function() {
		return this._childBindings[1][0];		
	},
	getGraph: function() {
		return this.getObjectBinding().getGraph();
	}
});