module.exports = (app, db, upload, fs, path) => {

    // Get items
    app.get('/getItems', (req, res) => {
        let query = `SELECT stock.*, stock_categories.category_name FROM stock INNER JOIN stock_categories ON category_ID_FK = category_ID WHERE item_status = 1 AND item_type = 'barcode' OR item_type = 'other' ORDER BY item_ID DESC`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results)
            }
        })
    })

    // getNoBarcodeItems
    // app.get('/getNoBarcodeItems', (req, res) => {
    //     let query = `SELECT stock.*, stock_categories.category_name FROM stock INNER JOIN stock_categories ON category_ID_FK = category_ID WHERE item_status = 1 AND item_type = 'other' ORDER BY item_ID DESC`;
    //     db.query(query, function (error, results) {
    //         if (error) {
    //             res.status(400).send(error);
    //         } else {
    //             res.send(results)
    //         }
    //     })
    // })

    // Add item
    app.post('/addItem', (req, res) => {
        let data = req.body.data;
        let query = `INSERT INTO stock SET ?`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(500).send(error);
            } else {
                db.query(`SELECT * FROM stock WHERE item_ID = ${results.insertId};`, function (error, result) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.send(result[0]);
                    }
                })
            }
        });
    });

    // check barcode
    app.post('/checkBarcode', (req, res) => {
        let data = req.body.data;
        let query = `SELECT * FROM stock WHERE barcode = ?`;
        db.query(query, data, function (error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send(result);
            }
        })
    })

    // update without image
    app.post('/updateItem', (req, res) => {
        let data = req.body.data;
        delete data.category_name;
        let query = `UPDATE stock SET ? WHERE item_ID = ?`;
        db.query(query, [data, data.item_ID], function (error) {
            if (error) {
                res.status(500).send(error);
            } else {
                db.query(`SELECT stock.*, stock_categories.category_name FROM stock INNER JOIN stock_categories ON category_ID_FK = category_ID WHERE item_ID = ${data.item_ID};`, function (error, result) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.send(result[0])
                    }
                })
            }
        });
    });

    // delete item
    app.post('/deleteItem', (req, res) => {
        let data = req.body.data;
        let query = `UPDATE stock SET item_status = 0 WHERE item_ID = ?`;
        db.query(query, data.item_ID, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send('deleted')
            }
        })
    })



    // Get Categories
    app.get('/getCategories', (req, res) => {
        let query = `SELECT * FROM stock_categories WHERE category_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results)
            }
        })
    })

    // Add category
    app.post('/addCategory', (req, res) => {
        let data = req.body.data;
        let query = `INSERT INTO stock_categories SET ?`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(500).send(error);
            } else {
                db.query(`SELECT * FROM stock_categories WHERE category_ID = ${results.insertId};`, function (error, result) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.send(result[0]);
                    }
                })
            }
        });
    });

    // update category
    app.post('/updateCategory', (req, res) => {
        let data = req.body.data;
        let query = `UPDATE stock_categories SET ? WHERE category_ID = ?`;
        db.query(query, [data, data.category_ID], function (error) {
            if (error) {
                res.status(500).send(error);
            } else {
                db.query(`SELECT * FROM stock_categories WHERE category_ID = ${data.category_ID};`, function (error, result) {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.send(result[0])
                    }
                })
            }
        });
    });

    // delete category
    app.post('/deleteCategory', (req, res) => {
        let data = req.body.data;
        let query = `UPDATE stock_categories SET category_status = 0 WHERE category_ID = ?`;
        db.query(query, data.category_ID, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send('deleted')
            }
        })
    })

}