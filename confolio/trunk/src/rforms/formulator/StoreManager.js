dojo.provide("rforms.formulator.StoreManager");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.BorderContainer");
dojo.require("rdfjson.Graph");
dojo.require("rforms.view.Editor");
dojo.require("rforms.model.Engine");

dojo.declare("rforms.formulator.StoreManager", [dijit.layout._LayoutWidget, dijit._Templated], {	
	//===================================================
	// Public attributes
	//===================================================
	itemStore: null,

	//===================================================
	// Inherited attributes
	//===================================================
	templatePath: dojo.moduleUrl("rforms.formulator", "StoreManagerTemplate.html"),
	widgetsInTemplate: true,
	
	//===================================================
	// Inherited methods
	//===================================================
	postCreate: function() {
		this.inherited("postCreate", arguments);
		this._buildList();
		dojo.connect(this._listNode, "onclick", this, this._itemIdClicked);
	},
	resize: function() {
		this.inherited("resize", arguments);
		if (this._bcDijit) {
			this._bcDijit.resize();
		}		
	},
	//===================================================
	// Private methods
	//===================================================
	_buildList: function() {
		dojo.create("div", {innerHTML: "all"}, this._listNode);		
		dojo.forEach(this.itemStore.getItemIds(), function(id) {
			dojo.create("div", {innerHTML: id}, this._listNode);
		}, this);
	},
	_itemIdClicked: function(event) {
		if (event.target !== this._listNode) {
			var id = dojo.attr(event.target, "innerHTML");
			if (id === "all") {
				this._showAll();
			} else {
				this._showContent(this.itemStore.getItem(id));
			}
		}
	},
	_showContent: function(item) {
		dojo.attr(this._contentsNode, "value", dojo.toJson(item._source, true, "  "));
		var graph = new rdfjson.Graph({});
		var template = this.itemStore.createTemplateFromChildren([item]);
		var binding = rforms.model.match(graph, "http://example.org/about", template);
		if (this._editorDijit != null) {
			this._editorDijit.destroy();
		}
		this._editorDijit = new rforms.view.Editor({template: template, binding: binding}, dojo.create("div", null, this._previewNode));
	},
	_showAll: function() {
		var arr = [];
		dojo.forEach(this.itemStore.getItemIds(), function(id) {
			arr.push(this.itemStore.getItem(id)._source);
		}, this);

		var str = dojo.toJson(arr, true, "  ");
		dojo.attr(this._contentsNode, "value", str);
		if (this._editorDijit != null) {
			this._editorDijit.destroy();
		}
	}
});