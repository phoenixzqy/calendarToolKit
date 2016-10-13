Calendar Tool Kit (jQuery)
===


This is a simple Calendar Tool Kit based on jQuery. With this tool, you can generate most of the calendar tools for your website. And even you can customize your own calendar based tools.

Version 1.1.1
---
For now, the tool kit only include **2 date pickers**. Please go to the demo page and try it out.

### [Demo](https://phoenixzqy.github.io/demo/)

Note: The repo only has one Date Picker module. The other one is under revising.

*Date Picker 1*
===

Getting Start
---
1. add jQuery to your website
2. download the Calendar Tool Kit plugin and add it to your website
3. add below code to anywhere you wanna put the calendar

  ```html
  <div id="calendarToolKit"></div>
  ```
4. initialize the plugin with jQuery
  ```Javascript
  $(document).ready(function(){
    calendarTool.init();
  });
  ```
5. You are done.

Public Functions
---
You can call `calendarTool.functionName();` to use the given public functions:

### Function List
```Javascript
/**
 * The driver of the plugin. You must call this function before you call any others.
 * @param option: a custom options JSON like object
 */
calendarTool.init(option);
/** @return An array list of available dates and the corresponding price*/
calendarTool.getAvailableDate();
```

Custom Options
---
You can even customize the calendar UI and Language by passing an option to initializer:

```Javascript
$(document).ready(function(){
  var opt = {
    // some option here
  }
  calendarTool.init(opt);
});
```
### available options:

```Javascript
options = {
  // month name list: it can be any Language you want. The array size Must be 7
  MONTHS: ["一月", "二月", "三月", "April", "May", "Jun", "July", "Auguest", "September", "October", "November", "Decamber"],

  // Week day name list: it can be any Language you want. The array size Must be 7
  WEEKDAYS: ["周日", "周一", "Tuesday", "Wednesday", "Thursday", "Friday", "Sat"],

  // calendar window size with unit px/%
  width: "100%",

  // major tone of the color theme. The color theme will be auto-generated based on this color: color code/rgb/rgba
  colorTheme: "rgb(100, 155, 255)",

  // A custom data or information displayed in each single Date box. It must be valid html format:
  // eg: <div>...</div>
  // and users have to style it by theirselves
  customDateInfo: "<div id='notes'>...</div>",

  // custom previous and next button icon. It could be text, fontawesome and even img
  prevBtn: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  nextBtn: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
  //
  lang: {
			price: "价格",
			available: "可预定:",
			multiSelect: "多选：",
			submit: "提交"
		},

	// Customable submit callback function. You can make your own submit function. This function will be called after the submit button is clicked
	submitFct : function(){}
};

```


*Basic Calendar Object*
===

If you want a highly customizable Calendar. You can just use `Calendar` Object. The object can draw a basic calendar to your website with previous-month and next-month buttons. It doesn't has any functionalities. You have to add your functions based on your design.

How to use:
---
You can use it by creating a new Calendar object in your Javascript code:

```Javascript
// extend Calendar object
var cal = new Calendar();
// call driver to initialize the calendar
cal.init(options);
```
Public Functions
---
You can call `cal.functionName();` to use the given public functions:

### Function List
```Javascript
/**
 * The driver of the plugin. You must call this function before you call any others.
 * @param option: a custom options JSON like object
 */
cal.init(option);
/**
 * @return An array list of html table > td elements which are used to contain calendar dates and other custom data.
 * Type: Array[objects, ...]
*/
cal.getTableArr();
/**
  * the date parser function. every date element has an attribute 'caldata', and  the data is stored in string type.
  * If you give 3 params of number, this function convert it into a string version.
  * If only one string param is given, this function help you to convert it into array of numbers from string.
  * @method dataParser
  * @param  {[number/string]}      y [year or data of array in string type]
  * @param  {[number]}      m [month]
  * @param  {[number]}      r [month]
  * @return {[array]}        [array of y m d]
  *
*/
cal.dateParser(y, m, d)
```

Custom Options
---
You can even customize the calendar UI and Language by passing an option to initializer:

```Javascript
$(document).ready(function(){
  var opt = {
    // some option here
  }
  calendarTool.init(opt);
});
```
### available options:

```Javascript
options = {
  // month name list: it can be any Language you want. The array size Must be 7
  MONTHS: ["一月", "二月", "三月", "April", "May", "Jun", "July", "Auguest", "September", "October", "November", "Decamber"],

  // Week day name list: it can be any Language you want. The array size Must be 7
  WEEKDAYS: ["周日", "周一", "Tuesday", "Wednesday", "Thursday", "Friday", "Sat"],

  // calendar window size with unit px/%
  width: "100%",

  // major tone of the color theme. The color theme will be auto-generated based on this color: color code/rgb/rgba
  colorTheme: "rgb(100, 155, 255)",

  // A custom data or information displayed in each single Date box. It must be valid html format:
  // eg: <div>...</div>
  // and users have to style it by theirselves
  customDateInfo: "<div id='notes'>...</div>",

  // custom previous and next button icon. It could be text, fontawesome and even img
  prevBtn: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
  nextBtn: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
};

```

Date Click Function Example
---
In your program, you can create a `clickFct()` and add it to all `table > td` element as `click event`:

```Javascript
// you onClick function
var dateOnClick = function (e){
  // do anything here
}

// get table td element array from Calendar object
var table = cal.getTableArr();
// bind click event for every td element
for(var i in table){
  $(table[i]).unbind('click').bind('click', function(){
    dateOnClick(this);
  });
}
```

New you can test you onClick event by click on the dates.


Enjoy
---
Author: Felix Zhao

Date: Oct 12th, 2016
