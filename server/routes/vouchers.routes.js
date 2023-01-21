module.exports = (app, db, upload, fs, path) => {

    // Get vouchers
    app.get('/getVouchers', (req, res) => {
        let query = `SELECT * FROM stock WHERE item_status = 1 AND item_type = 'Voucher'`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results)
            }
        })
    });

    // Get vouchers that are not hidden 
    app.get('/getShownVouchers', (req, res) => {
        let query = `SELECT * FROM stock WHERE item_status = 1 AND show_on_sell = TRUE AND item_type = 'Voucher'`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results)
            }
        })
    });

    app.post('/addVoucher', (req, res) => {
        let data = req.body;
        data.image_url = `/uploads/no-image.jpg`;
        let query = `INSERT INTO stock SET ?`;
        db.query(query, data, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                db.query(`SELECT * FROM stock WHERE item_ID = ${result.insertId};`, function (error, result) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.send(result[0])
                    }
                })
            }
        })
    })
    // add voucher without image

    // Add Voucher With Image
    app.post('/addVoucherWithImage', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                let data = req.body;
                data.show_on_sell = data.show_on_sell == 'true' ? true : false; // fix JSON conversion for true and false
                data.image_url = `/uploads/${req.file.filename}`;
                let query = `INSERT INTO stock SET ?`;
                db.query(query, data, function (error, results) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        db.query(`SELECT * FROM stock WHERE item_ID = ${results.insertId};`, function (error, result) {
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

    // Update Vouchers with image
    app.post('/updateVoucherImage', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                let data = req.body; // posted data
                data.show_on_sell = data.show_on_sell == 'true' ? true : false; // fix JSON conversion for true and false
                let oldImage = path.join(__dirname, `../${req.body.image_url}`); // old image reference
                data.image_url = `/uploads/${req.file.filename}`; // rename image url with new name
                fs.unlink(`${oldImage}`, (er) => {
                    if (err) return console.log(er);
                });
                let query = `UPDATE stock SET ? WHERE item_ID = ?`;
                db.query(query, [data, data.item_ID], function (error, results) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        db.query(`SELECT * FROM stock WHERE item_ID = ${data.item_ID};`, function (error, result) {
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

    // update Voucher without image
    app.post('/updateVoucher', (req, res) => {
        let data = req.body.data;
        let query = `UPDATE stock SET ? WHERE item_ID = ?`;
        db.query(query, [data, data.item_ID], function (error) {
            if (error) {
                res.status(500).send(error);
            } else {
                db.query(`SELECT * FROM stock WHERE item_ID = ${data.item_ID};`, function (error, result) {
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
    app.post('/deleteVoucher', (req, res) => {
        let data = req.body.data;
        let query = `UPDATE stock SET item_status = 0 WHERE item_ID = ?`;
        db.query(query, data.item_ID, function(error, result) {
            if (error) {
                res.status(400).send(error);
            } else {
                let deletedImage = path.join(__dirname, `../${req.body.data.image_url}`);
                fs.unlink(`${deletedImage}`, (err) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        res.send('deleted')
                    }
                });
            }
        })
    })
}