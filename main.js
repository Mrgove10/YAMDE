const {
  app,
  BrowserWindow,
  Menu,
  MenuItem
} = require('electron');
require('electron-reload')(__dirname);
const filemanager= require('./scripts/fileManagement.js');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 728,
    // this is important since currently there is no support for scrollable menus
    minWidth: 600, // set a min width!
    minHeight: 300, // and a min height!
    // Remove the window frame from windows applications
    //frame: false,
    // Hide the titlebar from MacOS applications while keeping the stop lights
    // titleBarStyle: 'hidden', // or 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  //win.loadFile('index.html')
  win.loadURL(`file://${__dirname}/pages/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  //TODO: change this
  const customMenu = new Menu()
  customMenu.append(new MenuItem({
    label: 'save',
    accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
    click: () => {
      filemanager.saveFile();
      console.log('time to save')
    }
  }))
  Menu.setApplicationMenu(customMenu); //change this for your custome menu
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.