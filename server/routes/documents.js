const express = require('express');
const router = express.Router();
const postgres = require('../postgres');

router.get('/', function(req, res, next) {
    let sql = 'SELECT * FROM document';
    postgres.client.query(sql, function(err, results) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            next();
        }
        if (results.rows.length === 0) {
            res.statusCode = 404;
            next();
        }

        res.render('documents', {title: 'Документы', documents : results.rows});
    });

});

module.exports = router;
