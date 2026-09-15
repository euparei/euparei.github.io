"use strict";

if (!Utils) { var Utils = {}; }

(function() {
	
	if (!Utils.COOKIES) { Utils.COOKIES = {}; }

	Utils.COOKIES.get = function(cookieName) {
		var cookieString = document.cookie;
		var cookies = cookieString.split(/\s*;\s*/);
		var cookiesLength = cookies.length;
		for (var i = 0; i < cookiesLength; i++) {
			var cookie = cookies[i];
			var cookieNameValue = cookie.split(/\s*=\s*/);
			if (cookieNameValue[0] == cookieName) {
				return unescape(cookieNameValue[1]);
			}
		}
		return null;
	};
	
	Utils.COOKIES.set = function(cookieName, cookieValue, days) {
		if (days) {
			var expires = new Date();
			expires.setTime(expires.getTime() + days*24*60*60*1000);
		}
		document.cookie = cookieName + '=' + escape(cookieValue) + (days ? ';expires=' + expires.toUTCString() : '') + ';path=/';
	};
	
	Utils.COOKIES.del = function(cookieName) {
		var expires = new Date();
		expires.setTime(expires.getTime() - 1);
		document.cookie = cookieName + '=;expires=' + expires.toUTCString() + ';path=/';
	};

})();
