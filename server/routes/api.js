const config = require('../config.json');
const jwt = require('jsonwebtoken');
// const assign = require('object-assign');
const express = require('express');
const router = express.Router();
const postgres = require('../postgres');
const async = require('async');
const _ = require('lodash');
const cheerio = require('cheerio');
const crypto = require('crypto');
const secret = config.jwt.secret;


router.post('/token', function (req, res) {
    const login = req.body.login;
    const password = crypto.createHash('md5').update(req.body.password).digest("hex");
    console.log(password);
    const users = {
        anykey: 'aa062a844269f0369883d3e6787d8753',
        mdadmin: '2b2f4507ee9dcedd17456cc9b5f735b2'
    };
    if (users[login] && users[login] === password) {
        const data = {
            user: login
        };
        return res.json(jwt.sign(data, secret))
    } else {
        return res.sendStatus(401);
    }

});

router.get('/get_documents', function(req, res, next) {
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

        res.json({title: 'Документы', documents : results.rows});
    });

});

router.get('/get_articles/:page', function (req, res) {
    let limit = 5; // количество новостей на странице
    let page = +req.params.page ? +req.params.page : 1;

    async.waterfall([
        function (callback) {
            let sql = `SELECT count(id) AS newscount FROM news`;

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

            let sql = `SELECT * FROM news ORDER BY pub_date DESC LIMIT ${limit} OFFSET ${offset}`;
            postgres.client.query(sql, function(err, news) {
                if (err) {
                    console.error(err);
                    callback(err);
                }
                if (news['rows'].length) {
                    callback(null, newsCount, news['rows'])
                } else {
                    callback(404);
                }

            });
        },
        function (newsCount, news, callback) {
            let maxId = _.maxBy(news, 'id').id;
            let minId = _.minBy(news, 'id').id;

            let sql = `SELECT * FROM newsimage WHERE source_id <= ${maxId} AND source_id >= ${minId}`;

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
            res.sendStatus(500);
        } else {
            let count = results.newsCount;
            let countPages = Math.ceil(count/limit);
            if (page > countPages) {
                page = countPages
            }
            let news = results.news;
            let newsimages = results.images;
            _.each(news, function (item) {
                item.images = [];
                let $ = cheerio.load(item.article);
                item.firstPar = $('p').first().text();
            });
            _.each(newsimages, function (image) {
                let index = _.findIndex(news,{id : image.source_id});
                if (index >= 0) {
                    news[index].images.push(image)
                }
            });
            res.json({title: 'Новости', news, countPages, page});
        }
    });
});

router.get('/get_article/:id', function(req, res, next) {
    if(+req.params.id) {
        async.waterfall([
            function (callback) {
                let sql = `SELECT * FROM news WHERE id = ${req.params.id}`;

                postgres.client.query(sql, function(err, news) {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                    if (news['rows'].length) {
                        callback(null, news['rows'][0])
                    } else {
                        callback(404);
                    }
                });
            },
            function (news_item, callback) {
                let sql = `SELECT * FROM newsimage WHERE source_id = ${news_item.id}`;

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
                console.log(err);
                res.sendStatus(404);
            } else {
                console.log(news_item);
                if (news_item) {
                    res.json({title: news_item.header, news_item});
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } else {
        res.sendStatus(404);
    }

});

router.get('/get_press/:page', function (req, res) {
    let limit = 5; // количество новостей на странице
    let page = +req.params.page ? +req.params.page : 1;

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
                if (news['rows'].length) {
                    callback(null, newsCount, news['rows'])
                } else {
                    callback(404);
                }

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
            res.sendStatus(500);
        } else {
            let count = results.newsCount;
            let countPages = Math.ceil(count/limit);
            if (page > countPages) {
                page = countPages
            }
            let news = results.news;
            let newsimages = results.images;
            _.each(news, function (item) {
                item.images = [];
                let $ = cheerio.load(item.article);
                item.firstPar = $('p').first().text();
            });
            _.each(newsimages, function (image) {
                let index = _.findIndex(news,{id : image.source_id});
                if (index >= 0) {
                    news[index].images.push(image)
                }
            });
            res.json({title: 'Новости', news, countPages, page});
        }
    });
});

router.get('/get_press_item/:id', function(req, res, next) {
    if(+req.params.id) {
        async.waterfall([
            function (callback) {
                let sql = `SELECT * FROM press WHERE id = ${req.params.id}`;

                postgres.client.query(sql, function(err, news) {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                    if (news['rows'].length) {
                        callback(null, news['rows'][0])
                    } else {
                        callback(404);
                    }
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
                console.log(err);
                res.sendStatus(404);
            } else {
                console.log(news_item);
                if (news_item) {
                    res.json({title: news_item.header, news_item});
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } else {
        res.sendStatus(404);
    }

});

router.get('/offices', function(req, res, next) {
    let sql = 'SELECT * FROM office WHERE active = true';
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

        let offices = results.rows;

        res.json({offices});
    });

});

router.get('/regions', function(req, res, next) {
    let sql = 'SELECT * FROM region';
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

        let regions = results.rows;

        res.json({regions});
    });

});

router.post('/token', function (req, res, next) {
    let login = req.body.login;
    let password = req.body.password;
    let users = config.users;
    let index = _.findIndex(users, {login, password});
    if (index < 0) {
        console.log("Авторизация не удалась");
        res.status(200).json({err : 'Авторизация не удалась'});
    } else {
        let user = users[index];
        let payload = {id: user.id};
        let token = jwt.sign(payload, config.jwt.secret);
        res.status(200).json({err: null, token})
    }
});

module.exports = router;
