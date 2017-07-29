/* jshint esversion: 6 */

const ut = require("./../resources/node_modules/unix-timestamp/lib/timestamp.js");
// var stringResponse  = "february%20205,2321";

var exports = module.exports = {};

var delimitter = /%20+|,+|-+/;
var onlyNumbers = /\d+/;
var fourDigit = /\b\d{4}\b/;
var monthToDigit = {
  jan : '1',
  feb : '2',
  mar : '3',
  apr : '4',
  may : '5',
  jun : '6',
  jul : '7',
  aug : '8',
  sep : '9',
  oct : '10',
  nov : '11',
  dec : '12'
};

function testPath (string) {
  if ( delimitter.test(string) ) {
    return "human";
  } else if ( onlyNumbers.test(string) ) {
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
  return false;
}

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
