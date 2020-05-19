const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('openloan', {title: 'Выдача займа', contract_sum : 10000, contract_period : 12});
});

router.post('/', function (req, res, next) {
    let contract_sum = +req.body.sum ? req.body.sum.split(' ')[0] : 10000;
    let contract_period = +req.body.period ? req.body.period.split(' ')[0] : 12;
    res.render('openloan', {title: 'Выдача займа', contract_sum, contract_period});
});

module.exports = router;
