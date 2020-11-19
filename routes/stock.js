'use strick';
require('dotenv').config();

let express = require('express');
let router = express.Router();

const stock = require('../model/stock');

let Pool = require('pg').Pool;
// Connect Database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.POSTGRESQL_DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.POSTGRESQL_DB_PORT,
    connectionLimit: 20,
    waitForConnections: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('stock', { title: 'Stock API v1' });
});

/* GET stock nation*/
router.get('/stock/country', async(req, res, next) => {
    console.log(`${logtime} /stock:GET/ get stock's nation info api starting...`);

    let query = `SELECT DISTINCT country FROM "${process.env.DB_MEMBERTABLE}"`;

    await pool.query(query, (err, results) => {
        if (err) {
            console.log(`${logtime} /stock:GET/ error => ${err}`);
            res.status(400).set({
                'content-Type': 'application/json',
                'X-Powered-By': 'Sercre',
                'X-Babylonia-Media-Type': 'Priapus.v1',
                'Status': '400 Bad Request'
            }).json({ message: err });
        } else {
            if (results.rowCount === 0) {
                console.log(`${logtime} /stock:GET/ error => Email is not found`);
                res.status(204).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '204 No Content'
                }).json({ message: "stock's nation is not found" });
            } else {
                console.log(`${logtime} /stock:GET/ succeed => ${results.rows.length}`);
                res.status(200).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock market*/
router.get('/stock/market', async(req, res, next) => {
    console.log(`${logtime} /market:GET/ get stock's market info api starting...`);

    let query = `SELECT DISTINCT market FROM "${process.env.DB_MEMBERTABLE}"`;

    await pool.query(query, (err, results) => {
        if (err) {
            console.log(`${logtime} /stock:GET/ error => ${err}`);
            res.status(400).set({
                'content-Type': 'application/json',
                'X-Powered-By': 'Sercre',
                'X-Babylonia-Media-Type': 'Priapus.v1',
                'Status': '400 Bad Request'
            }).json({ message: err });
        } else {
            if (results.rowCount === 0) {
                console.log(`${logtime} /stock:GET/ error => Email is not found`);
                res.status(204).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '204 No Content'
                }).json({ message: "stock's nation is not found" });
            } else {
                console.log(`${logtime} /stock:GET/ succeed => ${results.rows.length}`);
                res.status(200).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock list by stock market */
router.get('/stock/market/:market', async(req, res, next) => {
    console.log(`${logtime} /market-list:GET/ get stock's company info api starting...`);
    const market = req.params.market;

    let query = `SELECT ticker, company FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(market) like UPPER('%${market}%');`;
    console.log(`${logtime} /stock:GET/ query => ${query}`);

    await pool.query(query, (err, results) => {
        if (err) {
            console.log(`${logtime} /stock:GET/ error => ${err}`);
            res.status(400).set({
                'content-Type': 'application/json',
                'X-Powered-By': 'Sercre',
                'X-Babylonia-Media-Type': 'Priapus.v1',
                'Status': '400 Bad Request'
            }).json({ message: err });
        } else {
            if (results.rowCount === 0) {
                console.log(`${logtime} /stock:GET/ error => Email is not found`);
                res.status(204).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '204 No Content'
                }).json({ message: "stock's nation is not found" });
            } else {
                console.log(`${logtime} /stock:GET/ succeed => ${results.rows.length}`);
                res.status(200).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});


/* GET stock info by stock name*/
router.get('/stock/company/:company', async(req, res, next) => {
    console.log(`${logtime} /stock:GET/ get stock's company info api starting...`);
    const company = req.params.company;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(company) like UPPER('%${company}%');`;
    console.log(`${logtime} /stock:GET/ query => ${query}`);

    await pool.query(query, (err, results) => {
        if (err) {
            console.log(`${logtime} /stock:GET/ error => ${err}`);
            res.status(400).set({
                'content-Type': 'application/json',
                'X-Powered-By': 'Sercre',
                'X-Babylonia-Media-Type': 'Priapus.v1',
                'Status': '400 Bad Request'
            }).json({ message: err });
        } else {
            if (results.rowCount === 0) {
                console.log(`${logtime} /stock:GET/ error => Email is not found`);
                res.status(204).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '204 No Content'
                }).json({ message: "stock's nation is not found" });
            } else {
                console.log(`${logtime} /stock:GET/ succeed => ${results.rows.length}`);
                res.status(200).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock info by stock ticker*/
router.get('/stock/ticker/:ticker/country/:country', async(req, res, next) => {
    console.log(`${logtime} /stock:GET/ get stock's company info api starting...`);

    const ticker = req.params.ticker;
    const country = req.params.country;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(ticker) like UPPER('%${ticker}%') AND UPPER(country) like UPPER('%${country}%');`;
    console.log(`${logtime} /stock:GET/ query => ${query}`);

    await pool.query(query, (err, results) => {
        if (err) {
            console.log(`${logtime} /stock:GET/ error => ${err}`);
            res.status(400).set({
                'content-Type': 'application/json',
                'X-Powered-By': 'Sercre',
                'X-Babylonia-Media-Type': 'Priapus.v1',
                'Status': '400 Bad Request'
            }).json({ message: err });
        } else {
            if (results.rowCount === 0) {
                console.log(`${logtime} /stock:GET/ error => Email is not found`);
                res.status(204).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '204 No Content'
                }).json({ message: "stock's nation is not found" });
            } else {
                console.log(`${logtime} /stock:GET/ succeed => ${results.rows.length}`);
                res.status(200).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock addition info by stock ticker for korea stock*/
router.get('/stock/addinfo/:ticker', async(req, res, next) => {
    console.log(`${logtime} /stock:GET/ get stock's additional info api starting...`);
    const ticker = req.params.ticker;

    let query = `SELECT A.ticker, A.company, to_json(B) AS additional_info FROM "${process.env.DB_MEMBERTABLE}" A,"${process.env.DB_MEMBERINFOTABLE}" B WHERE UPPER(A.ticker) = UPPER(B.ticker) AND UPPER(A.ticker) like UPPER('%${ticker}%');`;
    console.log(`${logtime} /stock:GET/ query => ${query}`);

    await pool.query(query, (err, results) => {
        if (err) {
            console.log(`${logtime} /stock:GET/ error => ${err}`);
            res.status(400).set({
                'content-Type': 'application/json',
                'X-Powered-By': 'Sercre',
                'X-Babylonia-Media-Type': 'Priapus.v1',
                'Status': '400 Bad Request'
            }).json({ message: err });
        } else {
            if (results.rowCount === 0) {
                console.log(`${logtime} /stock:GET/ error => Email is not found`);
                res.status(204).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '204 No Content'
                }).json({ message: "stock's nation is not found" });
            } else {
                console.log(`${logtime} /stock:GET/ succeed => ${results.rows.length}`);
                res.status(200).set({
                    'content-Type': 'application/json',
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

require('date-utils');
const dt = new Date();
const logtime = dt.toFormat(`YYYY-MM-DD HH24:MI:SS`);

module.exports = router;