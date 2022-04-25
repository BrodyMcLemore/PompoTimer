// Basic Node API's
const electron = require("electron");
const url = require("url");
const path = require('path');
// Pulling app and BrowserWindow from electron
const  {app, BrowserWindow, Menu} = electron;

// Making window variables
let index;


// Listening for app to be ready
app.on('ready', function(){
  // When the app is ready run the fucntion to create the index
  index = new BrowserWindow({
    width : 400,
    height: 320,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: ("Style\icon.ico"),
  });
  // Loading html code into the index
  index.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }));
  // Close all windows then closeing index
  index.on("closed", function(){
    app.quit();
  });

  // Building menu from Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Inserting the menu into the index
  Menu.setApplicationMenu(mainMenu)
});


// Creating a menu template for the index
const mainMenuTemplate = [
  {
    // This top Label is the label that appears on the window
    label: "File",
    submenu: [
      {
        label: "Quit",
        // This reads what OS the user is on and gives and if else statement to show the proper command usage
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        // This click() reads when a button is clicked
        click(){
          app.quit();
        }
      },
      {
        label: "Reload",
        accelerator: process.platform == "darwin" ? "Command+R" : "Ctrl+R",
        click(){
          app.relaunch();
          app.exit();
        }
      }
    ]
  }
];

// Stupid Mac Fix
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({});
}


// Adding dev tools header for me
/*
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu:[
      {
        label: "Toggle Dev Tools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
      role: "Reload"
      }
    ]
  });
}
*/
