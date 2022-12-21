module.exports = (app, db, upload, fs, path) => {

    // Get Services
    app.get('/getServices', (req, res) => {
        let query = `SELECT * FROM services WHERE service_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results)
            }
        })
    })

    // Add Service
    app.post('/addService', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                let data = req.body;
                data.image_url = `/uploads/${req.file.filename}`;
                let query = `INSERT INTO services SET ?`;
                db.query(query, data, function (error, results) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        db.query(`SELECT * FROM services WHERE service_ID = ${results.insertId};`, function (error, result) {
                            if (error) {
                                res.status(500).send(error);
                            } else {
                                res.send(result[0])
                            }
                        })
                    }
                });
            }
        });
    });

    // Update Services with image
    app.post('/updateServiceImage', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                let data = req.body; // posted data  
                let oldImage = path.join(__dirname, `../${req.body.image_url}`); // old image reference
                data.image_url = `/uploads/${req.file.filename}`; // rename image url with new name
                fs.unlink(`${oldImage}`, (er) => {
                    if (err) return console.log(er);
                });
                let query = `UPDATE services SET ? WHERE service_ID = ?`;
                db.query(query, [data, data.service_ID], function (error, results) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        db.query(`SELECT * FROM services WHERE service_ID = ${data.service_ID};`, function (error, result) {
                            if (error) {
                                res.status(500).send(error);
                            } else {
                                res.send(result[0])
                            }
                        })
                    }
                });
            }
        });
    });

    // update service without image
    app.post('/updateService', (req, res) => {
        let data = req.body.data;
        let query = `UPDATE services SET ? WHERE service_ID = ?`;
        db.query(query, [data, data.service_ID], function (error) {
            if (error) {
                res.status(500).send(error);
            } else {
                db.query(`SELECT * FROM services WHERE service_ID = ${data.service_ID};`, function (error, result) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.send(result[0])
                    }
                })
            }
        });
    });

    // delete service
    app.post('/deleteService', (req, res) => {
        let data = req.body.data;
        let query = `UPDATE services SET service_status = 0 WHERE service_ID = ?`;
        db.query(query, data.service_ID, function(error, result) {
            if (error) {
                res.status(400).send(error);
            } else {
                let deletedImage = path.join(__dirname, `../${req.body.image_url}`);
                fs.unlink(`${deletedImage}`, (err) => {
                    if (err) return console.log(er);
                });
                res.send('deleted')
            }
        })
    })
}