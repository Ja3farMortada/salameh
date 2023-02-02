const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const md5 = require('md5')


const db = require('./database');

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// make uploads folder a static one to be accessible by url requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// multer 
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, callback) {
        var destFolder = './uploads';
        if (!fs.existsSync(destFolder)){
            fs.mkdirSync(destFolder);
            console.log('Folder Created Successfully.');
        }
        callback(null, path.join(__dirname, './uploads'));
    },
    filename: function (req, file, callback) {
        // console.log(file);
        var datetimestamp = Date.now();
        callback(null, datetimestamp + '-' + file.originalname);
    }
});

const upload = multer({ //multer settings
    storage: storage
}).single('file')


const loginRoutes = require('./routes/login.routes');

const sellRoutes = require('./routes/sell.routes');
const stockRoutes = require('./routes/stock.routes');
const historyRoutes = require('./routes/history.routes');
const debtsRoutes = require('./routes/debts.routes');

const settingsRoutes = require('./routes/settings.routes');
const usersRoutes = require('./routes/users.routes');
const vouchersRoutes = require('./routes/vouchers.routes');
const customersRoutes = require('./routes/customers.routes');


loginRoutes(app, db);

sellRoutes(app, db);
stockRoutes(app, db, upload, fs, path);
historyRoutes(app, db);
debtsRoutes(app, db);

settingsRoutes(app, db, md5);
usersRoutes(app, db, md5);
vouchersRoutes(app, db, upload, fs, path);
customersRoutes(app, db);

const {
    machineIdSync
} = require('node-machine-id');
let ID = machineIdSync({
    original: true
});
fs.writeFile('id.txt', ID, () => {
    console.log('done');
})

module.exports = app;