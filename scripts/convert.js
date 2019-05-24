var md = require('markdown-it')();

function convert(markdownString) {
    var result = md.render(markdownString);
    document.getElementById('render').innerHTML = result;
}