/*global dojo, rforms, dijit*/
dojo.provide("rforms.view.Editor");
dojo.require("rforms.view.Presenter");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("rforms.template._BaseItem");

dojo.declare("rforms.view.Editor", rforms.view.Presenter, {
	filterTranslations: false,
	styleCls: "editor",
	
	addLabel: function(rowDiv, labelDiv, binding) {
		var parentBinding = binding.getParent(), graph = binding.getGraph();
		var item = binding.getItem();
		var isGroup = item instanceof rforms.template.Group;
		var label = dojo.create("span", {"innerHTML": item.getLabel()+(isGroup ? "": ":")}, labelDiv);
		dojo.addClass(labelDiv, "labelRow");
		dojo.addClass(label, "label");

		//If table, no add or remove buttons.
		if ((item instanceof rforms.template.Group) && item.hasClass("table")) {
			return;
		}
		var add = new dijit.form.Button({label: "add"}, dojo.create("span", null, labelDiv));
		var remove = new dijit.form.Button({label: "remove"}, dojo.create("span", null));

		var cardMaxCon = dojo.connect(binding.getCardinalityTracker(), "maxReached", function() {
			add.attr("disabled", true);
		});

		var cardJustFineCon = dojo.connect(binding.getCardinalityTracker(), "justFine", function() {
			add.attr("disabled", false);
			remove.attr("disabled", false);
		});

		var cardMinCon = dojo.connect(binding.getCardinalityTracker(), "minReached", function() {
			remove.attr("disabled", true);
		});

		var addCon = dojo.connect(add, "onClick", this, function() {
			var nBinding = rforms.model.create(parentBinding, item, graph); 
			this.addRow(rowDiv, nBinding, -1); //not the first binding...
		});
		
		var removeCon = dojo.connect(remove, "onClick", function() {
			if (binding.getCardinalityTracker().getCardinality() === 1) {
				//Clear somehow.
//				binding.setValue(null);
	//			tb.attr("value", "");
			} else {
				dojo.disconnect(cardMaxCon);
				dojo.disconnect(cardMinCon);
				dojo.disconnect(cardJustFineCon);
				dojo.disconnect(addCon);
				dojo.disconnect(removeCon);
				//Remove somehow.
				binding.remove();
				dojo.destroy(rowDiv);
			}
		});
		
		//If group (and not table) make the remove button visible.
		if (item instanceof rforms.template.Group) {
			dojo.place(remove.domNode, labelDiv);
		}		
	},
	addGroup: function(fieldDiv, binding) {
		var subView = new rforms.view.Editor({binding: binding, template: this.template, topLevel: false}, fieldDiv);
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
		//Create an ItemFileReadStore with the correct language to use 
		var item = binding.getItem();
		var store = this._createChoiceStore(item);
		
		//The FilteringSelect is set on a "span" that is added to the fieldDiv
		var spanToUse = dojo.create("span",null,fieldDiv);
		var fSelect = new dijit.form.FilteringSelect({store: store, searchAttr: "label"}, spannet);
		
		//Sets the value if any
		if (binding.getValue()) {
			fSelect.attr("value", binding.getValue());
		}
	},
	/*
	 * From a Choice Item the possible values are extracted and added into 
	 * a ItemFileReadStore that is returned
	 */
	_createChoiceStore: function(/*Choice*/ item){
		var choices = item.getChoices();
		var itemsArray = [];
		for (var i in choices){
			var currentLabel = item._getLocalizedValue(choices[i].label);
			itemsArray.push({d:choices[i].d, label:currentLabel.value});
		}
		var store = dojo.data.ItemFileReadStore({
			data: {
				identifier: "d",
				label: "label",
				items: itemsArray
			}
		});
		return store;
	}
});