module.exports = (app, db, upload, fs, path) => {

    // Get items
    app.get('/getItems', async (req, res) => {
        let query = `SELECT stock.*, stock_categories.category_name FROM stock
        INNER JOIN stock_categories ON category_ID_FK = category_ID
        WHERE item_status = 1 ORDER BY item_ID ASC`;
        try {
            let [results] = await db.query(query);
            res.send(results)
        } catch (error) {
            res.status(400).send(error);
        }
    })

    // check barcode
    app.post('/checkBarcode', async (req, res) => {
        let data = req.body.data;
        let query = `SELECT * FROM stock WHERE barcode = ?`;
        try {
            let [results] = await db.query(query, data);
            res.send(results);
        } catch (error) {
            res.status(500).send(error)
        }
    })

    // Add item
    app.post('/addItem', async (req, res) => {
        let data = req.body.data;
        let query = `INSERT INTO stock SET ?`;
        try {
            let [addedItem] = await db.query(query, data);
            let [
                [result]
            ] = await db.query(`SELECT stock.*, stock_categories.category_name FROM stock INNER JOIN stock_categories ON category_ID_FK = category_ID WHERE stock.item_ID = ${addedItem.insertId};`);
            res.send(result);

        } catch (error) {
            res.status(400).send(error);
        }
    });


    // update without image
    app.post('/updateItem', async (req, res) => {
        let data = req.body.data;
        delete data.category_name;
        let query = `UPDATE stock SET ? WHERE item_ID = ?`;
        try {
            await db.query(query, [data, data.item_ID]);
            let [
                [result]
            ] = await db.query(`SELECT stock.*, stock_categories.category_name FROM stock INNER JOIN stock_categories ON category_ID_FK = category_ID WHERE item_ID = ${data.item_ID};`);
            res.send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // delete item
    app.post('/deleteItem', async (req, res) => {
        let data = req.body.data;
        let query = `UPDATE stock SET item_status = 0 WHERE item_ID = ?`;
        try {
            await db.query(query, data.item_ID);
            res.send('deleted')
        } catch (error) {
            res.status(500).send(error)
        }
    })


    // ################################### CATEGORIES ####################################

    // Get Categories
    app.get('/getCategories', async (req, res) => {
        let query = `SELECT * FROM stock_categories WHERE category_status = 1 ORDER BY category_index ASC`;
        try {
            let [results] = await db.query(query);
            res.send(results)
        } catch (error) {
            res.status(400).send(error);
        }
    })

    // Add category
    app.post('/addCategory', async (req, res) => {
        let data = req.body.data;
        try {
            let [
                [{
                    lastIndex
                }]
            ] = await db.query(`SELECT MAX(category_index) AS lastIndex FROM stock_categories`)
            data.category_index = lastIndex + 1;
            let query = `INSERT INTO stock_categories SET ?`;
            let [category] = await db.query(query, data);
            let [[result]] = await db.query(`SELECT * FROM stock_categories WHERE category_ID = ${category.insertId};`);
            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    });

    // update category
    app.post('/updateCategory', async (req, res) => {
        let data = req.body.data;
        let query = `UPDATE stock_categories SET ? WHERE category_ID = ?`;
        try {
            await db.query(query, [data, data.category_ID])
            let [
                [result]
            ] = await db.query(`SELECT * FROM stock_categories WHERE category_ID = ${data.category_ID};`)
            res.send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    });

    // delete category
    app.post('/deleteCategory', async (req, res) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction()
            let data = req.body.data;

            // delete category
            await connection.query(`UPDATE stock_categories SET category_status = 0, category_index = NULL WHERE category_ID = ?`, data.category_ID);

            // delete related items
            await connection.query(`UPDATE stock SET item_status = 0 WHERE category_ID_FK = ?`, data.category_ID);
            
            // commit changes
            await connection.commit();
            connection.release();

            res.send('deleted')
        } catch (error) {
            await connection.rollback();
            connection.release()
            res.status(400).send(error);
        }
    })

    // sort categories
    app.post('/sortCategories', async (req, res) => {
        let data = req.body;
        let query = '';
        data.forEach(element => {
            query += `UPDATE stock_categories SET category_index = ${data.indexOf(element)} WHERE category_ID = ${element.category_ID};`
        });

        try {
            await db.query(query);
            res.send('')
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    })

}