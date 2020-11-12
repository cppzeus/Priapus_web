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
router.get('/stock/nations', async(req, res, next) => {
    console.log(`${logtime} /stock:GET/ get stock's nation info api starting...`);

    let query = `SELECT DISTINCT nation FROM "${process.env.DB_MEMBERTABLE}"`;

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

/* GET stock district by nation*/
router.get('/stock/district/:nation', async(req, res, next) => {
    console.log(`${logtime} /stock:GET/ get stock's nation info api starting...`);
    const nation = req.params.nation;

    let query = `SELECT DISTINCT district FROM "${process.env.DB_MEMBERTABLE}" WHERE nation = '${nation}'`;

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

router.get('/stock/code/:code/nation/:nation', async(req, res, next) => {
    console.log(`${logtime} /stock:GET/ get stock's company info api starting...`);
    const code = req.params.code;
    const nation = req.params.nation;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(code) like UPPER('%${code}%') AND UPPER(nation) like UPPER('%${nation}%');`;
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