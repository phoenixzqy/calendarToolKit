/**
 * This is a Javascript calendarToolKit plugin. The tool kits now including signle/dual datePiker and multipule date picker with simple notes.
 *
 * Author: Felix Zhao
 * Date: Oct 11, 2016
 */

// jsHint options list
/* jshint shadow:true */
/*jshint multistr:true */
/*jshint loopfunc: true */

/**
 * A Calendar Object with many basic variables and functions.
 * @type {[Calendar]}
 */
var Calendar = (function () {
	// Customable options for user to setup. For multi-lang and initialism purpose.
	options = {
		// month name list
		MONTHS: ["January", "February", "March", "April", "May", "Jun", "July", "Auguest", "September", "October", "November", "Decamber"],
		// Week day name list
		WEEKDAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sat"],

		// calendar window size with unit px/%
		width: "100%",
		// major tone of the color theme. The color theme will be auto-generated based on this color: color code/rgb/rgba
		colorTheme: "rgb(100, 155, 255)",
		// A custom data or information displayed in each single Date box. It must be valid html format:
		// eg: <div>...</div>
		// and users have to style it by theirselves
		customDateInfo: "",
		// custom previous and next button icon. It could be text, fontawesome and even img
		prevBtn: "<",
		nextBtn: ">"
	};

	// Week day name abbreviation list
	WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Friday", "Saturday"];

	// month name abbreviation list
	MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// An array to store the element of table 'td', which display every single date of the first calendar
	calendar1 = [];
	// An array to store the element of table 'td', which display every single date of the second calendar
	calendar2 = [];

	// currentDate's date
	currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	/**
	 * helper function to check if the given param is type of Date
	 * @method dateValidater
	 * @param  {[any object]}      d [description]
	 * @return true if given param is a valid Date object
	 * @return false if given param is not a valid Date object
	 */
	dateValidater = function (d) {
		return Object.prototype.toString.call(d) === '[object Date]';
	};

	/**
	 * helper function to create a standard date with given Date object, and set the time (hour, minus, second, millisecond) to be 0.
	 * @method stdDate
	 * @param  {[Date]} d [valid js Date obejct]
	 * @return {[Date]}   [valid js Date obejct with time (hour, minus, second, millisecond) setted to 0]
	 */
	stdDate = function (d) {
		if (dateValidater(d)) {
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
	numOfdaysInMonth = function (d) {
		if (dateValidater(d)) {
			return stdDate(new Date(d.getFullYear(), d.getMonth() + 1, 0)).getDate();
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
	getFirstDay = function (d) {
		if (dateValidater(d)) {
			return stdDate(new Date(d.getFullYear(), d.getMonth(), 1)).getDay();
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
	getLastDay = function (d) {
		if (dateValidater(d)) {
			return stdDate(new Date(d.getFullYear(), d.getMonth() + 1, 0)).getDay();
		} else {
			throw "InvalidDateType";
		}
	};
	/**
	 * [calDataParser description]
	 * @method calDataParser
	 * @param  {[number/string]}      y [year or data of array in string type]
	 * @param  {[number]}      m [month]
	 * @param  {[number]}      r [month]
	 * @return {[array]}        [array of y m d]
	 */
	calDataParser = function(y,m,d){
		if(typeof m !== 'undefined' && typeof d !== 'undefined')
			return [y, m, d];
		else{
			return y.split(",");
		}
	};
	/**
	 * creaate table by given date, append tr and td under table
	 * @method createTable
	 * @param  {[date]}    d [valid js date obejct]
	 */
	createTable = function (d) {
		var firstDay = getFirstDay(d);
		var numOfDays = numOfdaysInMonth(d);
		var prevMonthDay = new Date(d.getFullYear(), d.getMonth()-1);
		var numOfDaysPrev = numOfdaysInMonth(prevMonthDay);
		var nextMonthDay = new Date(d.getFullYear(), d.getMonth()+1);
		var date;

		var today = new Date();
		today.setHours(0,0,0,0);

		for (var i = 0; i < calendar1.length; i++) {
			if ((i - firstDay + 1) > 0 && (i - firstDay + 1) <= numOfDays) {
				date = i - firstDay + 1;
				$(calendar1[i]).find(".CTKdate").html(date).attr('caldata', calDataParser(d.getFullYear(), d.getMonth(), date));
				date = new Date(d.getFullYear(), d.getMonth(), date);
				date.setHours(0,0,0,0);
				if(date < today){
					$(calendar1[i]).find(".CTKdate").addClass("CTKnotInThisMonth");
				}else{
					$(calendar1[i]).find(".CTKdate").removeClass("CTKnotInThisMonth");
				}
			}else if((i - firstDay + 1) <= 0){
				date = numOfDaysPrev + i - firstDay + 1;
				$(calendar1[i]).find(".CTKdate").html(date).addClass("CTKnotInThisMonth").attr('caldata', calDataParser(prevMonthDay.getFullYear(), prevMonthDay.getMonth(), date));

			}else{
				date = i - firstDay - numOfDays + 1;
				$(calendar1[i]).find(".CTKdate").html(date).addClass("CTKnotInThisMonth").attr('caldata', calDataParser(nextMonthDay.getFullYear(), nextMonthDay.getMonth(), date));
			}
		}
		$("#CTKMonthTitle").html(options.MONTHS[currentDate.getMonth()] + " " + currentDate.getFullYear());
	};
	/**
	 * helper function to go previous month
	 * @method prevMonth
	 */
	var prevMonth = function(){
		console.log(typeof this);
		currentDate = stdDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1));
		createTable(currentDate);
	};
	/**
	 * helper function to go next month
	 * @method prevMonth
	 */
	var nextMonth = function(){
		currentDate = stdDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1));
		createTable(currentDate);
	};

	/**
	 * Driver
	 * @method init
	 * @param  {[object]} opt [custom options]
	 * @return {[type]}     [description]
	 */
	return {
		init : function (opt) {
			// cusom options
			if (opt && typeof opt === "object") {
				var keys = Object.keys(opt);
				for (var k in keys) {
					if (keys[k] in options) {
						options[keys[k]] = opt[keys[k]];
					}
				}
			}
			// create app frame space

			$("#calendarToolKit").append('<div id="CTKPrevBtn" class="CTKprevBtn">\
	    </div>\
	    <div id="CTKNextBtn" class="CTKnextBtn">\
	    </div>\
	    <table id="CTKTable" class="CTKfullwidth CTKtable" >\
			<h2 id="CTKMonthTitle" class="CTKfullwidth" style="margin: 10px 0;"></h2>\
			<ul id="CTKWeekList" class="CTKfullwidth CTKdayList"></ul>\
	    </table>\
			<div id="CTKCustomPenel" class="CTKfullwidth CTKCustomPenel">\
			</div>').css("width", options.width);
			var height = $("#calendarToolKit").outerWidth() * 10 / 16;
			$("#calendarToolKit").css("height",height);
			$("#calendarToolKit").css("position","relative");



			// WEEKDAYS list
	    for(var i in WEEKDAYS_SHORT) {
				$("#CTKWeekList").append("<li>" + WEEKDAYS_SHORT[i] + "</li>");
			}
			// add button icon to prev and next buttons.
			$("#CTKPrevBtn").append(options.prevBtn);
			$("#CTKNextBtn").append(options.nextBtn);
			$("#CTKPrevBtn").unbind('click').bind('click', function(){
				prevMonth();
			});
			$("#CTKNextBtn").unbind('click').bind('click', function(){
				nextMonth();
			});
			// add tr and td to taable
			for (var i = 0; i < 6; i++) {
				var row = "";
				for (var j = 0; j < 7; j++) {
					row += ("<td ><div class='CTKdate'></div>" + options.customDateInfo + "</td>");
				}
				$("#CTKTable").append("<tr>" + row + "</tr>");
			}
			// iterate all td, and add them into calendar1 array in order
			var arr = [];
			$("#CTKTable td").each(function () {
				arr.push(this);
			});
			calendar1 = arr;
			// append table into frame
			createTable(currentDate);
		},
		getTableArr : function(){
			return calendar1;
		},
		dateParser: function(y, m, d){
			return calDataParser(y, m, d);
		}
	};
});



/**
 * A calendarTool that allow user to select multiple dates from calendar, and add price data to specific date.
 * @type {[canlendarTool]}
 */
var calendarTool = (function () {
	// extend Calendar object
	var cal = new Calendar();
	// custom options and Calendar options override
	var options = {
		lang: {
			price: "Price",
			available: "Available:",
			multiSelect: "Multi-Select:",
			submit: "Submit"
		},
		customDateInfo : "<div class='CTKDatePrice'></div>",
		// Customable submit callback function
		submitFct : function(){

		}
	};
	// An array to store the available date of the calendar by user
	// data structure:
	// { date, price}
	var availableDate = [];
	// An array to store the picked/selected date and price data of the calendar by user
	var selectedDate = [];
	// td elements of table
	var table = [];

	/**
	 * helper function to check if current td element is in availableDate Array
	 * @method isAvailable
	 * @param  {[html object]}    e [td element]
	 * @return {Boolean}     [true if it is in]
	 */
	var isAvailable = function(e){
		if(typeof e === 'object'){
			for(var i in availableDate){
				var date = $(e).find(".CTKdate").attr('caldata');
				if( date === availableDate[i].date)
					return true;
			}
			return false;
		}else{
			throw "wrongTpyeError";
		}
	};
	/**
	 * helper function to check if current td element is in selectedDate array
	 * @method isSelected
	 * @param  {[html object]}   e [td element]
	 * @return {Boolean}    [true if it is in]
	 */
	var isSelected = function(e){
		if(typeof e === 'object'){
			for(var i in selectedDate){
				if(e === selectedDate[i])
					return true;
			}
			return false;
		}else{
			throw "wrongTpyeError";
		}
	};
	/**
	 * deal with the date click event
	 * @method dateOnClick
	 * @param  {[html object]}    e [td element]
	 */
	var dateOnClick = function (e) {
		// mute dates before today
		var today = new Date();
		today.setHours(0,0,0,0);
		var dateArr = cal.dateParser($(e).find(".CTKdate").attr('caldata'));
		var d = new Date(dateArr[0], dateArr[1],dateArr[2]);
		d.setHours(0,0,0,0);
		if(d < today)
			return;

		// if selected
		if(isSelected(e)){
			$(e).removeClass("CTKselected");
			var index = selectedDate.indexOf(e);
			if (index > -1)
				selectedDate.splice(index, 1);
		}else if($("#CTKisAvalabe").is(":checked")){//else
			$(e).addClass("CTKselected");
			selectedDate.push(e);
		}
		// if available is checked
		if($("#CTKisAvalabe").is(":checked")){
			if(!isAvailable(e)){
				var d = $(e).find(".CTKdate").attr('caldata');
				var data = {
					date : d,
					price : ''
				};
				$(e).addClass("CTKavailableDate");
				availableDate.push(data);
			}
		}else{//else
			if(isAvailable(e)){
				var index = -1;
				for(var i in availableDate){
					var date = $(e).find(".CTKdate").attr('caldata');
					if( date === availableDate[i].date){
						index = i;
						break;
					}
				}
				if (index > -1){
					$(e).removeClass("CTKavailableDate CTKalert");
					availableDate.splice(index, 1);
					$(e).find(".CTKDatePrice").html("");
				}
			}
		}
	};

	/**
	 * helper function to refresh table color based on the date availability
	 * @method setTableColor
	 */
	var setTableColor = function(){
		for(var i in table){
			if(isAvailable(table[i])){
				$(table[i]).addClass("CTKavailableDate");
			}else{
				$(table[i]).removeClass("CTKavailableDate");
			}
		}
	};
	/**
	 * helper function to reset selectedDate state. remove all selected date
	 * @method resetSelection
	 */
	var resetSelection = function(){
		selectedDate = [];
		for(var i in table){
			$(table[i]).removeClass("CTKselected");
		}
	};

	/**
	 * private Driver
	 * @method main
	 * @param  {[type]} opt [description]
	 * @return {[type]}     [description]
	 */
	var main = function (opt){
		// cusom options
		if (opt && typeof opt === "object") {
			var keys = Object.keys(opt);
			for (var k in keys) {
				if (keys[k] in options) {
					options[keys[k]] = opt[keys[k]];
				}
			}
		}
		// Calendar initialism
		cal.init(options);
		// append custom area under Calendar table
		$("#CTKCustomPenel").append('\
		<div id="CTKAvailableBtn"><div>\
			<div id="CTKAvailableBtn" class="CTKcol-4">\
				<p class="CTKcol-6">' + options.lang.available + '</p>\
				<label class="CTKswitch CTKcol-6">\
				  <input id = "CTKisAvalabe" type="checkbox" checked>\
				  <div class="CTKslider"></div>\
				</label>\
			</div>\
		<div id="CTKMultiSelectBtn" class="CTKcol-4">\
			<p class="CTKcol-6">' + options.lang.multiSelect + '</p>\
			<label class="CTKswitch CTKcol-6">\
			  <input type="checkbox" checked>\
			  <div class="CTKslider"></div>\
			</label>\
		</div>\
		<div class="CTKcol-4"><input id="CTKDatePriceIn" class="CTKcol-6" type="text" maxlength="7" placeholder="' + options.lang.price + '"/>\
		<div id="CTKSubmit" class="CTKcol-6"><button>' + options.lang.submit + '</button></div></div>\
		');

		// bind click event for every td element
		table = cal.getTableArr();
		for(var i in table){
			$(table[i]).unbind('click').bind('click', function(){
				dateOnClick(this);
			});
		}

		// add click event for prev and next button to reset table color and selection state
		$("#CTKPrevBtn").bind('click', function(){
			setTableColor();
			resetSelection();
		});
		$("#CTKNextBtn").bind('click', function(){
			setTableColor();
			resetSelection();
		});

		// add onchange event for price input box
		$("#CTKDatePriceIn").keyup(function(){
			var price = $(this).val();
			if(!isNaN(price)){
				for(var i in selectedDate){
					var date = $(selectedDate[i]).find(".CTKdate").attr("caldata");
					$(selectedDate[i]).find(".CTKDatePrice").html(price);
					for(var j in availableDate){
						if(availableDate[j].date === date){
							availableDate[j].price = price;
						}
					}
				}
			}
		});

		// add click event for submit
		$("#CTKSubmit").unbind("click").bind("click", function(){
			// var emptyPriceArr = [];
			// for(var i in availableDate){
			// 	if(!availableDate[i].price){
			// 		emptyPriceArr.push(availableDate[i].date);
			// 	}
			// }
			// for(var i in table){
			// 	var date = $(table[i]).find(".CTKdate").attr("caldata");
			// 	if(emptyPriceArr.indexOf(date) > -1){
			// 		$(table[i]).addClass("CTKalert");
			// 	}else{
			// 		$(table[i]).removeClass("CTKalert");
			// 	}
			// }
			// if(emptyPriceArr.length <= 0){
				options.submitFct();
			// }
		});
	};

	return{

		/**
		 * Driver
		 * @method init
		 * @param  {[opt]} opt [json like object]
		 */
		init : function (opt) {
			main(opt);
		},
		getAvailableDate: function(){
			return availableDate;
		}
	};
})();
