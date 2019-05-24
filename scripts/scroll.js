var showdown = require('showdown');
var converter = new showdown.Converter();


function scrool(percent) {
    var st = $(this).scrollTop();
    var wh = $(document).height();
 
 // st : wh = X : 100
 // x = (st*100)/wh
 
 var perc = (st*100)/wh
 
 // Your percentage is contained in perc variable
 
 console.log('The percentage is '+perc);
}