/**
 * This is a Javascript calendarToolKitKit plugin. The tool kits now including signle/dual datePiker and multipule date picker with simple notes.
 *
 * Author: Felix Zhao
 * Date: Oct 11, 2016
 */

/**
 * A Calendar Object with many basic variables and functions.
 * @type {[Calendar]}
 */
var Calendar = (function () {
	// Customable options for user to setup. For multi-lang and initialism purpose.
	this.options = {
		// month name list
		MONTHS: ["January", "February", "March", "April", "May", "Jun", "July", "Auguest", "September", "October", "November", "Decamber"],
		// Week day name list
		WEEKDAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sat"],
		// An array to store the picked/selected date of the first calendar by user
		pickedDate1: [],
		// An array to store the picked/selected date of the second calendar by user
		pickedDate2: [],
		// calendar window size with unit px/%
		width: "100%",
		// major tone of the color theme. The color theme will be auto-generated based on this color: color code/rgb/rgba
		colorTheme: "rgb(0, 255, 255)",
		// A custom data or information displayed in each single Date box. It must be valid html format:
		// eg: <div>...</div>
		// and users have to style it by theirselves
		customDateInfo: ""
	};

	// Week day name abbreviation list
	this.WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Friday", "Saturday"];

	// month name abbreviation list
	this.MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// An array to store the element of table 'td', which display every single date of the first calendar
	this.calendar1 = [];
	// An array to store the element of table 'td', which display every single date of the second calendar
	this.calendar2 = [];

	// currentDate's date
	this.currentDate = new Date();
	this.currentDate.setHours(0, 0, 0, 0);
	/**
	 * helper function to check if the given param is type of Date
	 * @method dateValidater
	 * @param  {[any object]}      d [description]
	 * @return true if given param is a valid Date object
	 * @return false if given param is not a valid Date object
	 */
	this.dateValidater = function (d) {
		return Object.prototype.toString.call(d) === '[object Date]';
	};

	/**
	 * helper function to create a standard date with given Date object, and set the time (hour, minus, second, millisecond) to be 0.
	 * @method stdDate
	 * @param  {[Date]} d [valid js Date obejct]
	 * @return {[Date]}   [valid js Date obejct with time (hour, minus, second, millisecond) setted to 0]
	 */
	this.stdDate = function (d) {
		if (this.dateValidater(d)) {
			d.setHours(0, 0, 0, 0);
			return d;
		} else {
			throw "InvalidDateType";
		}
	};
	/**
	 * Calculate the number of days in given date's month
	 * @method numOfdaysInMonth
	 * @param  {[Date]} d [valid js Date obejct]
	 * @return {[number]} [number of days in month]
	 */
	this.numOfdaysInMonth = function (d) {
		if (this.dateValidater(d)) {
			return this.stdDate(new Date(d.getFullYear(), d.getMonth() + 1, 0)).getDate();
		} else {
			throw "InvalidDateType";
		}
	};
	/**
	 * give the first day of the week of the month
	 * eg: Oct 1, 2016 is Saturday
	 * @method getFirstDay
	 * @param  {[Date]}    d [valid js Date obejct]
	 * @return {[number]}      [first date of the month]
	 */
	this.getFirstDay = function (d) {
		if (this.dateValidater(d)) {
			return this.stdDate(new Date(d.getFullYear(), d.getMonth(), 1)).getDay();
		} else {
			throw "InvalidDateType";
		}
	};
	/**
	 * give the last day of the week of the month
	 * eg: Oct 11, 2016 is Mornday
	 * @method getLastDay
	 * @param  {[Date]}    d [valid js Date obejct]
	 * @return {[number]}      [last date of the month]
	 */
	this.getLastDay = function (d) {
		if (this.dateValidater(d)) {
			return this.stdDate(new Date(d.getFullYear(), d.getMonth() + 1, 0)).getDay();
		} else {
			throw "InvalidDateType";
		}
	};

  /**
   * creaate table by given date
   * @method createTable
   * @param  {[date]}    d [valid js date obejct]
   */
  this.createTable = function(d){
    var firstDay = this.getFirstDay(d);
		var numOfDays = this.numOfdaysInMonth(d);
		for (var i = 0; i < this.calendar1.length; i++) {
			if ((i - firstDay + 2) > 0 && (i - firstDay + 2) <= numOfDays){
				$(this.calendar1[i]).html(i - firstDay + 2);
      }
		}
  };

  /**
   * Driver
   * @method init
   * @param  {[object]} opt [custom options]
   * @return {[type]}     [description]
   */
	this.init = function (opt) {
		/*jshint multistr:true */
		$("#calendarToolKit").append('<div id="calendarToolKitPrevBtn">\
    </div>\
    <div id="calendarToolKitNextBtn">\
    </div>\
    <table id="calendarToolKitTable">\
    </table>');
		// add tr and td to taable
		for (var i = 0; i < 6; i++) {
			var row = "";
			for (var j = 0; j < 7; j++) {
				row += ("<td caldata=''><div class='calendarToolKitdate'></div>" + this.options.customDateInfo + "</td>");
			}
			$("#calendarToolKitTable").append("<tr>" + row + "</tr>");
		}
		// iterate all td, and add them into calendar1 array in order
		var arr = [];
		$("#calendarToolKitTable td").each(function () {
			arr.push(this);
		});
		this.calendar1 = arr;

    this.createTable(this.currentDate);
	};


});




var calendarTool = (function () {
	var cal = new Calendar();
	cal.init();
})();
