var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

router.get('/complaints', (req, res, next) => {

  const pool = new Pool();

  pool.query('SELECT * FROM angel_hack.complaints', (err, result) => {
    if (err) {
      throw err
    }

    console.log('Found numer of rows: ' + result.rowCount);
    res.set('Content-Type', 'application/json').send({
      data: result.rows
    });
  })
});

/**
 * initialReceiptDate
 * caseContactMethod
 * summary
 * caseRegion
 * caseCountry
 * sector
 * subSector
 * category
 * brand
 * segment
 * subBrand
 * productFormDetail
 * flavorScentDetail
 * collection
 * version
 * consumerBenefit1
 * consumerBenefit2
 * consumerBenefit3
 * consumerBenefit4
 * productSize
 * unitSize
 * productionCode
 * manufacturingPlant
 * manufacturingDate
 * manufacturingLine
 * city
 * stateProvince
 * globalCommentPath
 * L1commentCode
 * L2commentCode
 * L3commentCode
 * commentCriticality
 * storeOfPurchase
 * complaintMetric
 * 
 */
router.post('/customerInput', (req, res, next) => {

});

module.exports = router;
