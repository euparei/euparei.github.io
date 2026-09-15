"use strict";

if (!Utils) { var Utils = {}; }

(function() {
	
	if (!Utils.DOM) { Utils.DOM = {}; }

	Utils.DOM.visible = function(element) { Utils.$(element).style.visibility = 'initial'; }
	Utils.DOM.invisible = function(element) { Utils.$(element).style.visibility = 'hidden'; }
	Utils.DOM.isVisible = function(element) { return getComputedStyle(Utils.$(element)).visibility != 'hidden'; }

	Utils.DOM.displayed = function(element) { Utils.$(element).style.display = 'initial'; }
	Utils.DOM.undisplayed = function(element) { Utils.$(element).style.display = 'none'; }
	Utils.DOM.isDisplayed = function(element) { return getComputedStyle(Utils.$(element)).display != 'none'; }

})();