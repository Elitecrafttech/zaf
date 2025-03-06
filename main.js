const path = require('path');
const { app, BrowserWindow } = require('electron');

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        //     preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/Homedir/index.html'));
}

app.whenReady().then(()=>{
    createMainWindow();
})