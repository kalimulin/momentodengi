const express = require('express');
const router = express.Router();
const config = require('../config.json');
const postgres = require('../postgres');

router.get('/', function(req, res, next) {
    // let sql = 'SELECT * FROM company_phone';
    // postgres.client.query(sql, function(err, results) {
    //     if (err) {
    //         console.error(err);
    //         res.statusCode = 500;
    //         next();
    //     }
    //     if (results.rows.length === 0) {
    //         res.statusCode = 404;
    //         next();
    //     }

    //     let company_phone = results.rows[0];

    //     res.render('index', {title: 'Главная', company_phone : company_phone.phone});
    // });
    res.sendFile('../public/index.html');
});

module.exports = router;
