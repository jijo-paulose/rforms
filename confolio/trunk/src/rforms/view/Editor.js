/*global dojo, rforms, dijit*/
dojo.provide("rforms.view.Editor");
dojo.require("rforms.view.Presenter");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");

dojo.declare("rforms.view.Editor", rforms.view.Presenter, {
	filterTranslations: false,
	styleCls: "editor",
	
	addLabel: function(rowDiv, labelDiv, binding) {
		var item = binding.getItem();
		var isGroup = item instanceof rforms.template.Group;
		var label = dojo.create("span", {"innerHTML": item.getLabel()+(isGroup ? "": ":")}, labelDiv);
		dojo.addClass(labelDiv, "labelRow");
		dojo.addClass(label, "label");

		var add = new dijit.form.Button({label: "add"}, dojo.create("span", null, labelDiv));
		dojo.connect(binding.getCardinalityTracker(), "maxReached", function() {
			add.attr("disabled", true);
		});

		dojo.connect(binding.getCardinalityTracker(), "justFine", function() {
			add.attr("disabled", false);
		});

		dojo.connect(add, "onClick", this, function() {
			var nBinding = rforms.model.create(binding.getParent(), binding.getItem(), binding.getGraph()); 
			rowDiv = this.addRow(rowDiv, nBinding, -1); //not the first binding...
		});
	},
	addGroup: function(fieldDiv, binding) {
		var subView = new rforms.view.Presenter({binding: binding, template: this.template, topLevel: false}, fieldDiv);
	},
	addText: function(fieldDiv, binding) {
/*		if (this.showLanguage && binding.getLanguage()) {
			var lang = dojo.create("span", {"innerHTML": binding.getLanguage()}, div);
			dojo.addClass(lang, "language");
		}*/
		var controlDiv = dojo.create("div", null, fieldDiv);
		dojo.addClass(controlDiv, "fieldControl");
		var tb = new dijit.form.TextBox({value: binding.getValue(), onChange: function() {
			binding.setValue(this.attr("value"));
		}}, dojo.create("div", null, fieldDiv));
		dojo.addClass(tb.domNode, "fieldInput");
		
		var remove = new dijit.form.Button({label: "remove"}, dojo.create("div", null, controlDiv));
		var cardConnect1 = dojo.connect(binding.getCardinalityTracker(), "minReached", function() {
			remove.attr("disabled", true);
		});

		var cardConnect2 = dojo.connect(binding.getCardinalityTracker(), "justFine", function() {
			remove.attr("disabled", false);
		});

		var removeConnect = dojo.connect(remove, "onClick", function() {
			if (binding.getCardinalityTracker().getCardinality() === 1) {
				binding.setValue(null);
				tb.attr("value", "");
			} else {
				dojo.disconnect(cardConnect1);
				dojo.disconnect(cardConnect2);
				dojo.disconnect(removeConnect);
				binding.remove();
				dojo.destroy(fieldDiv);
			}
		});
		

	},
	addChoice: function(fieldDiv, binding) {
		var item = binding.getItem();
		dojo.create("span", {"innerHTML": item._getLocalizedValue(binding.getChoice().label).value}, fieldDiv);
	}
});