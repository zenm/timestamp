var ut = require("unix-timestamp");

var monthToDigit = {
  jan : 1,
  feb : 2,
  mar : 3,
  apr : 4,
  may : 5,
  jun : 6,
  jul : 7,
  aug : 8,
  sep : 9,
  oct : 10,
  nov : 11,
  dec : 12
};

function convertMonth(stringMonth) {
  var shortMonth = stringMonth.slice(0,3).toLowerCase();
  if (monthToDigit.hasOwnProperty(shortMonth)){
    return monthToDigit[shortMonth];
  }
  return false;
}

convertMonth("12123"); // false
convertMonth("Jan"); // 1
convertMonth("February"); //2


function Date (req) {

  this.toNaturalDate = function() {

    return "naturalDate";
  };

  this.toUnixDate = function() {

    return "unixDate";
  };
}


// code using npm unix-timestamp

ut.round = true;
var fullDate = ut.toDate(150112720).toString().trim();
var readableDate = fullDate.slice(4, 15);
var unixDate = ut.fromDate("2017-07-25");
console.log(unixDate, readableDate);
