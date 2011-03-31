/*
 * Copyright (c) 2007-2010
 *
 * This file is part of Confolio.
 *
 * Confolio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Confolio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Confolio. If not, see <http://www.gnu.org/licenses/>.
 */

dojo.provide("rforms.view.TreeOntologyChooser");
dojo.require("dijit._Templated");
dojo.require("dijit.Dialog");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.form.Button");
dojo.require("dijit.Tree");
dojo.require("dojo.data.ItemFileReadStore");

dojo.declare("rforms.view.TreeOntologyChooser", [dijit.layout._LayoutWidget, dijit._Templated], {
	templatePath: dojo.moduleUrl("rforms.view", "TreeOntologyChooserTemplate.html"),
	widgetsInTemplate: true,

	//===================================================
	// Public API
	//===================================================
	show: function() {
		this._showValueFromChoice(this.binding.getChoice());
		var viewport = dijit.getViewport();
		dojo.style(this.bc.domNode, {
                width: Math.floor(viewport.w * 0.70)+"px",
                height: Math.floor(viewport.h * 0.70)+"px",
                overflow: "auto",
                position: "relative"    // workaround IE bug moving scrollbar or dragging dialog
        });
		this.bc.resize();
		this.dialog.show();
	},

	//===================================================
	// Public hooks
	//===================================================
	done: function() {
	},

	//===================================================
	// Inherited methods
	//===================================================
	
	postCreate: function() {
		this.inherited("postCreate", arguments);
		this._choices = this.binding.getItem().getChoices();
		this._store = this._getItemFileReadStoreFromArray(this._choices, this.binding.getItem());
		this._showAsTree(this.binding);
		this.bc.startup();
	},
	
	
	//===================================================
	// Private methods
	//===================================================
	_cancelClicked: function() {
		this.dialog.hide();
	},
	_doneClicked: function() {
		dojo.forEach(this._choices, function(choice) {
			if (this.selectedValue === choice.d) {
				this.binding.setChoice(choice);				
			}
		}, this);
		this.dialog.hide();
		this.done();
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
		var objects = item.getChoices(), itemsArray = [];
		for (var i in objects){
			var currentLabel = item._getLocalizedValue(objects[i].label);
			var obj = {d: objects[i].d, label: currentLabel.value};
			if (objects[i].top === true) {
				obj.top = true;
			}
			if (objects[i].children != null) {
				obj.children = objects[i].children;
			}
			if (objects[i].selectable === false) {
				obj.selectable = false;				
			}
			itemsArray.push(obj);
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
	_showAsTree: function(binding){
		var item = binding.getItem();
		this.tree = new dijit.Tree({store: this._store,
								childrenAttr: ["children"], 
								query: {top: true}}, this.treeNode);
		this.tree.getLabelClass = dojo.hitch(this, function(item) {
			if(item == null) {
				return "";
			}
			var value = this._store.getValue(item, "d");
			if(this._store.getValue(item, "selectable") === false) {
				return "notselectable";				
			} if (this.binding.getChoice() && this.binding.getChoice().d === value) {
				return "currentselection";				
			}
			return "default";
		});
		
								
		this.tree.onClick = dojo.hitch(this, this._showValue);
		this.tree.startup();
/*		dojo.connect(node, "onClick",dojo.hitch(this, function(e){
			if (this.toolTipNode === node) {
				dijit.popup.close(ontologyPopupWidget);
				this.toolTipNode = null;
				return;
			}
				
		}));
*/		
		/*if (this.toolTipNode === node) {
				dijit.popup.close(this);
				this.toolTipNode = null;
				e.preventDefault();
				return;
			}
			this.toolTipNode = node;
			// stop the native click
			this.tooltipDialog.attr("content", description.replace(/(\r\n|\r|\n)/g, "<br/>"));
			e.preventDefault();
			
			dijit.focus(this.tooltipDialog.domNode);*/
	},
	_showValue: function(item) {
		var choice, d = this._store.getValue(item,"d");
		dojo.forEach(this._choices, function(c) {
			if (d === c.d) {
				choice = c;
			}
		}, this);
		this._showValueFromChoice(choice);
	},
	_showValueFromChoice: function(choice) {
		var item = this.binding.getItem();
		if (choice == null) {
			delete this.selectedValue;
			dojo.attr(this.uriNode, "innerHTML", "");
			dojo.attr(this.labelNode, "innerHTML", "");
			dojo.attr(this.descriptionNode, "innerHTML", "");			
		} else {
			this.selectedValue = choice.d;
			dojo.attr(this.uriNode, "innerHTML", this.selectedValue);
			dojo.attr(this.labelNode, "innerHTML", item._getLocalizedValue(choice.label).value || "(No label given.)");
			dojo.attr(this.descriptionNode, "innerHTML", item._getLocalizedValue(choice.description).value || "(No description given.)");
			if (choice.selectable !== false && (this.binding.getChoice() == null || this.binding.getChoice().d !== this.selectedValue)) {
				this.doneButton.set("disabled", false);
			} else {
				this.doneButton.set("disabled", true);
			}			
		}
	}
});