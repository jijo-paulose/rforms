/*global dojo, rforms, dijit*/
dojo.provide("rforms.view.Editor");
dojo.require("rforms.view.Duration");
dojo.require("rforms.view.Presenter");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.FilteringSelect");
dojo.require("rforms.template._BaseItem");
dojo.require("dijit.form.RadioButton");
dojo.require("dijit.form.DropDownButton");
dojo.require("dijit.Tree");
dojo.require("dijit.TooltipDialog");
dojo.require("rforms.view.TreeOntologyChooser");
dojo.require("rforms.view.SortedStore");

rforms.template.uniqueRadioButtonNameNr = 0;

dojo.declare("rforms.view.Editor", rforms.view.Presenter, {
	//===================================================
	// Public attributes
	//===================================================
	filterTranslations: false,
	styleCls: "editor",
	ontologyPopupWidget: null,
	includeLevel: "optional",

	//===================================================
	// Inherited methods
	//===================================================	
	/**
	 * Will only show something for the given item if there is anything to show, or if the includeLevel indicates 
	 * to show it anyhow (for example min cardinality > 0 or includeLevel is optional or recommended at the same
	 * time the preferred cardinality is bigger than zero.
	 * @param {Object} item
	 * @param {Object} bindings
	 */
	showNow: function(item, bindings) {
		if (bindings.length > 0) {
			return true;
		}
		var card = item.getCardinality();
		switch(this.includeLevel) {
			case "mandatory":
				return card && card.min>1;
			case "recommended":
				return card && card.pref>1;
			default:
				return true;
		}
	},
	/**
	 * Will add bindings until the min cardinality is reached.
	 * @param {Object} item
	 * @param {Object} bindings
	 */
	prepareBindings: function(item, bindings) {
		var card = item.getCardinality();
		var target;
		if (card.pref > 0) {
			target = card.pref;
		} else if (card.min > 0) {
			target = card.min;
		} else if (item instanceof rforms.template.Group) {
			if (item.getProperty() == null) {
				target = 1;
			} else {
				target = 0;
			}
		} else {
			target = 1;
		}
		if (target > bindings.length) {
			bindings = bindings.concat([]);
			while(target > bindings.length) {
				bindings.push(rforms.model.create(this.binding, item));
			}
		}
		return bindings;
	},
	
	addLabel: function(rowDiv, labelDiv, binding, item) {
		if (item.hasClass("noneditable")) {
			return this.inherited("addLabel", arguments);
		}
		var isGroup = item instanceof rforms.template.Group;
		var label = dojo.create("span", {"innerHTML": item.getLabel()}, labelDiv);
		dojo.addClass(labelDiv, "labelRow");
		dojo.addClass(label, "label");
		this.showInfo(item, label);
		
		if (binding == null) {
			this._addExpandButton(rowDiv, labelDiv, item);
			return;
		}
		//If table, no add or remove buttons.
		if (this.showAsTable(item)) {
			return;
		}
		if (isGroup) {
			this._addGroupButtons(rowDiv, labelDiv, binding);
		} else {
			this._addCreateChildButton(rowDiv, labelDiv, binding);
		}
	},

	addGroup: function(fieldDiv, binding) {
		if (binding.getItem().hasClass("noneditable")) {
			return this.inherited("addGroup", arguments);
		}
		var subView = new rforms.view.Editor({binding: binding, template: this.template, topLevel: false}, fieldDiv);
	},
	addText: function(fieldDiv, binding, noCardinalityButtons) {
		if (binding.getItem().hasClass("noneditable")) {
			return this.inherited("addText", arguments);
		}
		var controlDiv = dojo.create("div", null, fieldDiv);
		dojo.addClass(controlDiv, "fieldControl");
		var item = binding.getItem();
		var nodeType = item.getNodetype();
		var datatype = item.getDatatype();
		var tb;
		
		//If certain datatype
		if (nodeType == "DATATYPE_LITERAL" || datatype) {
			
			//Special editing support implemented for integer, data and duration
			
			if (datatype === "http://www.w3.org/2001/XMLSchema.xsd#date" ||
			datatype === "http://purl.org/dc/terms/W3CDTF") {
				var dateStringValue = item.getValue() || "";
				if (dateStringValue.length > 0) {
					dateStringValue = dojo.date.stamp.fromISOString(this.getValue());
				}
				tb = new dijit.form.DateTextBox({
					value: dateStringValue,
					disabled: !item.isEnabled(),
					invalidMessage: "Proper date format is required, value will not be saved",
					onChange: function(){
						if (tb.isValid()) {
							binding.setValue(dojo.date.stamp.fromISOString(this.attr("value")));
						} else {
							binding.setValue("");
						}
					}
				}, dojo.create("div", null, fieldDiv));
				
			} else if (datatype === "http://www.w3.org/2001/XMLSchema.xsd#duration") {
				tb = new rforms.view.Duration({disabled: !item.isEnabled(), onChange: function(){
					binding.setValue(tb.attr("value"));
				}}, dojo.create("div", null, fieldDiv));
			
			} else if (datatype === "http://www.w3.org/2001/XMLSchema.xsd#integer") {
				tb = new dijit.form.ValidationTextBox({
					value: binding.getValue(),
					disabled: !item.isEnabled(),
					invalidMessage: "Only integer value is allowed, value will not be saved",
					regExp: "[0-9]*",
					onChange: function() {
						if (tb.isValid()) {
							binding.setValue(this.attr("value"));
						} else {
							binding.setValue("");
						}
					}
				}, dojo.create("div", null, fieldDiv));
			}
		}
		else {
			tb = new dijit.form.TextBox({
				value: binding.getValue(),
				onChange: function(){
					binding.setValue(this.attr("value"));
				}
			}, dojo.create("div", null, fieldDiv));
			dojo.addClass(tb.domNode, "fieldInput");
		}
				
		//If the language can be set
		if(nodeType === "LANGUAGE_LITERAL" || nodeType === "PLAIN_LITERAL"){
			var langSpan = dojo.create("span", null, controlDiv);
			var langList = this._getLanguagesList();
			var langStore = this._getStoreFromArray(langList,binding.getItem(), true);
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
		if (noCardinalityButtons !== true) {
			this._addRemoveButton(fieldDiv, binding, controlDiv, function() {
				tb.attr("value", "");
				if (nodeType === "LANGUAGE_LITERAL" || nodeType === "PLAIN_LITERAL") {
					languageSelector.set("value", "");
				}				
			});
		}
	},
	addChoice: function(fieldDiv, binding, noCardinalityButtons) {
		if (binding.getItem().hasClass("noneditable")) {
			return this.inherited("addChoice", arguments);
		}

		var item = binding.getItem();
		var choices = item.getChoices();
		var controlDiv = dojo.create("div", null, fieldDiv);
		dojo.addClass(controlDiv, "fieldControl");
		var divToUse =  dojo.create("div", null, fieldDiv);
		var hierarchy = item.getParentProperty() && item.getHierarchyProperty();
		//Check if radiobuttons can be created, i.e. when few chioces and max-cardinality == 1 
		if (!hierarchy && choices.length < 5 && item.getCardinality().max === 1) {
			for (var ib in choices) {
				var inputToUse = dojo.create("input", null, divToUse);
				dojo.create("span", { "class": "choiceLabel", innerHTML: item._getLocalizedValue(choices[ib].label).value }, divToUse);
				var rb = new dijit.form.RadioButton({
					name: "RadioButtonName"+rforms.template.uniqueRadioButtonNameNr,
					value: choices[ib].value,
					checked: choices[ib].value === binding.getValue()
				}, inputToUse);
				dojo.connect(rb, "onClick", dojo.hitch(this, function(){
					binding.setValue(rb.getValue());
				}));
			}
			rforms.template.uniqueRadioButtonNameNr++;
			
		} else {
			var fSelect, cNode, dialog;
			//Check if a tree-hierarchy should be created
			if(hierarchy){
				cNode = dojo.create("div", {"class": "choiceValue"}, divToUse);
				dojo.attr(cNode, "innerHTML", this._getLabelForChoice(binding, item) || "");				
				var oc;
				var ddButton = new dijit.form.Button({label:  "Browse", onClick: dojo.hitch(this, function() {
					if (oc == null) {
						oc = new rforms.view.TreeOntologyChooser({binding: binding, done: dojo.hitch(this, function() {
							dojo.attr(cNode, "innerHTML", this._getLabelForChoice(binding, item));
						})});
					}
					oc.show();
				})}, dojo.create("span", null, divToUse));
			
			//Last option is the normal listing in a dropdown-menu
			} else {
				//Create an ItemFileReadStore with the correct language to use
				var store = this._createChoiceStore(item);
				var spanToUse = dojo.create("span", null, divToUse);
				fSelect = new dijit.form.FilteringSelect({
					store: store,
					searchAttr: "label"
				}, spanToUse);
				
				//Sets the value if any
				if (binding.getValue()) {
					fSelect.set("value", binding.getValue());
				} else {
					fSelect.set("value", "");
				}
				//Callback when the user edits the value
				fSelect.onChange = dojo.hitch(this, function (newvalue) {
						binding.setValue(newvalue);
				});
			}
			
			/*Code below is to correctly remove items in the form and their
			 * values
			 */
			if (noCardinalityButtons !== true) {
				this._addRemoveButton(fieldDiv, binding, divToUse, function() {
					fSelect && fSelect.set("value", "");
					cNode && dojo.attr(cNode, "innerHTML", "");
				});
			}
		}
	},
	
	addTable: function(newRow, firstBinding) {
		if (firstBinding.getItem().hasClass("noneditable")) {
			return this.inherited("addGroup", arguments);
		}

		var item = firstBinding.getItem(), childItems = item.getChildren();
		var table = dojo.create("table", null, newRow);
		dojo.addClass(table, "group");

		tHead = dojo.create("thead", null, table);
		tHeadRow = dojo.create("tr", null, table);
		for (colInd = 0;colInd < childItems.length;colInd++) {
			var th = dojo.create("th", null, tHeadRow);
			this.showInfo(item, dojo.create("span", {innerHTML: childItems[colInd].getLabel()}, th));
		}
		if (!firstBinding.getItem().hasClass("firstcolumnfixedtable")) {
			var addTh = dojo.create("th", {"class": "tableControl"}, tHeadRow);
			var parentBinding = firstBinding.getParent();
		
			var add = new dijit.form.Button({label: "add", onClick: dojo.hitch(this, function() {
						var nBinding = rforms.model.create(parentBinding, item);
						this._addTableRow(table, nBinding);
					})
				}, dojo.create("span", null, addTh));
			var cardTr = firstBinding.getCardinalityTracker();
			dojo.connect(cardTr, "cardinalityChanged", function() {
				add.attr("disabled", cardTr.isMax());
			});
		}
		return table;
	},
	fillTable: function(table, bindings) {
		if (bindings.length === 0) {
			return;
		}
		var item = bindings[0].getItem();
		if (item.hasClass("noneditable")) {
			return this.inherited("addGroup", arguments);
		}
		
		if (item.hasClass("firstcolumnfixedtable")) {
			bindings = this._createChildBindingsForFirstFixedColumn(bindings);
		}
		
		dojo.forEach(bindings, dojo.hitch(this, this._addTableRow, table));
	},
	//===================================================
	// Private methods
	//===================================================
	_createChildBindingsForFirstFixedColumn: function(bindings) {
			//Find choice column
			//flesh out bindings from choices
			//mark each fleshed out binding via .setExcludeFromTreeValidityCheck(true);
		var nb = [];
		var item = bindings[0].getItem();
		var firstColumnItem = item.getChildren()[0]; //Must be a choice.
		var choices = firstColumnItem.getChoices();
		//Sort the choices goddamit!
		choices = this._getCopiedLabeledChoices(choices, item);
		choices.sort(function(a,b) {
			//This assumes that there is always an "n" to be found (which is correct)
			if (a.label > b.label) {
				return 1;
			} else if (a.label < b.label) {
				return -1;
			} else {
				return 0;
			}
		});

		
		//index the existing bindings
		var ebi = {};
		dojo.forEach(bindings, function(binding) {
			var igcb = binding.getItemGroupedChildBindings();
			if (igcb.length > 0 && igcb[0].length > 0) {
				var rowXcol1 = igcb[0][0];
				ebi[rowXcol1.getValue()] = binding;		
			}
		});
		
		//Create one row for each choice
		var parentBinding = bindings[0].getParent();
		dojo.forEach(choices, function(choice) {
			if(ebi[choice.value] != null) {
				nb.push(ebi[choice.value]);
			} else {
				var newRowBinding = rforms.model.create(parentBinding, item);
				var firstColumnBinding = rforms.model.create(newRowBinding, firstColumnItem);
				firstColumnBinding.setExcludeFromTreeValidityCheck(true);
				firstColumnBinding.setAncestorValid(false);
				firstColumnBinding.setChoice(choice);
				nb.push(newRowBinding);
			}
		});
		
		return nb;
	},
	_addCreateChildButton: function(rowDiv, labelDiv, binding) {
		var parentBinding = binding.getParent(), item = binding.getItem();
		var add = new dijit.form.Button({label: "add", onClick: dojo.hitch(this, function() {
					var nBinding = rforms.model.create(parentBinding, item); 
					this.addRow(rowDiv, nBinding); //not the first binding...			
				})
			}, dojo.create("span", null, labelDiv));
		var cardTr = binding.getCardinalityTracker();
		var cardMaxCon = dojo.connect(cardTr, "cardinalityChanged", function() {
			add.attr("disabled", cardTr.isMax());
		});		
	},
	_addGroupButtons: function(rowDiv, labelDiv, binding) {
		var parentBinding = binding.getParent(), item = binding.getItem();
		var add = new dijit.form.Button({label: "add"}, dojo.create("span", null, labelDiv));
		var remove = new dijit.form.Button({label: "remove"}, dojo.create("span", null, labelDiv));

		var cardTr = binding.getCardinalityTracker();
		var con = dojo.connect(cardTr, "cardinalityChanged", function() {
			add.attr("disabled", cardTr.isMax());
			remove.attr("disabled", cardTr.isMin());
		});
		
		var addCon = dojo.connect(add, "onClick", this, function() {
			var nBinding = rforms.model.create(parentBinding, item); 
			this.addRow(rowDiv, nBinding); //not the first binding...
		});
		
		var removeCon = dojo.connect(remove, "onClick", function() {
			if (cardTr.getCardinality() === 1) {
				//Clear somehow.
//				binding.setValue(null);
	//			tb.attr("value", "");
			} else {
				dojo.disconnect(con);
				dojo.disconnect(addCon);
				dojo.disconnect(removeCon);
				//Remove somehow.
				binding.remove();
				dojo.destroy(rowDiv);
			}
		});
	},
	_addRemoveButton: function(fieldDiv, binding, containerDiv, onReset) {
		var remove = new dijit.form.Button({label: "remove"}, dojo.create("div", null, containerDiv));
		var cardTr = binding.getCardinalityTracker();
		var con = dojo.connect(cardTr, "cardinalityChanged", function() {
			remove.attr("disabled", cardTr.isMin());
		});
		
		var removeConnect = dojo.connect(remove, "onClick", function() {
			if (cardTr.getCardinality() === 1) {
				if (binding.getItem() instanceof rforms.template.Choice) {
					binding.setChoice(null);					
				} else {
					binding.setValue(null);					
				}
				onReset();
			} else {
				dojo.disconnect(con);
				dojo.disconnect(removeConnect);
				binding.remove();
				dojo.destroy(fieldDiv);
			}
		});
	},

	_addExpandButton: function(rowDiv, labelDiv, item) {
		var expand = new dijit.form.Button({label: "expand"}, dojo.create("span", null, labelDiv));
		var expandCon = dojo.connect(expand, "onClick", this, function() {
			var nBinding = rforms.model.create(this.binding, item);
			if (this.showAsTable(item)) {
				var table = this.addTable(rowDiv, nBinding, item);
				this.fillTable(table, [nBinding]);
			} else {
				this.addRow(rowDiv, nBinding, false); //not the first binding...
				this._addGroupButtons(rowDiv, labelDiv, nBinding);					
			}
			expand.destroy();
			dojo.disconnect(expandCon);				
		});
	},

	_addTableRow: function(table, binding) {
		var childItems = binding.getItem().getChildren();
		var groupedBindings = binding.getItemGroupedChildBindings();
		var trEl = dojo.create("tr", null, table);
		
		dojo.forEach(groupedBindings, function(bindings, index) {
			//Create those columns that are missing:
			if (bindings.length === 0 && !childItems[index].hasClass("noneditable")) {
				rforms.model.create(binding, childItems[index]);
			}
		});
		dojo.forEach(groupedBindings, function(bindings, index) {
			this.addComponent(dojo.create("td", null, trEl), bindings[0], true);
		}, this);
		
		if (!binding.getItem().hasClass("firstcolumnfixedtable")) {
			var lastTd = dojo.create("td", {"class": "tableControl"}, trEl);
			var remove = new dijit.form.Button({label: "remove"}, dojo.create("span", null, lastTd));	
			var cardTr = binding.getCardinalityTracker();
			var cardConnect1 = dojo.connect(cardTr, "cardinalityChanged", function() {
				remove.attr("disabled", cardTr.isMin());
			});	
			var removeConnect = dojo.connect(remove, "onClick", this, function() {
				if (cardTr.getCardinality() === 1) {
					var parentBinding = binding.getParent(), item = binding.getItem();
					var nBinding = rforms.model.create(parentBinding, item);
					this._addTableRow(table, nBinding);
				} 
				dojo.disconnect(cardConnect1);
				dojo.disconnect(removeConnect);
				binding.remove();
				dojo.destroy(trEl);
			});
		}
	},

	_getLabelForChoice: function(binding, item) {
		var choice = binding.getChoice();
		if (choice) {
			return item._getLocalizedValue(choice.label).value;
		}
	},
	/*
	 * From a Choice Item the possible values are extracted and added into 
	 * a ItemFileReadStore that is returned
	 */
	_createChoiceStore: function(/*Choice*/ item){
		return this._getStoreFromArray(item.getChoices(), item);
	},
	/*
	 * From an array of choices that contains value and labels an 
	 * DataStore is created and returned. The object inside 
	 * the array should have the following structure:
	 *  {"value": "Value",
	 *  "label": {"en": "English-label", "sv": "Svensk label"}
	 * }
	 */
	_getStoreFromArray: function(/*Array of objects*/objects, /*The item*/ item, noEmptyValue){
		
		//Adds an empty choice when min cardinality > 0
		var itemsArray = this._getCopiedLabeledChoices(objects, item);
		if (noEmptyValue !== true && !(item.getCardinality().min > 0)) {
			itemsArray.push({value: "", label: "No value", top: true});
		}
		var store = new rforms.view.SortedStore({
			sortBy: "label",
			data: {
				identifier: "value",
				label: "label",
				items: itemsArray
			}
		});
		return store;
	},
	_getCopiedLabeledChoices: function(objects, item) {
		var itemsArray = [];
		for (var i in objects){
			var currentLabel = item._getLocalizedValue(objects[i].label);
			var obj = {value: objects[i].value, label: currentLabel.value};
			if (objects[i].top === true) {
				obj.top = true;
			}
			if (objects[i].children != null) {
				obj.children = dojo.clone(objects[i].children);
			}
			if (objects[i].selectable === false) {
				obj.selectable = false;				
			}
			itemsArray.push(obj);
		}
		return itemsArray;
	},
	/*
	 * 
	 * This method returns a list of language-codes and their label (in several translations)
	 * An example for English looks like this:
	 * {"value": "en",
	 *  "label": {"en": "English", "sv": "Engelska"}
	 * }
	 *  
	 * @return {Array} of languages.
	 */
	_getLanguagesList:function (){ //TODO: Take this list from some kind of configuration
		var list = [{"value": "", label:{"en":"", "sv":""}},
		            {"value": "en", label:{"en":"English", "sv":"Engelska"}},
		            {"value": "de", label:{"en":"German", "sv":"Tyska"}},
					{"value": "sv", label:{"en":"Swedish", "sv":"Svenska"}}];
		return list;
	}
});