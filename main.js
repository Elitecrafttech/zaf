const path = require('path');
const { app, BrowserWindow } = require('electron');

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true, 
        //     preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/Homedir/index.html'));
}

app.whenReady().then(()=>{
    createMainWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});