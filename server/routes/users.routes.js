module.exports = (app, db, md5) => {


    app.get('/getUsers', (req, res) => {
        let query = "SELECT * FROM users WHERE type != 'admin'";
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                res.send(results);
            }
        });
    });

    app.post('/editUsername', (req, res) => {
        let data = req.body;
        let query = `UPDATE users SET username = ? WHERE UID = ${data.ID}`;
        db.query(query, data.newUsername, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let query = `SELECT * FROM users WHERE UID = ${data.ID}`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).end(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    app.post('/editPassword', (req, res) => {
        let ID = req.body.ID;
        let password = req.body.password;
        let hashPassword = md5(password);
        let query = `UPDATE users SET password = ? WHERE UID = ${ID}`;
        db.query(query, hashPassword, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let query = `SELECT * FROM users WHERE UID = ${ID}`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).end(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    app.post('/addUser', (req, res) => {
        let data = {
            username: req.body.username,
            password: md5(req.body.password),
            owner: req.body.owner
        }
        let query = `INSERT INTO users SET ?`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let query = `SELECT * FROM users WHERE UID = ${results.insertId}`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).end(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    app.post('/editUser', (req, res) => {
        let data = req.body;
        let query = `UPDATE users SET username = ?, owner = ? WHERE UID = ${data.ID}`;
        db.query(query, [data.username, data.owner], function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let query = `SELECT * FROM users WHERE type = 'user'`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).end(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    app.post('/deleteUser', (req, res) => {
        let query = `DELETE FROM users WHERE UID = ${req.body.ID}`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let query = `SELECT * FROM users WHERE type = 'user'`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).end(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    app.post('/updatePermissions', (req, res) => {
        let data = req.body;
        let query = `UPDATE users SET canAddService = ${data.canAddService}, canAddItem = ${data.canAddItem}, canViewCustomers = ${data.canViewCustomers}, canViewPayments = ${data.canViewPayments} WHERE UID = ${data.ID}`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let query = `SELECT * FROM users WHERE type = 'user'`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).end(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    app.post('/updateUserStatus', (req, res) => {
        let query = `UPDATE users SET user_status = !user_status WHERE UID = ${req.body.UID}`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let query = `SELECT * FROM users WHERE type = 'user'`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).end(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });
}