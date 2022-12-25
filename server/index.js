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
const servicesRoutes = require('./routes/services.routes');
const usersRoutes = require('./routes/users.routes');


loginRoutes(app, db);
servicesRoutes(app, db, upload, fs, path);
usersRoutes(app, db, md5)

module.exports = app;