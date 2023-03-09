module.exports = (app, db, md5) => {


    app.get('/getUsers', async (req, res) => {
        try {
            let [results] = await db.query(`SELECT * FROM users WHERE type != 'admin' AND user_status = 1 `);
            res.send(results)
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/editUsername', async (req, res) => {
        let data = req.body;
        try {
            await db.query(`UPDATE users SET username = ? WHERE user_ID = ? `, [data.newUsername, data.ID]);
            let [[result]] = await db.query(`SELECT * FROM users WHERE user_ID = ?`, data.ID);
            res.send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/editPassword', async (req, res) => {
        let ID = req.body.ID;
        let oldPassword = req.body.oldPassword;
        let password = req.body.password;
        let hashPassword = md5(password);

        try {
            let [[{result}]] = await db.query(`SELECT password AS result FROM users WHERE user_ID = ?`, ID);
            if (result != md5(oldPassword)) {
                throw (`Incorrect Password, Please check your entries!`)
            }
            await db.query(`UPDATE users SET password = ? WHERE user_ID = ?`, [hashPassword, ID]);
            let [[results]] = await db.query(`SELECT * FROM users WHERE user_ID = ?`, ID);
            res.send(results);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.post('/addUser', async (req, res) => {
        let data = req.body;
        delete data.confirmPassword;
        data.password = md5(data.password);
        let query = `INSERT INTO users SET ?`;

        try {
            let [result] = await db.query(query, data);
            let [[results]] = await db.query(`SELECT * FROM users WHERE user_ID = ?`, result.insertId);
            res.send(results)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    app.post('/editUser', async (req, res) => {
        let data = req.body;
        let query = `UPDATE users SET ? WHERE user_ID = ?`;
        try {
            await db.query(query, [data, data.user_ID]);
            let [results] = await db.query(`SELECT * FROM users WHERE type = 'user' AND user_status = 1`);
            res.send(results);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    // app.post('/deleteUser', (req, res) => {
    //     let query = `DELETE FROM users WHERE UID = ${req.body.ID}`;
    //     db.query(query, function (error, results) {
    //         if (error) {
    //             res.status(400).end(error);
    //         } else {
    //             let query = `SELECT * FROM users WHERE type = 'user'`;
    //             db.query(query, function (error, result) {
    //                 if (error) {
    //                     res.status(400).end(error);
    //                 } else {
    //                     res.send(result);
    //                 }
    //             });
    //         }
    //     });
    // });

    app.post('/updatePermissions', async (req, res) => {
        let data = req.body;
        let query = `UPDATE users SET ? WHERE user_ID = ?`;

        try {
            await db.query(`UPDATE users SET ? WHERE user_ID = ?`, [data, data.user_ID]);
            let [results] = await db.query(`SELECT * FROM users WHERE type = 'user' AND user_status = 1`);
            res.send(results);
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    });

    // app.post('/updateUserStatus', (req, res) => {
    //     let query = `UPDATE users SET user_status = !user_status WHERE UID = ${req.body.UID}`;
    //     db.query(query, function (error, results) {
    //         if (error) {
    //             res.status(400).end(error);
    //         } else {
    //             let query = `SELECT * FROM users WHERE type = 'user'`;
    //             db.query(query, function (error, result) {
    //                 if (error) {
    //                     res.status(400).end(error);
    //                 } else {
    //                     res.send(result);
    //                 }
    //             });
    //         }
    //     });
    // });
    
}