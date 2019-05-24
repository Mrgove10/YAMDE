//https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework
const {
    dialog
} = require('electron').remote;
var fs = require('fs');

function saveFile(content) {
    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
    dialog.showSaveDialog((fileName) => {
        if (fileName === undefined) {
            console.log("You didn't save the file");
            return;
        }

        // fileName is a string that contains the path and filename created in the save file dialog.  
        fs.writeFile(fileName, content, (err) => {
            if (err) {
                alert("An error ocurred creating the file " + err.message)
            }

            alert("The file has been succesfully saved");
        });
    });
}

function openFile() {
    dialog.showOpenDialog((fileNames) => {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined) {
            console.log("No file selected");
            return;
        }

        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                alert("An error ocurred reading the file :" + err.message);
                return;
            }

            // Change how to handle the file content
            console.log("The file content is : " + data);
        });
    });
}
module.exports.saveFile = saveFile;
module.exports.openFile = openFile;