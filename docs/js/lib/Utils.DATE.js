"use strict";

if (!Utils) { var Utils = {}; }

(function() {
	
	if (!Utils.DATE) { Utils.DATE = {}; }

	Utils.DATE.daysInMonth = function(month, year) {
		return new Date(year, month, 0).getDate();
	};

	Utils.DATE.month = function(date) {
		return date.getMonth() + 1;
	};

	Utils.DATE.years = function(date1, date2) {
		var month1 = Utils.DATE.month(date1);
		var month2 = Utils.DATE.month(date2);
		var diff;
		if (month1 < month2) {
			diff = 1;
		} else {
			diff = 0;
		}
		return date1.getFullYear() - date2.getFullYear() - diff;
	};

	Utils.DATE.months = function(date1, date2) {
		var month1 = Utils.DATE.month(date1);
		var month2 = Utils.DATE.month(date2);
		var day1 = date1.getDate();
		var day2 = date2.getDate();
		var diff;
		if (day1 < day2) {
			diff = 1;
		} else {
			diff = 0;
		}
		if (month1 >= month2) {
			return month1 - month2 - diff;
		} else {
			return 12 - month2 + month1 - diff;
		}
	};

	Utils.DATE.days = function(date1, date2) {
		var day1 = date1.getDate();
		var day2 = date2.getDate();
		if (day1 >= day2) {
			return day1 - day2;
		} else {
			var daysInMonth = Utils.DATE.daysInMonth(Utils.DATE.month(date2), date2.getFullYear());
			return daysInMonth - day2 + day1;
		} 
	};

	Utils.DATE.hours = function(date1, hour2) {
		var hour1 = date1.getHours();
		if (hour1 >= hour2) {
			return hour1 - hour2;
		} else {
			return 24 - hour2 + hour1;
		}
	};

	Utils.DATE.minutes = function(date1, minute2) {
		var minute1 = date1.getMinutes();
		if (minute1 >= minute2) {
			return minute1 - minute2;
		} else {
			return 60 - minute2 + minute1;
		}
	};

})();