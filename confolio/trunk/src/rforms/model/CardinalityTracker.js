/*global dojo, rforms*/
dojo.provide("rforms.model.CardinalityTracker");

/**
 * @param {Object} item
 * @param {Object} statement
 */
dojo.declare("rforms.model.CardinalityTracker", null, {
	_listeners: null,
	_counter: 0,
	_limits: null,
	
	constructor: function(item) {
		this._listener = [];
		this._limits = item.getCardinality() || {};
	},
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
	},
	maxReached: function() {
	},
	minReached: function() {
	},
	justFine: function() {	
	}
});
 