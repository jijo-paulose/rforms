/*global dojo, rforms, dijit*/
dojo.provide("rforms.view.View");
dojo.require("dijit._Widget");

dojo.declare("rforms.view.View", dijit._Widget, {
	//===================================================
	// Public attributes
	//===================================================
	binding: null,
	template: null,
	topLevel: true,
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
		dojo.addClass(aroundNode, "hasInfo");		
	},
	
	//===================================================
	// Inherited methods
	//===================================================
	/**
	 * Builds the user interface by iterating over the child bindings of the current binding and recursively
	 * creates new views for all groupbindings.
	 */
	buildRendering: function() {
		var groupIndex, table, lastRow,
			groupedItemsArr = this.binding.getItem().getChildren(), 
			groupedBindingsArr = this.binding.getItemGroupedChildBindings(), 
			bindings, item;

		this.domNode = this.srcNodeRef;
		dojo.addClass(this.domNode, "rforms");
		dojo.addClass(this.domNode, this.styleCls);

		for (groupIndex = 0; groupIndex < groupedBindingsArr.length; groupIndex++) {
			bindings = groupedBindingsArr[groupIndex];
			item = groupedItemsArr[groupIndex];

			if (!this.showNow(item, bindings)) {
				continue;
			}

			bindings = this.prepareBindings(item, bindings);
			
			//Table case
			if (this.showAsTable(item)) {
				table = this.addTable(lastRow, bindings[0]);
				this.fillTable(table, bindings);
				lastRow = table.parentElement;
			
			//Non table case
			} else {
				dojo.forEach(bindings, function(binding, index) {
					lastRow = this.addRow(lastRow, binding, index);
				}, this);
			}
									
			//Activates/deactivates buttons at startup if needed
			bindings[0].getCardinalityTracker().checkCardinality();
		}
	},

	/**
	 * Adds a single row corresponding to a binding.
	 * 
	 * @param {Object} lastRow last row that was added
	 * @param {Object} binding the binding to add a row for
	 * @param {Object} index if multiple rows are added for the same item this variable holds the index within the same item 
	 */
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
		this.addComponent(fieldDiv, binding);
		return newRow || lastRow;
	},
	addComponent: function(fieldDiv, binding, noCardinalityButtons) {
		//Taking care of the field, either group, choice or text.
		if (binding instanceof rforms.model.GroupBinding) {
			dojo.addClass(fieldDiv, "group");
			this.addGroup(fieldDiv, binding, noCardinalityButtons);
		} else if (binding instanceof rforms.model.ChoiceBinding ||
					binding instanceof rforms.model.PropertyChoiceBinding) {
			dojo.addClass(fieldDiv, "field");
			this.addChoice(fieldDiv, binding, noCardinalityButtons);
		} else if (binding instanceof rforms.model.ValueBinding) {
			dojo.addClass(fieldDiv, "field");
			this.addText(fieldDiv, binding, noCardinalityButtons);
		}
	},
	showAsTable: function(item) {
		return item instanceof rforms.template.Group && item.hasClass("table");
	},

	//===================================================
	// Private methods
	//===================================================	
	_showInfo:function(item, aroundNode) {
		var ttd = new dijit.TooltipDialog({});
		var property = item.getProperty();
		var description = item.getDescription();
		var message;
		if (property != null && description != null) {
			message = "<div><span class='propertyLabel'>Property:&nbsp;</span><span class='propertyValue'>"+item.getProperty()+"</span></div><div><span class='descriptionLabel'>Description:&nbsp;</span><span class='descriptionValue'>"+item.getDescription()+"</span></div>";
		} else if (property != null) {
			message = "<span class='propertyLabel'>Property:&nbsp;</span><span class='propertyValue'>"+item.getProperty()+"</span>";
		} else {
			message = "<span class='descriptionLabel'>Description:&nbsp;</span><span class='descriptionValue'>"+item.getDescription()+"</span>";
		}
		var node = dojo.create("div", {"innerHTML": message, "class": "rforms itemInfo"});
		ttd.set("content", node);
		dijit.popup.open({popup: ttd, around: aroundNode});
		ttd._onBlur = function() {
				dijit.popup.close(ttd);
				ttd.destroy();
		};
	}
});