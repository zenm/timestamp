var ut = require("unix-timestamp");
var stringResponse  = "february%2020,1982";
var delimitter = /%20+|,+|-+/;
var onlyNumbers = /\d+/;
var fourDigit = /\b\d{4}\b/;

function testPath(string) {
  if ( delimitter.test(string) ) {
    return "human";
  } else if ( onlyNumbers.test(string) ) {
    return "unix";
  } else {
    return null;
  }
}


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

function convertMonth(stringMonth) {
  var shortMonth = stringMonth.slice(0,3).toLowerCase();
  if (monthToDigit.hasOwnProperty(shortMonth)){
    return monthToDigit[shortMonth];
  }
  return false;
}

/*
--------testing  convertMonth
convertMonth("12123"); // false
convertMonth("Jan"); // 1
convertMonth("February"); //2
 */




/*
testPath("01%2001-1999");
testPath("01-01-1999");
testPath("01 01 1999");
testPath("Jan 1,1999");
 */

function parseNaturalDate(string) {
  if (testPathResult == "human"){
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
    };

    monthAsNum = parseFloat(month);
    dayAsNum = parseFloat(day);

    if (month === false){
      return null;
    } else if( monthAsNum <= 12 &&
        dayAsNum <= 31   &&
        fourDigit.test(year) ) {
          return `${year}-${month}-${day}`;
    } return null;
  }
}

/*
parseNaturalDate("jan%201%201999");
parseNaturalDate("jan-1-1999");
parseNaturalDate("jan,1,1999");
parseNaturalDate("february-20-1982");
parseNaturalDate("1%20100%201999"); // null
parseNaturalDate("reb"); //null
parseNaturalDate("february,20,1982");
*/



function Date (req) {

  this.toNaturalDate = function() {

    return "naturalDate";
  };

  this.toUnixDate = function() {

    return "unixDate";
  };
}
var testPathResult  = testPath(stringResponse);
console.log(testPathResult);
function doThese(string) {
  testPath(string);
  console.log(parseNaturalDate(string));
  console.log(ut.fromDate(parseNaturalDate(string)));
}
doThese(stringResponse);
// var unixDate = ut.fromDate();
// console.log(unixDate);
// code using npm unix-timestamp
/*
ut.round = true;
var fullDate = ut.toDate(150112720).toString().trim();
var readableDate = fullDate.slice(4, 15);
var unixDate = ut.fromDate("2017-07-25");
console.log(unixDate, readableDate);
*/
