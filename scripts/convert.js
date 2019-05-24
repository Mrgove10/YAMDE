var showdown = require('showdown');
var converter = new showdown.Converter();


function convert(markdownString) {
    var html = converter.makeHtml(markdownString);
    document.getElementById('render').innerHTML = html
    console.log(html);
}