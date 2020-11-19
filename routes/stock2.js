'use strick';
require('dotenv').config();

let express = require('express');
let router = express.Router();

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
    res.render('stock', { title: 'Stock API v2' });
});

/* GET common market - 전체 마켓 리스트 */
router.get('/common/market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET common market api starting...`);

    let query = `SELECT DISTINCT market FROM "${process.env.DB_MEMBERTABLE}";`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET common sector - 전체 업종 리스트 */
router.get('/common/sector', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET common sector api starting...`);

    let query = `SELECT DISTINCT sector FROM "${process.env.DB_MEMBERTABLE}";`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET common sector by market - 마켓기준 업종 리스트 */
router.get('/common/sector/market/:market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET common sector by market api starting...`);

    const market = req.params.market;
    let query = `SELECT DISTINCT sector FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(market) LIKE UPPER('%${market}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET common sector by industry - 주요제품기준 업종 리스트 */
router.get('/common/sector/industry/:industry', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET common sector by industry api starting...`);

    const industry = req.params.industry;
    let query = `SELECT DISTINCT sector FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(industry) LIKE UPPER('%${industry}%');`;
    console.log(`${logtime} /common:GET/ GET common sector by industry query = ${query}`);

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET common industry - 전체 주요제품 리스트 */
router.get('/common/industry', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET common industry api starting...`);

    let query = `SELECT DISTINCT industry FROM "${process.env.DB_MEMBERTABLE}";`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET common industry by sector - 업종 기준 주요제품 리스트  */
router.get('/common/industry/sector/:sector', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET common industry by sector api starting...`);

    const sector = req.params.sector;

    let query = `SELECT DISTINCT industry FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(sector) LIKE UPPER('%${sector}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET common industry by market - 마켓 기준 주요제품 리스트 */
router.get('/common/industry/market/:market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET common industry by market api starting...`);

    const market = req.params.market;

    let query = `SELECT DISTINCT industry FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(market) LIKE UPPER('%${market}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock - 전체 주식 리스트 */
router.get('/stock', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock api starting...`);

    const market = req.params.market;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}";`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by market - 마켓기준 주식 리스트 */
router.get('/stock/market/:market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by market api starting...`);

    const market = req.params.market;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(market) LIKE UPPER('%${market}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by market and sector- 마켓 및 업종 기준 주식 리스트 */
router.get('/stock/market/:market/sector/:sector', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by market and sector api starting...`);

    const market = req.params.market;
    const sector = req.params.sector;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(market) LIKE UPPER('%${market}%') AND UPPER(sector) LIKE UPPER('%${sector}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by market and industry - 마켓 및 주요제품 기준 주식 리스트 */
router.get('/stock/market/:market/industry/:industry', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by market and industry api starting...`);

    const market = req.params.market;
    const industry = req.params.industry;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(market) LIKE UPPER('%${market}%') AND UPPER(industry) LIKE UPPER('%${industry}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by ticker - 티커 기준 주식 리스트 */
router.get('/stock/ticker/:ticker', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by ticker api starting...`);

    const ticker = req.params.ticker;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(ticker) LIKE UPPER('%${ticker}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by company - 회사명 기준 주식 리스트 */
router.get('/stock/company/:company', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by company api starting...`);

    const company = req.params.company;

    let query = `SELECT * FROM "${process.env.DB_MEMBERTABLE}" WHERE UPPER(company) LIKE UPPER('%${company}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock with addition info by ticker - 티커 기준 주식 리스트 및 추가 정보 포함 */
router.get('/stock/add/ticker/:ticker', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock with addition info by ticker api starting...`);

    const ticker = req.params.ticker;

    let query = `SELECT A.ticker, A.company, to_json(B) AS additional_info FROM "${process.env.DB_MEMBERTABLE}" A,"${process.env.DB_MEMBERINFOTABLE}" B WHERE UPPER(A.ticker) = UPPER(B.ticker) AND UPPER(A.ticker) like UPPER('%${ticker}%');`;

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock with addition info by company - 회사명 기준 주식 리스트 및 추가 정보 포함 */
router.get('/stock/add/company/:company', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock with addition info by company api starting...`);

    const company = req.params.company;

    let query = `SELECT A.ticker, A.company, to_json(B) AS additional_info FROM "${process.env.DB_MEMBERTABLE}" A,"${process.env.DB_MEMBERINFOTABLE}" B WHERE UPPER(A.ticker) = UPPER(B.ticker) AND UPPER(A.company) like UPPER('%${company}%');`;
    console.log(`${logtime} /common:GET/ GET stock with addition info by company api => ${query}`);

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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by issues- 관리종목 주식 리스트 */
router.get('/stock/issues', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by issues api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.issues_stock = true AND a.ticker = b.ticker;`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by issues by market- 마켓기준 관리종목 주식 리스트 */
router.get('/stock/issues/market/:market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by issues by market api starting...`);

    const market = req.params.market;

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.issues_stock = true AND UPPER(A.ticker) = UPPER(B.ticker) AND UPPER(A.market) LIKE UPPER('%${market}%');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by disclousure - 불성실 공시 법인 주식 리스트 */
router.get('/stock/disclousure', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by disclousure api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.disclousure_stock = true AND a.ticker = b.ticker;`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by disclousure by market - 마켓기준 불성실 공시 법인 주식 리스트 */
router.get('/stock/disclousure/market/:market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by disclousure by market api starting...`);

    const market = req.params.market;

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.disclousure_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('%${market}%');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by assets- 자산2조 법인 주식 리스트 */
router.get('/stock/assets', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by assets api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.assets_stock = true AND a.ticker = b.ticker;`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by assets by market - 마켓기준 자산2조 법인 주식 리스트 */
router.get('/stock/assets/market/:market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by assets by market api starting...`);

    const market = req.params.market;

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.assets_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('%${market}%');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by foreign- 외국 법인 주식 리스트 */
router.get('/stock/foreign', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by foreign api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.foreign_stock = true AND a.ticker = b.ticker;`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock by foreign and market  - 마켓 기준 외국 법인 법인 주식 리스트 */
router.get('/stock/foreign/market/:market', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock by foreign and market api starting...`);

    const market = req.params.market;

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.foreign_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('%${market}%');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in kosdaq's bluechip - 코스닥 우량 기업부 주식 리스트 */
router.get('/stock/bluechip', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock in kosdaq's bluechip api starting...`);


    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.bluechip_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('KOSDAQ:');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in kosdaq's venture - 코스닥 벤처기업부 주식 리스트 */
router.get('/stock/venture', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock in kosdaq's venture api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.venture_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('KOSDAQ:');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in kosdaq's middle grade enterprise - 코스닥 중견기업부 주식 리스트 */
router.get('/stock/middle', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock in kosdaq's middle grade enterprise api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.middle_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('KOSDAQ:');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in kosdaq's tech - 코스닥 기술성장 기업부 주식 리스트 */
router.get('/stock/techgrow', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock in kosdaq's tech api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.techgrow_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('KOSDAQ:');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in krx100- krx100 주식 리스트 */
router.get('/stock/krx100', async(req, res, next) => {
    console.log(`${logtime} /common:GET/  GET stock in krx100 api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.krx100_stock = true AND a.ticker = b.ticker;`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in kospi200 - kospi200 주식 리스트 */
router.get('/stock/kospi200', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock in kospi200 api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.kospi200_stock = true AND a.ticker = b.ticker;`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in star30 - str30 주식 리스트 */
router.get('/stock/star30', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock in star30 api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.star30_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('KOSDAQ:');`;
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
                    'content-Count': `${results.rows.length}`,
                    'X-Powered-By': 'Sercre',
                    'X-Babylonia-Media-Type': 'Priapus.v1',
                    'Status': '200 OK'
                }).json({ message: results.rows });
            }
        }
    });
});

/* GET stock in premier - premier 주식 리스트 */
router.get('/stock/premier', async(req, res, next) => {
    console.log(`${logtime} /common:GET/ GET stock in premier api starting...`);

    let query = `SELECT A, to_JSON(B) FROM "${process.env.DB_MEMBERTABLE}" A, "${process.env.DB_MEMBERINFOTABLE}" B WHERE B.premier_stock = true AND a.ticker = b.ticker AND UPPER(A.market) LIKE UPPER('KOSDAQ:');`;
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
                    'content-Count': `${results.rows.length}`,
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