const express = require('express');
const router = express.Router();
const postgres = require('../postgres');
const async = require('async');
const _ = require('lodash');

router.get('/', function(req, res, next) {
    let limit = 5; // количество новостей на странице
    let page = +req.query.page ? +req.query.page : 1;

    async.waterfall([
        function (callback) {
            let sql = `SELECT count(id) AS newscount FROM press`;

            postgres.client.query(sql, function(err, newsCount) {
                if (err) {
                    console.error(err);
                    callback(err);
                }
                callback(null, newsCount['rows'][0]['newscount'])
            });
        },
        function (newsCount, callback) {
            let offset = (page - 1) * limit;

            let sql = `SELECT * FROM press ORDER BY pub_date DESC LIMIT ${limit} OFFSET ${offset}`;

            postgres.client.query(sql, function(err, news) {
                if (err) {
                    console.error(err);
                    callback(err);
                }
                callback(null, newsCount, news['rows'])
            });
        },
        function (newsCount, news, callback) {
            let maxId = _.maxBy(news, 'id').id;
            let minId = _.minBy(news, 'id').id;

            let sql = `SELECT * FROM pressimage WHERE source_id <= ${maxId} AND source_id >= ${minId}`;

            postgres.client.query(sql, function(err, images) {
                if (err) {
                    console.error(err);
                    callback(err);
                }
                callback(null, {newsCount, news, images : images['rows']})
            });
        }
    ], function (err, results) {
        if (err) {
            res.statusCode = 500;
            next();
        }

        let count = results.newsCount;
        let countPages = Math.ceil(count/limit);
        if (page > countPages) {
            page = countPages
        }
        let news = results.news;
        let newsimages = results.images;
        _.each(news, function (item) {
            item.images = []
        });
        _.each(newsimages, function (image) {
            let index = _.findIndex(news,{id : image.source_id});
            if (index >= 0) {
                news[index].images.push(image)
            }
        });
        res.render('press', {title: 'Пресса', news, countPages, page});
    });
});


router.get('/:id', function(req, res, next) {
    async.waterfall([
        function (callback) {
            let sql = `SELECT * FROM press WHERE id = ${req.params.id}`;

            postgres.client.query(sql, function(err, news) {
                if (err) {
                    console.error(err);
                    callback(err);
                }
                callback(null, news['rows'][0])
            });
        },
        function (news_item, callback) {
            let sql = `SELECT * FROM pressimage WHERE source_id = ${news_item.id}`;

            postgres.client.query(sql, function(err, images) {
                if (err) {
                    console.error(err);
                    callback(err);
                }
                news_item.images = images['rows'] || [];
                callback(null, news_item)
            });
        }
    ], function (err, news_item) {
        if (err) {
            res.statusCode = 500;
            next();
        }
        console.log(news_item);
        res.render('press_detail', {title: news_item.header, news_item});
    });
});

module.exports = router;
