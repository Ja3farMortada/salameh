module.exports = (app, db) => {
    const md5 = require('md5');

    app.post('/login', async (req, res) => {

        let query = "SELECT * FROM `users` WHERE `username` = ? AND `password` = ? AND `user_status` = ? ";
        try {
            let [[results]] = await db.query(query, [req.body.username, md5(req.body.password), true]);
            if (results) {
                res.send(results);
            } else {
                throw ('Incorrect Username or Password!')
            }
        } catch (e) {
            if (e.errorno === 'ECONNREFUSED') {
                res.status(500).send('Database Connection Refused!');
            } else {
                res.status(403).send(e);
            }
        }
    });
};