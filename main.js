const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    Menu,
    shell
} = require('electron')


// Menu
const template = require('./menu');
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const path = require('path')
const fs = require('fs')
const db = require('./database')
const moment = require('moment')
const {
    machineIdSync
} = require('node-machine-id')
const contextMenu = require('electron-context-menu');

contextMenu({
    showSaveImageAs: false,
    showSearchWithGoogle: false,
    showInspectElement: false,
    showSelectAll: false,
    showCopyImage: false
});

// Check if electron is in development mode to enable Node.js on release mode

var node; //
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !app.isPackaged;
if (!isDev) {
    // require server
    const server = require('../server');
    node = server.listen(3000, () => console.log(`listening on port ${3000} ...`));
}

async function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.maximize()
    win.show()

    let ID = machineIdSync({
        original: true
    })

    if(isDev) {
        win.loadFile('app/index.html')
    } else {
        try {
            const [status] = await db.execute(`SELECT * FROM settings WHERE setting_name = 'exchangeRate3'`);
            if (status[0]['value'] == 'bG9ja2Vk') {
                win.loadFile('error.html')
            } else if (status[0]['value'] == 'dW5sb2NrZWQ=') {
                const [result] = await db.execute(`SELECT * FROM settings WHERE setting_name = 'exchangeRate2'`);
                let date = Buffer.from(result[0]['value'], 'base64').toString('ascii');
                let now = moment().format('yyyy-MM-DD');
                if (date > now) {
                    if (ID == 'a56de6e9-f11b-42df-8275-1332017907b5') {
                        win.loadFile('app/index.html')
                    } else {
                        win.loadFile('error.html')
                    }
                } else {
                    await db.execute(`UPDATE settings SET value = 'bG9ja2Vk' WHERE setting_name = 'exchangeRate3'`)
                    win.loadFile('error.html')
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // require update module
    const updater = require('./update')
    updater(win, ipcMain);
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (!isDev) {
            node.close();
        }
        app.quit()
    }
})


ipcMain.handle('backupDB', () => {
    return dialog.showSaveDialog({
        defaultPath: 'database.sql',
        properties: ['dontAddToRecent']
    }).then(function (data) {
        if (data.canceled == false) {
            return mysqldump({
                connection: {
                    host: 'localhost',
                    user: 'root',
                    password: 'roottoor',
                    database: 'salameh'
                },
                dumpToFile: `${data.filePath}`
            }).then(function () {
                return 'success';
            }, function (error) {
                return (error);
            })
        } else {
            return 'canceled'
        }
    })
});

// read package info
ipcMain.handle('read-package', function () {
    let data = require('./package.json');
    return data;
})

ipcMain.handle('send-whatsapp', async function (event, data) {
    let nl = '%0A';
    let text = `Salameh Cell${nl}Please settle your debts${nl}Your current balance is:${nl} - Fresh USD: ${data.dollar_debt.toLocaleString()} $ ${nl} - Sayrafa: ${data.sayrafa_debt.toLocaleString()} $ ${nl} - LBP: ${data.lira_debt.toLocaleString()} L.L`
    await shell.openExternal(`https://api.whatsapp.com/send?phone=${data.customer_phone}&text=${text}`);
})
