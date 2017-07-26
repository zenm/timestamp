var dateMicroservice = {
  toNaturalDate : {

  },
  toUnixDate : {

  }
}


// code using npm unix-timestamp
var ut = require("unix-timestamp");
ut.round = true;
var fullDate = ut.toDate(150112720).toString().trim();
var readableDate = fullDate.slice(4, 15);
var unixDate = ut.fromDate("2017-07-25");
console.log(unixDate, readableDate);
