const path = require('path');
const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js');
const amdRequire = amdLoader.require;
const amdDefine = amdLoader.require.define;

function uriFromPath(_path) {
	var pathName = path.resolve(_path).replace(/\\/g, '/');
	if (pathName.length > 0 && pathName.charAt(0) !== '/') {
		pathName = '/' + pathName;
	}
	return encodeURI('file://' + pathName);
}
amdRequire.config({
	baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
});
// workaround monaco-css not understanding the environment
self.module = undefined;
amdRequire(['vs/editor/editor.main'], function () {
	var editor = monaco.editor.create(document.getElementById('container'), {
		//https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
		/*value: [
			'function x() {',
			'\tconsole.log("Hello world!");',
			'}'
		].join('\n'),*/
		language: 'markdown',
		automaticLayout:true,
		lineNumbers: "on",
		roundedSelection: true,
		scrollBeyondLastLine: false,
		readOnly: false,
		theme: "vs-dark",
		wordWrap: "bounded"	,
		wrappingIndent: "same",
		formatOnPaste :true,
	});
	var myBinding = editor.addCommand(monaco.KeyCode.any, function() {
		console.log('hey');
	});
	//this is executed when a ctrl+s
	editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
    	console.log('SAVE pressed!');
	});
	//This is executed everytime teh content of teh editor changes
	editor.onDidChangeModelContent(() => {
		var rawtxt = editor.getValue();
		console.log(rawtxt); 
		convert(rawtxt);
		console.log("Total lines = " +editor.getModel().getLineCount());
	 });
});	