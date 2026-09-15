"use strict";

if (!Utils) { var Utils = {}; }

(function() {

	if (!Utils.COOKIES) { Utils.COOKIES = {}; }
	if (!Utils.COOKIES.JSON) { Utils.COOKIES.JSON = {}; }
	
	Utils.COOKIES.JSON.set = function(cookieName, cookieObject, days) {
		Utils.COOKIES.set(cookieName, JSON.stringify(cookieObject), days);
	};
	
	Utils.COOKIES.JSON.get = function(cookieName) {
		return JSON.parse(Utils.COOKIES.get(cookieName));
	};

})();
