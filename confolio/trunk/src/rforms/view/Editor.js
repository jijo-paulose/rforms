/*global dojo, rforms, dijit*/
dojo.provide("rforms.view.Editor");
dojo.require("rforms.view.Presenter");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("rforms.template._BaseItem");
dojo.require("dijit.form.RadioButton");

rforms.template.uniqueRadioButtonNameNr = 0;

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
		
		//If the language can be set
		var item = binding.getItem();
		var nodeType = item.getNodetype();
		if(nodeType === "LANGUAGE_LITERAL" || nodeType === "PLAIN_LITERAL"){
			var langSpan = dojo.create("span", null, controlDiv);
			var langList = this._getLanguagesList();
			var langStore = this._getItemFileReadStoreFromArray(langList,binding.getItem());
			var languageSelector = new dijit.form.FilteringSelect({
					store: langStore,
					searchAttr: "label"
				}, langSpan);
			languageSelector.set("value", binding.getLanguage());				
			dojo.connect(languageSelector, "onChange", dojo.hitch(this, function(){
					binding.setLanguage(languageSelector.getValue());
				}));
			dojo.addClass(langSpan, "language");
			dojo.addClass(fieldDiv,"langcontrolledfield");
			dojo.addClass(controlDiv, "langFieldControl");
		}
		
		var cardConnect1 = dojo.connect(binding.getCardinalityTracker(), "minReached", function() {
			remove.attr("disabled", true);
		});

		var cardConnect2 = dojo.connect(binding.getCardinalityTracker(), "justFine", function() {
			remove.attr("disabled", false);
		});
		
		//Inactivates buttons at startup if needed
		binding.getCardinalityTracker().checkCardinality();
		
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
			if (nodeType === "LANGUAGE_LITERAL" || nodeType === "PLAIN_LITERAL") {
					languageSelector.set("value", "");
			}
		});
		

	},
	addChoice: function(fieldDiv, binding) {
		 
		var item = binding.getItem();
		var choices = item.getChoices();
		var controlDiv = dojo.create("div", null, fieldDiv);
		dojo.addClass(controlDiv, "fieldControl");
		
		if (choices.length < 5 && item.getCardinality.max === 1) {
			for (var ib in choices) {
				var divToUse =  dojo.create("div", null, fieldDiv);
				var inputToUse = dojo.create("input", null, divToUse);
				dojo.create("span", { innerHTML: item._getLocalizedValue(choices[ib].label).value }, divToUse);
				var rb = new dijit.form.RadioButton({
					name: "RadioButtonName"+rforms.template.uniqueRadioButtonNameNr,
					value: choices[ib].d,
					checked: choices[ib].d === binding.getValue()
				}, inputToUse);
				dojo.connect(rb, "onClick", dojo.hitch(this, function(){
					binding.setValue(rb.getValue());
				}));
			}
			rforms.template.uniqueRadioButtonNameNr++;
		} else {
			//Create an ItemFileReadStore with the correct language to use
			var store = this._createChoiceStore(item);
			var spanToUse = dojo.create("span", null, fieldDiv);
			var fSelect = new dijit.form.FilteringSelect({
				store: store,
				searchAttr: "label"
			}, spanToUse);
			
			//Sets the value if any
			if (binding.getValue()) {
				fSelect.set("value", binding.getValue());
			}
			//Callback when the user edits the value
			fSelect.onChange = dojo.hitch(this, function (newvalue) {
					binding.setValue(newvalue);
			});
			
			/*Code below is to correctly remove items in the form and their
			 * values
			 */
			
			//The button
			var remove = new dijit.form.Button({label: "remove"}, dojo.create("span", null, fieldDiv));
			
			var cardConnect1 = dojo.connect(binding.getCardinalityTracker(), "minReached", function() {
				remove.attr("disabled", true);
			});

			var cardConnect2 = dojo.connect(binding.getCardinalityTracker(), "justFine", function() {
				remove.attr("disabled", false);
			});
			
			//Inactivates buttons at startup if needed
			binding.getCardinalityTracker().checkCardinality();
			
			var removeConnect = dojo.connect(remove, "onClick", function() {
				if (binding.getCardinalityTracker().getCardinality() === 1) {
					fSelect.set("value", "");
				} else {
					dojo.disconnect(cardConnect1);
					dojo.disconnect(cardConnect2);
					dojo.disconnect(removeConnect);
					binding.remove();
					dojo.destroy(fieldDiv);
				}
			});
		}
	},
	/*
	 * From a Choice Item the possible values are extracted and added into 
	 * a ItemFileReadStore that is returned
	 */
	_createChoiceStore: function(/*Choice*/ item){
		var choices = item.getChoices();
		return this._getItemFileReadStoreFromArray(choices, item);
	},
	/*
	 * From an array of choices that contains value and labels an 
	 * ItemFileReadStore is created and returned. The object inside 
	 * the array should have the following structure:
	 *  {"d": "Value",
	 *  "label": {"en": "English-label", "sv": "Svensk label"}
	 * }
	 */
	_getItemFileReadStoreFromArray: function(/*Array of objects*/objects, /*The item*/ item){
		var itemsArray = [];
		for (var i in objects){
			var currentLabel = item._getLocalizedValue(objects[i].label);
			itemsArray.push({d:objects[i].d, label:currentLabel.value});
		}
		var store = dojo.data.ItemFileReadStore({
			data: {
				identifier: "d",
				label: "label",
				items: itemsArray
			}
		});
		return store;
	},
	/*
	 * 
	 * This method returns a list of language-codes and their label (in several translations)
	 * An example for English looks like this:
	 * {"d": "en",
	 *  "label": {"en": "English", "sv": "Engelska"}
	 * }
	 *  
	 * @return {Array} of languages.
	 */
	_getLanguagesList:function (){ //TODO: Take this list from some kind of configuration
		var list = [{"d": "", label:{"en":"", "sv":""}},
		            {"d": "en", label:{"en":"English", "sv":"Engelska"}},
		            {"d": "de", label:{"en":"German", "sv":"Tyska"}},
					{"d": "sv", label:{"en":"Swedish", "sv":"Svenska"}},];
		return list;
	}
});