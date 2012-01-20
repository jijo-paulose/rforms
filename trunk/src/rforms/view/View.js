/*global dojo, rforms, dijit*/
dojo.provide("rforms.view.View");
dojo.require("dijit._Widget");
dojo.require("dijit.TooltipDialog");

dojo.declare("rforms.view.View", dijit._Widget, {
	//===================================================
	// Public attributes
	//===================================================
	binding: null,
	template: null,
	topLevel: true,
	compact: false,
	styleCls: "",

	//===================================================
	// Public API
	//===================================================
	
	/**
	 * Tells wether something should be shown for the provided bindings and belonging item.
	 * @param {Object} item
	 * @param {Object} bindings
	 * @return {Boolean} true if something should be shown.
	 */
	showNow: function(item, bindings) {
	},
	
	/**
	 * This function may change the array of bindings, for instance remove all but the best language or complement the existing bindings 
	 * until the min cardinality is reached.
	 *  
	 * @param {Object} item
	 * @param {Array} bindings
	 * @return {Array} of bindings
	 */
	prepareBindings: function(item, bindings) {
	},
	
	/**
	 * Adds a table with headers for the given firstBinding.
	 * @param {Node} lastRow if provided it is the last row as a DOM element.
	 * @param {Object} firstBinding the first binding to show in this table.
	 */
	addTable: function(lastRow, firstBinding) {
	},
	
	/**
	 * Fills the table with one row for each binding in bindings.
	 * 
	 * @param {Object} table a table DOM element 
	 * @param {Array} bindings an array of bindings 
	 */
	fillTable: function(table, bindings) {
	},
	
	addLabel: function(rowDiv, labelDiv, binding) {
	},
	addGroup: function(fieldDiv, binding) {
	},
	addText: function(fieldDiv, binding) {
	},
	addChoice: function(fieldDiv, binding) {
	},
	showInfo: function(item, aroundNode) {
		if (item == null || (item.getProperty() == null &&item.getDescription() == null)) {
				return;
		}
		this.connect(aroundNode, "onclick", dojo.hitch(this, this._showInfo, item, aroundNode));
		dojo.addClass(aroundNode, "rformsHasInfo");		
	},
	
	//===================================================
	// Inherited methods
	//===================================================
	/**
	 * Builds the user interface by iterating over the child bindings of the current binding and recursively
	 * creates new views for all groupbindings.
	 */
	buildRendering: function() {
		var groupIndex, table, lastRow, table,
			groupedItemsArr = this.binding.getItem().getChildren(), 
			groupedBindingsArr = this.binding.getItemGroupedChildBindings(), 
			bindings, item;

		this.domNode = this.srcNodeRef;
		dojo.addClass(this.domNode, "rforms");
		dojo.addClass(this.domNode, this.styleCls);
		if (this.compact) {
			dojo.addClass(this.domNode, "compact");			
		}

		for (groupIndex = 0; groupIndex < groupedBindingsArr.length; groupIndex++) {
			bindings = groupedBindingsArr[groupIndex];
			item = groupedItemsArr[groupIndex];

			if (!this.showNow(item, bindings)) {
				continue;
			}

			bindings = this.prepareBindings(item, bindings);
			
			//Table case
			if (this.showAsTable(item)) {
				lastRow = this.addLabelClean(lastRow, bindings[0], item);
				if (bindings.length > 0) {
					table = this.addTable(lastRow, bindings[0], item);
					this.fillTable(table, bindings);			
				}
			
			//Non table case
			} else {
				if (bindings.length > 0) {
					dojo.forEach(bindings, function(binding, index) {
						lastRow = this.addRow(lastRow, binding, index === 0);
					}, this);					
				} else {
					lastRow = this.addLabelClean(lastRow, null, item);
				}
			}
									
			//Activates/deactivates buttons at startup if needed
			if (bindings.length > 0){
				bindings[0].getCardinalityTracker().checkCardinality();				
			}
		}
	},

	/**
	 * Adds a single row corresponding to a binding.
	 * 
	 * @param {Object} lastRow last row that was added
	 * @param {Object} binding the binding to add a row for
	 * @param {Boolean} includeLabel, a label is added when true or if undefined and the binding corresponds to a group. 
	 */
	addRow: function(lastRow, binding, includeLabel) {
		var fieldDiv, newRow, item = binding.getItem();
		
		if (this.skipBinding(binding)) {
			return;
		}
		
		//Taking care of dom node structure plus label.
		if (includeLabel || (includeLabel == null && binding instanceof rforms.model.GroupBinding)) {
			newRow = this.addLabelClean(lastRow, binding, item);
			fieldDiv = dojo.create("div", null, dojo.create("div", {"class": "rformsFields"}, newRow));
		} else {
			//No new rowDiv since we have a repeated value under the same label.
			var rformsFields = dojo.query(".rformsFields", lastRow)[0];
			if (rformsFields != null) {
				fieldDiv = dojo.create("div", {"class": "rformsRepeatedValue"}, rformsFields);				
			} else { //Unless we have an non-expanded row.
				fieldDiv = dojo.create("div", null, dojo.create("div", {"class": "rformsFields"}, lastRow));				
			}
		}
		this.addComponent(fieldDiv, binding);
		return newRow || lastRow;
	},
	skipBinding: function(binding) {
		return false;
	},
	addLabelClean: function(lastRow, binding, item) {
		var newRow;

		//New rowDiv since we have a label
		if (lastRow === undefined) {
			newRow = dojo.create("div", null, this.domNode);
		} else {
			newRow = dojo.create("div", null, lastRow, "after");
		}
		if (this.topLevel) {
			dojo.addClass(newRow, "rformsTopLevel");
		}
		dojo.addClass(newRow, "rformsRow");

		dojo.forEach(item.getClasses(), function(cls) {
			if (cls.indexOf("rforms") == -1) {
				dojo.addClass(newRow, cls);
			}
		});
		if (item instanceof rforms.template.Group) {
			dojo.addClass(newRow, "notCompact");			
		}

		this.addLabel(newRow, dojo.create("div", null, newRow), binding, item);
		return newRow;
	},
	addComponent: function(fieldDiv, binding, noCardinalityButtons) {
		//Taking care of the field, either group, choice or text.
		if (binding instanceof rforms.model.GroupBinding) {
			dojo.addClass(fieldDiv, "rformsGroup");
			this.addGroup(fieldDiv, binding, noCardinalityButtons);
		} else if (binding instanceof rforms.model.ChoiceBinding ||
					binding instanceof rforms.model.PropertyChoiceBinding) {
			dojo.addClass(fieldDiv, "rformsField");
			this.addChoice(fieldDiv, binding, noCardinalityButtons);
		} else if (binding instanceof rforms.model.ValueBinding) {
			dojo.addClass(fieldDiv, "rformsField");
			this.addText(fieldDiv, binding, noCardinalityButtons);
		}
	},
	showAsTable: function(item) {
		return item instanceof rforms.template.Group && item.hasClass("rformsTable");
	},

	//===================================================
	// Private methods
	//===================================================	
	_showInfo:function(item, aroundNode) {
		if (rforms.__currentDomNode === aroundNode) {
			return;
		}
		rforms.__currentDomNode = aroundNode;
		
		//Prepare the TooltipDialog.
		var tooltipDialog = new dijit.TooltipDialog({});
		tooltipDialog._onBlur = function() {
			dijit.popup.close(tooltipDialog);
		};
		
		tooltipDialog.openPopup = function() {
			dijit.popup.open({
				popup: tooltipDialog,
				around: aroundNode,
				onClose: dojo.hitch(null, function() {
					tooltipDialog.destroy();
					setTimeout(function() {delete rforms.__currentDomNode;}, 500);
				})
			});
		};
		
		var node = dojo.create("div", {"class": "rforms itemInfo"});
		tooltipDialog.setContent(node);

		//Now init the content of the dialog
		var property = item.getProperty();
		var description = item.getDescription();
		var message = "<div class='itemInfoTable'>";
		var label = item.getLabel() || "";
		if (label !== "") {
			message += "<div><label class='propertyLabel'>Label:&nbsp;</label><span class='propertyValue'>"+label+"</span></div>";
		}
		if (property != null) {
			message += "<div><label class='propertyLabel'>Property:&nbsp;</label><span class='propertyValue'>"+item.getProperty()+"</span></div>";
		}
		if (description != null) {
			message += "<div><label class='descriptionLabel'>Description:&nbsp;</label><span class='descriptionValue'>"+item.getDescription()+"</span></div>";
		}
		message +="</div>";
		dojo.attr(node, "innerHTML", message);
		dijit.focus(node);
		
		//Launch the dialog.
		tooltipDialog.openPopup();
	}
});