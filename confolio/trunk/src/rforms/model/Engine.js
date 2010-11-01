/*global rforms, dojo, rdfjson*/
dojo.provide("rforms.model.Engine");
dojo.require("rforms.model.CardinalityTracker");
dojo.require("rforms.model.GroupBinding");
dojo.require("rforms.model.PropertyGroupBinding");
dojo.require("rforms.model.ValueBinding");
dojo.require("rforms.model.ChoiceBinding");
dojo.require("rforms.template.Template");
dojo.require("rdfjson.Graph");


//===============================================
//Public API for matching and creation engine
//===============================================

/**
 * Matches a tree of statements with the uri as root
 * according to the constraints of the given template. 
 * All the statements matched are found in the graph.
 * All statements in the graph that could be matched into the tree 
 * are matched into the tree.
 * The tree is represented as a binding tree.
 * 
 * @param {rdfjson.Graph} graph
 * @param {String} uri
 * @param {rforms.template.Template} template
 * @return an rforms.model.GroupBinding which is the root of binding tree.
 */			
rforms.model.match = function(graph, uri, template) {
	var rootBinding = new rforms.model.GroupBinding({item: template.getRoot(), childrenRootUri: uri});
	rforms.model._matchGroupItemChildren(rootBinding, graph);
	return rootBinding;
};

/**
 * Creates a new binding below the given parentBinding according to what the item specifies. 
 * New triples are created in the provided graph although not expressed if they have an
 * empty predicate or object. The item must be a direct child of the item
 * of the parentBinding.
 * 
 * @param {rforms.model.Binding} parentBinding
 * @param {rforms.template.Item} item
 * @param {rdfjson.Graph} graph
 */
rforms.model.create = function(parentBinding, item) {
	if (item instanceof rforms.template.Text) {
		return rforms.model._createTextItem(parentBinding, item);
	} else if (item instanceof rforms.template.PropertyGroup) {
		return rforms.model._createPropertyGroupItem(parentBinding, item);
	} else if (item instanceof rforms.template.Group) {
		return rforms.model._createGroupItem(parentBinding, item);
	} else if (item instanceof rforms.template.Choice) {
		return rforms.model._createChoiceItem(parentBinding, item);		
	}	
};


//===============================================
//Core creation engine
//===============================================
rforms.model._createTextItem = function(parentBinding, item) {
	var graph = parentBinding.getGraph();
	var stmt = graph.create(parentBinding.getChildrenRootUri(), item.getProperty(), {type: "literal", value: ""}, false);
	var nbinding = new rforms.model.ValueBinding({item: item, statement: stmt});
	parentBinding.addChildBinding(nbinding);
	return nbinding;
};

rforms.model._createChoiceItem = function(parentBinding, item) {
	var graph = parentBinding.getGraph();
	var stmt = graph.create(parentBinding.getChildrenRootUri(), item.getProperty(), {type: "uri", value: ""}, false);
	var nbinding = new rforms.model.ChoiceBinding({item: item, statement: stmt});
	parentBinding.addChildBinding(nbinding);
	return nbinding;
};

rforms.model._createGroupItem = function(parentBinding, item) {
	var stmt, constr;
	if (item.getProperty() !== undefined) {
		var graph = parentBinding.getGraph();
		stmt = graph.create(parentBinding.getChildrenRootUri(), item.getProperty(), null, false);		
		constr = rforms.model._createStatementsForConstraints(graph, stmt.getSubject(), item);
	}

	var nBinding = new rforms.model.GroupBinding({item: item, statement: stmt, constraints: constr});
	parentBinding.addChildBinding(nBinding);
	dojo.forEach(item.getChildren(), function(childItem) {
		rforms.model.create(nBinding, childItem);
	});
	return nBinding;
};

rforms.model._createPropertyGroupItem = function(parentBinding, item) {
	var stmt, constr;
	var oItem = item.getChildren()[1];
	var graph = parentBinding.getGraph();
	if (oItem instanceof rforms.template.Group) {
		stmt = graph.create(parentBinding.getChildrenRootUri(), "", null, false);		
		constr = rforms.model._createStatementsForConstraints(graph, stmt.getSubject(), oItem);
	} else if (oItem instanceof rforms.model.Choice) {
		stmt = graph.create(parentBinding.getChildrenRootUri(), "", {type: "uri", value: ""}, false);
	} else {
		stmt = graph.create(parentBinding.getChildrenRootUri(), "", {type: "literal", value: ""}, false);
	}

	var nBinding = new rforms.model.PropertyGroupBinding({item: item, statement: stmt, constraints: constr});
	parentBinding.addChildBinding(nBinding);
	if (oItem instanceof rforms.template.Group) {
		dojo.forEach(oItem.getChildren(), function(childItem) {
			rforms.model.create(nBinding.getObjectBinding(), childItem);
		});
	}
	return nBinding;
};

//===============================================
//Core matching engine
//===============================================


rforms.model._matchGroupItemChildren = function(pb, graph) {
	dojo.forEach(pb.getItem().getChildren(), function(item) {
		rforms.model._matchItem(pb, item, graph);
	});
};

rforms.model._matchItem = function(pb, item, graph) {
	if (item instanceof rforms.template.Text) {
		rforms.model._matchTextItem(pb, item, graph);
	} else if (item instanceof rforms.template.PropertyGroup) {
		rforms.model._matchPropertyGroupItem(pb, item, graph);
	} else if (item instanceof rforms.template.Group) {
		rforms.model._matchGroupItem(pb, item, graph);
	} else if (item instanceof rforms.template.Choice) {
		rforms.model._matchChoiceItem(pb, item, graph);		
	}
};

rforms.model._matchGroupItem = function(pb, item, graph) {
	var stmts, bindings, constStmts, groupBinding;
	//Case 1: there is a property in the item
	if (item.getProperty() !== undefined) {
		stmts = graph.find(pb.getChildrenRootUri(), item.getProperty());
		if (stmts.length > 0) {
			bindings = [];
			dojo.forEach(stmts, function(stmt) {
				if (rforms.model._isNodeTypeMatch(item, stmt)) {
					constStmts = rforms.model._findStatementsForConstraints(graph, stmt.getValue(), item);
					if (constStmts !== undefined) {
						groupBinding =new rforms.model.GroupBinding({item:item, statement: stmt, constraints: constStmts}); 
						bindings.push(groupBinding);
						rforms.model._matchGroupItemChildren(groupBinding, graph); //Recursive call
					}
				}
			});
			pb.addChildBindings(bindings);
		}
	//Case 2: there is no property in the item, i.e. a layout item.
	} else {
		groupBinding = new rforms.model.GroupBinding({item: item});
		pb.addChildBindings([groupBinding]);
		rforms.model._matchGroupItemChildren(groupBinding, graph); //Recursive call
	}
};

rforms.model._matchPropertyGroupItem = function(pb, item, graph) {
	var stmts, constStmts;
	var bindings, binding, pChoice, oChoice;
	var pItem = item.getPropertyItem(), oItem = item.getObjectItem();
	
	stmts = graph.find(pb.getChildrenRootUri());
	if (stmts.length > 0) {
		bindings = [];
		dojo.forEach(stmts, function(stmt) {
			if (rforms.model._isNodeTypeMatch(oItem, stmt)) {
				pChoice = rforms.model._findChoice(pItem, stmt.getPredicate());
				
				if (pChoice !== undefined) {
					binding = null;
					if (oItem instanceof rforms.template.Group) {
						constStmts = rforms.model._findStatementsForConstraints(graph, stmt.getValue(), oItem);
						if (constStmts !== undefined) {
							binding = new rforms.model.PropertyGroupBinding({item: item, statement: stmt, constraints: constStmts});
							rforms.model._matchGroupItemChildren(binding.getObjectBinding(), graph); //Recursive call
						}
					} else if (oItem instanceof rforms.model.Choice) {
						oChoice = rforms.model._findChoice(oItem, stmt.getValue());
						if (oChoice !== undefined) {
							binding = new rforms.model.PropertyGroupBinding({item: item, statement: stmt});
							binding.getObjectBinding.setChoice(oChoice);
						}
					} else {
						binding = new rforms.model.PropertyGroupBinding({item: item, statement: stmt});
					}
					
					if (binding !== null) {
						binding.getPredicateBinding().setChoice(pChoice);
						bindings.push(binding);
					}
				}
			}
		});
		pb.addChildBindings(bindings);
	}
};

rforms.model._matchTextItem = function(pb, item, graph) {
	var stmts, bindings, constStmts;
	stmts = graph.find(pb.getChildrenRootUri(), item.getProperty());
	if (stmts.length > 0) {
		bindings = [];
		dojo.forEach(stmts, function(stmt) {
			if (rforms.model._isNodeTypeMatch(item, stmt)) {
				bindings.push(new rforms.model.ValueBinding({item: item, statement: stmt}));
			}
		});
		pb.addChildBindings(bindings);
	}
};

rforms.model._matchChoiceItem = function(pb, item, graph) {
	var stmts, bindings, choice;
	stmts = graph.find(pb.getChildrenRootUri(), item.getProperty());
	if (stmts.length > 0) {
		bindings = [];
		dojo.forEach(stmts, function(stmt) {
			if (rforms.model._isNodeTypeMatch(item, stmt)) {
				choice = rforms.model._findChoice(item, stmt.getValue());
				if (choice !== undefined) {
					bindings.push(new rforms.model.ChoiceBinding({item: item, statement: stmt, choice: choice}));
				}
			}
		});
		pb.addChildBindings(bindings);
	}
};

//===============================================
// Utility functions used for matching purposes
//===============================================

/**
 * Compares the the type specified in the item and the type of the statements object.
 * @param {rforms.template.Item} item  
 * @param {jsonrdf.Statement} stmt
 */
rforms.model._isNodeTypeMatch = function(item, stmt) {
	var objectType = stmt.getType();
	switch (item.getNodetype()) {
		case "LITERAL":
		case "LANGUAGE_LITERAL":
			return objectType === "literal";
		case "RESOURCE":
			return objectType === "uri" || objectType === "bnode";
	}
	return false;
};

/**
 * Matches constraints in the item to statements in the graph with the given uri as subject. 
 * 
 * @param {rdfjson.Graph} graph containing all available statements to match against.
 * @param {String} uri the subject to start matching from
 * @param {rforms.template.Item} item containing the constraints.
 * @return an array of statements on success, undefined on failure. 
 *  If there are no constraints to match in the item an empty array is returned.
 */
rforms.model._findStatementsForConstraints = function(graph, uri, item) {
	var stmts, constr, results = [];
	if (dojo.isObject(item.getConstraints())) {
		constr = item.getConstraints();
		for (var key in constr) {
			if (constr.hasOwnProperty(key)) {
				stmts = graph.find(uri, key, {type: "uri", value: constr[key]});
				if (stmts.length == 1) {
					results.push(stmts[0]);
				} else {
					return; //did not find any match for the current constraint == failure.
				}				
			}
		}
		return results;
	} else {
		return [];
	}
};

rforms.model._createStatementsForConstraints = function(graph, uri, item) {
	var stmts, constr, results = [];
	if (dojo.isObject(item.getConstraints())) {
		constr = item.getConstraints();
		for (var key in constr) {
			if (constr.hasOwnProperty(key)) {
				results.push(graph.create(uri, key, {type: "uri", value: constr[key]}, false));
			}
		}
		return results;
	} else {
		return [];
	}
};

rforms.model._findChoice = function(item, obj) {
	var index, choices = item.getChoices();
	for (index = 0;index < choices.length;index++) {
		if (choices[index].d === obj) {
			return choices[index];
		}
	}
};