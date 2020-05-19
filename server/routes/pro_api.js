const express = require('express');
const router = express.Router();
// const config = require('../config.json');
const postgres = require('../postgres');
// const _ = require('lodash');
// const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const docsStorage = multer.diskStorage({
    destination: __dirname + '/../public/media/documents',
    filename: function (request, file, callback) {
        crypto.pseudoRandomBytes(16, function (error, raw) {
            if (error) {return callback(error, null)}
            callback(null, raw.toString('hex') + path.extname(file.originalname));
        })
    },
    limits: {
        fileSize: 1000000,
        files: 1
    }
});

const officePhotoStorage = multer.diskStorage({
    destination: __dirname + '/../public/media/office_photo',
    filename: function (request, file, callback) {
        crypto.pseudoRandomBytes(16, function (error, raw) {
            if (error) {return callback(error, null)}
            callback(null, raw.toString('hex') + path.extname(file.originalname));
        })
    },
    limits: {
        fileSize: 1000000,
        files: 1
    }
});

const newsImagesStorage = multer.diskStorage({
    destination: __dirname + '/../public/media/news_images',
    filename: function (request, file, callback) {
        crypto.pseudoRandomBytes(16, function (error, raw) {
            if (error) {return callback(error, null)}
            callback(null, raw.toString('hex') + path.extname(file.originalname));
        })
    },
    limits: {
        fileSize: 1000000,
        files: 1
    }
});

const documentUpload = multer({storage: docsStorage});
const newsImageUpload = multer({storage: newsImagesStorage});
const officePhotoUpload = multer({storage: officePhotoStorage});

router.get('/', function (req, res) {
    res.json(req.user)
});

router.get('/check', function (req, res) {
    res.send(req.user)
});

router.get('/get_articles', function (req, res) {
    const sql = `SELECT id, header, pub_date FROM news ORDER BY pub_date DESC`;
    postgres.client.query(sql, function(err, news) {
        if (err) {
            console.error(err);
            res.send(500);
        }
        res.json(news['rows']);
    });
});

router.get('/get/:type/:id', function (req, res) {
    const id = req.params.id;
    const type = req.params.type;
    let sql = '';
    if (type === 'news') {
        sql = `SELECT id, header, pub_date FROM ${type} ORDER BY pub_date DESC`;
        if (+id) sql = `SELECT id, header, pub_date, article FROM ${type} WHERE id = ${id}`
    }
    if (type === 'document') {
        sql = `SELECT id, file_name, publish_date FROM ${type} ORDER BY publish_date DESC`;
        if (+id) sql = `SELECT id, file_name, publish_date, file_data FROM ${type} WHERE id = ${id}`
    }
    if (type === 'office') {
        sql = `SELECT id, city, office_name FROM office ORDER BY city`;
        if (+id) sql = `SELECT * FROM ${type} WHERE id = ${id}`
    }
    postgres.client.query(sql, function(err, news) {
        if (err) {
            console.error(err);
            res.send(500);
        }
        if (type === 'office' && +id === 0) {
            postgres.client.query('SELECT * FROM region ORDER BY region_name', function (err, regions) {
                if (err) {
                    console.error(err);
                    res.send(500);
                }
                res.json({offices: news['rows'], regions: regions['rows']})
            })
        } else if (type === 'news' && +id) {
            postgres.client.query(`SELECT * FROM newsimage WHERE source_id = ${id}`, function (err, images) {
                if (err) {
                    console.error(err);
                    res.send(500);
                }
                res.json({news: news['rows'], images: images['rows']})
            })
        } else {
            res.json(news['rows']);
        }
    });
});

router.post('/push_article', newsImageUpload.any('image'), function (req, res) {
    let files = req.files;
    const title = req.body.title;
    const html = req.body.editor_content;
    let id = req.body.id;
    let sql;
    if (+id) {
        sql = `UPDATE news SET (header, article, pub_date) = ('${title}', '${html}', CURRENT_TIMESTAMP) WHERE id = '${id}' RETURNING id`;
    } else {
        sql = `INSERT INTO news (header, article, pub_date) VALUES ('${title}', '${html}', CURRENT_TIMESTAMP) RETURNING id`;
    }
    postgres.client.query(sql, function(err, data) {
        if (err) {
            console.error(err);
            res.send(500);
        }

        if (files && files.length > 0) {
            if (+id) {
                console.log(id);
                sql = `INSERT INTO newsimage (description, image_source, source_id) VALUES ${sqlGen(files, 'news_images', id.toString())} RETURNING id`;
            } else {
                id = data.rows[0].id.toString();
                sql = `INSERT INTO newsimage (description, image_source, source_id) VALUES ${sqlGen(files, 'news_images', id)} RETURNING id`;
            }

            postgres.client.query(sql, function(err){
                if (err) {
                    console.error(err);
                    res.send(500);
                }
                res.json(data);
            });
        } else {
            res.json(data);
        }

    });

});

router.post('/push_office', officePhotoUpload.single('image'), function (req, res) {
    let file = req.file;
    const office_name = req.body.name;
    const address = req.body.address;
    const region_id = req.body.region;
    const weekdays = req.body.weekdays;
    const saturday = req.body.saturday;
    const sunday = req.body.sunday;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const dinner = req.body.dinner;
    const city = req.body.city;
    const active = req.body.active === 'on';
    let id = req.body.id;
    let sql;
    if (+id) {
        if (file) {
            sql = `UPDATE office SET (office_name, address, region_id, weekdays, saturday, sunday, let, lng, dinner, city, active, photo) = 
                ('${office_name}', '${address}', '${region_id}', '${weekdays}', '${saturday}', '${sunday}', '${latitude}', '${longitude}', 
                '${dinner}', '${city}', '${active}', 'office_photo/${file.filename}') 
                WHERE id = '${id}' RETURNING id`;
        } else {
            sql = `UPDATE office SET (office_name, address, region_id, weekdays, saturday, sunday, let, lng, dinner, city, active) = ` +
            `('${office_name}', '${address}', ${region_id}, '${weekdays}', '${saturday}', '${sunday}', '${latitude}', '${longitude}', '${dinner}', '${city}', '${active}') WHERE id = '${id}' RETURNING id`;
        }
    } else {
        sql = `INSERT INTO office (office_name, address, region_id, weekdays, saturday, sunday, let, lng, dinner, city, active) 
        VALUES ('${office_name}', '${address}', '${region_id}', '${weekdays}', '${saturday}', '${sunday}', '${latitude}', '${longitude}', '${dinner}', '${city}', '${active}') RETURNING id`;
    }
    console.log(sql);

    postgres.client.query(sql, function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.json(data);
    });
});

router.post('/docs_upload', documentUpload.single('image'), function (req, res) {
    let file = req.file;
    let name = req.body.name;
    const id = req.body.id;
    if (+id) {
        const sql = `UPDATE document SET (file_name) = ('${name}') WHERE id = '${id}'`;
        postgres.client.query(sql, function(err, data) {
            if (err) {
                console.error(err);
                res.send(500);
            }
            res.json(data);
        });
    } else {
        const sql = `INSERT INTO document (file_name, file_data, publish_date) VALUES ('${name}', 'documents/${file.filename}', CURRENT_TIMESTAMP)`;
        postgres.client.query(sql, function(err, data) {
            if (err) {
                console.error(err);
                res.send(500);
            }
            res.json({
                success: true,
                file: file
            });
        });
    }
});

router.delete('/document/:id', function (req, res) {
    const id = req.params.id;
    const sql = `DELETE from document WHERE id = '${id}'`;
    postgres.client.query(sql, function(err, data) {
        if (err) {
            console.error(err);
            res.send(500);
        }
        res.json(data);
    });
})

router.delete('/image/:id', function (req, res) {
    const id = req.params.id;
    const sql = `DELETE from newsimage WHERE id = '${id}' RETURNING image_source`;
    postgres.client.query(sql, function(err, data) {
        if (err) {
            console.error(err);
            res.send(500);
        }
        let imgpath = path.join(path.resolve("./"), 'server/public/media/', data['rows'][0]['image_source']);
        fs.unlink(imgpath, function(error) {
            if (error) {
                console.error(err);
                res.send(500);
            }
        });
        res.json(data);
    });
});

function sqlGen(arr, catalog, id) {
    let data = '';
    arr.map(function (item) {
        data += `('news image', '${catalog}/${item.filename}', '${id}'),`
    });
    return data.slice(0, -1);
}

module.exports = router;
