'use strick';
require('dotenv').config();

class stockClass {
    constructor(code, company, category, product, account_month, ceo, market, nation, issue_admin = false, unfaith_notice = false, assets = false, foreign_company = false, blue_chip = false, venture = false, middle_standing = false, growth_tech = false, krx100 = false, kospi200 = false, star30 = false, premier = false, list_date = undefined, last_update = undefined) {
        this.code = code;
        this.company = company;
        this.category = category;
        this.product = product;
        this.list_date = list_date;
        this.account_month = account_month;
        this.ceo = ceo;
        this.issue_admin = issue_admin;
        this.unfaith_notice = unfaith_notice;
        this.assets = assets;
        this.foreign_company = foreign_company;
        this.blue_chip = blue_chip;
        this.venture = venture;
        this.middle_standing = middle_standing;
        this.growth_tech = growth_tech;
        this.krx100 = krx100;
        this.kospi200 = kospi200;
        this.star30 = star30;
        this.premier = premier;
        this.last_update = last_update;
        this.market = market;
        this.nation = nation;
    }
}