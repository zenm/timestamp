/* jshint esversion: 6 */

const ut = require("./../resources/node_modules/unix-timestamp/lib/timestamp.js");
// var stringResponse  = "february%20205,2321";

var exports = module.exports = {};

var delimitter = /%20|,|-/g;
var onlyNumbers = /^\d+$/;
var fourDigit = /\b\d{4}\b/;
var monthToDigit = {
  jan : '01',
  feb : '02',
  mar : '03',
  apr : '04',
  may : '05',
  jun : '06',
  jul : '07',
  aug : '08',
  sep : '09',
  oct : '10',
  nov : '11',
  dec : '12'
};

function testPath (string) {
  if ( delimitter.test(string) ) { // if any delimitter
    return "human";
  } else if ( onlyNumbers.test(string) ) { // if absence of not characters, OR only numbers
    return "unix";
  } else {
    return "invalid";
  }
}

function convertMonth (stringMonth) {
  var shortMonth = stringMonth.slice(0,3).toLowerCase();
  if (monthToDigit.hasOwnProperty(shortMonth)){
    return monthToDigit[shortMonth];
  }
  return stringMonth;
}

function convertDay (stringDay) {
  if (stringDay.length == 1) {
    return "0" + stringDay;
  } return stringDay;
}

function parseNaturalDate (string) {
  var month, day, year;
  var monthAsNum, dayAsNum;
  var monthDayYearArray = [];
  var monthDayYearString = "";
  var delimittedString = string.replace(delimitter, " ");
  delimittedString = delimittedString.trim();

  for (var j = 0; j < delimittedString.length; j++) {
    if (delimittedString[j] == " " &&
        delimittedString[j - 1] != " "){ // bc we want to skip over consecutive delimmitters
      monthDayYearArray.push(monthDayYearString);
      monthDayYearString = "";
    } else if (delimittedString[j] != " ") {
      monthDayYearString += delimittedString[j];
    }
  }
  monthDayYearArray.push(monthDayYearString);

  if (monthDayYearArray[0] && monthDayYearArray[1] && monthDayYearArray[2]){
    month = convertMonth(monthDayYearArray[0]);
    day = convertDay(monthDayYearArray[1]);
    year = monthDayYearArray[2];
  } else {
    return "invalid";
  }

  if (onlyNumbers.test(month) && onlyNumbers.test(day) && onlyNumbers.test(year)){
    if (month.length == 1){
      month = "0" + month;
    }
  } else {
    return "invalid";
  }

  monthAsNum = parseFloat(month);
  dayAsNum = parseFloat(day);

  if( monthAsNum >= 1 && monthAsNum <= 12 &&
    dayAsNum >= 1 && dayAsNum <= 31 &&
    fourDigit.test(year) ) {
      return `${year}-${month}-${day}`;
  } else {
    return "invalid";
  }
}
parseNaturalDate("---1,---1,,,,1123123----");



// old function
function parseNaturalDate (string) {
  var month;
  var day;
  var year;
  var monthAsNum;
  var dayAsNum;
  var str = string;
  var result = str.split(delimitter, 3);
  month = result[0];
  day = result[1];
  year = result[2];

  if(!onlyNumbers.test(month)) {
    month = convertMonth(month);
  }

  monthAsNum = parseFloat(month);
  dayAsNum = parseFloat(day);
  if (month === false){
    return 'invalid';
  } else if( monthAsNum <= 12 &&
      dayAsNum <= 31   &&
      fourDigit.test(year) ) {
        return `${year}-${month}-${day}`;
  } return "invalid";
}

exports.getDate = function(stringURL) {
  var testPathResult = testPath(stringURL);
  var naturalDate = parseNaturalDate(stringURL);
  var dates = [];
  var humanDate, unixDate;

  if ( testPathResult == "human" && naturalDate != "invalid" ) {

   unixDate = ut.fromDate(naturalDate); //10 digit unix date
   humanDate = naturalDate; //ISO 8601 date string

  } else if ( testPathResult == "unix") {

   unixDate = parseFloat(stringURL);
   humanDate = JSON.stringify(ut.toDate(unixDate)).slice(1,11);

 } else {

   unixDate = null;
   humanDate = null;

 }
  dates.push(unixDate);
  dates.push(humanDate);
  return dates;
};
