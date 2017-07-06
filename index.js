// import things from electron
const {app, BrowserWindow} = require('electron');

// like jQuery dom ready
app.on('ready', () => {
    // create the main window (chromium)
    let mainWindow = new BrowserWindow({
        // hide the title bar
        titleBarStyle: 'hidden-inset',
        //frame: false
    });

    //mainWindow.setMenu(null);

    // load the index
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    // contains all the internal events of chromium
    mainWindow.webContents.on('will-navigate', (e, url) => {
        // avoid loading other pages / dropped files
        e.preventDefault();
        // instead do inter-process-comunication and say to the main window to load this file
        mainWindow.webContents.send('open-file', url);
        console.log(url);
    })
})