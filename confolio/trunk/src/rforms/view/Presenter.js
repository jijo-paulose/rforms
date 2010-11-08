/*global dojo, rforms, dijit*/
dojo.provide("rforms.view.Presenter");
dojo.require("dijit._Widget");

dojo.declare("rforms.view.Presenter", dijit._Widget, {
	binding: null,
	template: null,
	topLevel: true,
	showLanguage: true,
	filterTranslations: true,
	styleCls: "presenter",
	
	buildRendering: function() {
		var groupIndex, tableRow, itemsGroupedBindings = this.binding.getItemGroupedChildBindings(), itemGroupedBindings;
		this.domNode = this.srcNodeRef;
		dojo.addClass(this.domNode, "rforms");
		dojo.addClass(this.domNode, this.styleCls);

		var lastRow;	
		for (groupIndex = 0; groupIndex < itemsGroupedBindings.length; groupIndex++) {
			itemGroupedBindings = itemsGroupedBindings[groupIndex];
			if (itemGroupedBindings.length === 0) {
				continue;
			}
			tableRow = this.addTable(lastRow, itemGroupedBindings);
			if (tableRow !== undefined) {
				lastRow = tableRow;
				continue;
			}
			//Filter out value in correct language if appropriate
			itemGroupedBindings = this.filterValues(itemGroupedBindings);

			dojo.forEach(itemGroupedBindings, function(binding, index) {
				lastRow = this.addRow(lastRow, binding, index);
			}, this);
		}
	},
	addRow: function(lastRow, binding, index) {
		var fieldDiv, newRow;
		
		//Taking care of dom node structure plus label.
		if (index === 0 || binding instanceof rforms.model.GroupBinding) {
			//New rowDiv since we have a label
			if (lastRow === undefined) {
				newRow = dojo.create("div", null, this.domNode);
			} else {
				newRow = dojo.create("div", null, lastRow, "after");
			}
			this.addLabel(newRow, dojo.create("div", null, newRow), binding);
			fieldDiv = dojo.create("div", null, newRow);

			if (this.topLevel) {
				dojo.addClass(newRow, "topLevel");
			}
		} else {
			//No new rowDiv since we have a repeated value under the same label.
			fieldDiv = dojo.create("div", null, lastRow);
			dojo.addClass(fieldDiv, "repeatedValue");
		}
		
		//Taking care of the field, either group, choice or text.
		if (binding instanceof rforms.model.GroupBinding) {
			dojo.addClass(fieldDiv, "group");
			this.addGroup(fieldDiv, binding);
		} else if (binding instanceof rforms.model.ChoiceBinding ||
					binding instanceof rforms.model.PropertyChoiceBinding) {
			dojo.addClass(fieldDiv, "field");
			this.addChoice(fieldDiv, binding);
		} else if (binding instanceof rforms.model.ValueBinding) {
			dojo.addClass(fieldDiv, "field");
			this.addText(fieldDiv, binding);
		}
		return newRow;
	},
	filterValues: function(bindings) {
		var alts = {}, index, item = bindings[0].getItem();
		if (!this.filterTranslations || item.getNodetype() !== "LANGUAGE_LITERAL") {
			return bindings;
		}
		for (index =0;index<bindings.length;index++) {
			var lang = bindings[index].getLanguage();
			if (lang === dojo.locale) {
				alts.best = bindings[index];
			} else if (lang.indexOf(dojo.locale) !== -1 || dojo.locale.indexOf(lang) !== -1) {
				alts.close = bindings[index];				
			} else if (lang.indexOf(this.defaultLanguage) === 0) {
				alts.defaultLanguage = bindings[index];
			} else if (lang === "" || lang === undefined) {
				alts.noLanguage = bindings[index];
			}
		}
		var singleBinding = alts.best || alts.close || alts.defaultLanguage || alts.noLanguage;
		return  singleBinding !== undefined ? [singleBinding] : bindings;
	},
	addTable: function(lastRow, bindings) {
		var item = bindings[0].getItem(), newRow;
		if (!(item instanceof rforms.template.Group) || !item.hasClass("table")) {
			return;
		}
		if (lastRow === undefined) {
			newRow = dojo.create("div", null, this.domNode);
		} else  {
			newRow = dojo.create("div", null, lastRow, "after");
		}
		if (this.topLevel) {
			dojo.addClass(newRow, "topLevel");			
		}

		var rowInd, colInd, childItems, childBindings, childBindingsGroups, tableEl, trEl;
		
		this.addLabel(newRow, dojo.create("div", null, newRow), bindings[0]);
		childItems = item.getChildren();
		tableEl = dojo.create("table", null, newRow);
		dojo.addClass(tableEl, "group");
		
		trEl = dojo.create("thead", null, tableEl);
		for (colInd = 0;colInd < childItems.length;colInd++) {
			dojo.create("th", {innerHTML: childItems[colInd].getLabel()}, trEl);
		}
		for (rowInd = 0; rowInd < bindings.length;rowInd++) {
			childBindingsGroups = bindings[rowInd].getItemGroupedChildBindings();
			trEl = dojo.create("tr", null, tableEl);
			
			for (colInd = 0; colInd< childBindingsGroups.length;colInd++) {
				dojo.create("td", {innerHTML: childBindingsGroups[colInd].length > 0 ? childBindingsGroups[colInd][0].getValue() : ""}, trEl);
			}
		}
		return newRow;
	},
	addLabel: function(rowDiv, labelDiv, binding) {
		var item = binding.getItem();
		var isGroup = item instanceof rforms.template.Group;
		dojo.attr(labelDiv, "innerHTML", item.getLabel()+(isGroup ? "": ":"));
		dojo.addClass(labelDiv, "label");
	},
	addGroup: function(fieldDiv, binding) {
		var subView = new rforms.view.Presenter({binding: binding, template: this.template, topLevel: false}, fieldDiv);
	},
	addText: function(fieldDiv, binding) {
		if (this.showLanguage && binding.getLanguage()) {
			var lang = dojo.create("div", {"innerHTML": binding.getLanguage()}, fieldDiv);
			dojo.addClass(lang, "language");
		}
		dojo.create("div", {"innerHTML": binding.getValue()}, fieldDiv);
	},
	addChoice: function(fieldDiv, binding) {
		var item = binding.getItem();
		dojo.create("span", {"innerHTML": item._getLocalizedValue(binding.getChoice().label).value}, fieldDiv);
	}
});