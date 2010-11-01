/*global dojo, rforms*/
dojo.provide("rforms.model.CardinalityTracker");

/**
 * A counter paired with a item with cardinality restrictions.
 * To update the counter use the increment and decrement methods.
 * If the counter passes a cardinality restriction the 
 * corresponding hook is called, that is, maxReached, minReached,
 * and justFine when the counter moved within the acceptable
 * cardinality restrictions.
 */
dojo.declare("rforms.model.CardinalityTracker", null, {
	//===================================================
	// Private attributes
	//===================================================
	_listeners: null,
	_counter: 0,
	_limits: null,
	
	//===================================================
	// Public hooks
	//===================================================	
	maxReached: function() {
	},
	minReached: function() {
	},
	justFine: function() {	
	},
	
	//===================================================
	// Public API
	//===================================================
	getCardinality: function() {
		return this._counter;
	},
	increment: function() {
		this._counter++;
		this._checkCounter();
	},
	decrement: function() {
		this._counter--;
		this._checkCounter();		
	},
	//===================================================
	// Inherited methods
	//===================================================
	constructor: function(item) {
		this._listener = [];
		this._limits = item.getCardinality() || {};
	},

	//===================================================
	// Private methods
	//===================================================
	_checkCounter: function() {
		if (this._limits.max !== undefined && this._counter >= this._limits.max) {
			this._fine = false;
			this.maxReached();
			return;
		}
		if (this._limits.min !== undefined && this._counter <= this._limits.min) {
			this._fine = false;
			this.minReached();
			return;		
		}
		if (this._fine === false) {
			this._fine = true;
			this.justFine();
		}
	}
}); 