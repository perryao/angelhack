var express = require('express');
var router = express.Router();
const Influx = require('influx');
const { Pool } = require('pg');

const influx = new Influx.InfluxDB({
  host: 'thisisadangeroussite.com:8888',
  database: 'plant_data',
  schema: [
    {
      measurement: 'response_times',
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER
      },
      tags: [
      ]
    }
  ]
});

influx.getDatabaseNames()
  .then(names => {
    console.log(names);
  })
  .catch(err => {
    console.log(err);
    console.error(`Error creating Influx database!`);
  })

router.get('/complaints', (req, res, next) => {

  const pool = new Pool();

  pool.query('SELECT * FROM angel_hack.complaints WHERE production_code is not null', (err, result) => {
    if (err) {
      throw err
    }

    console.log('Found numer of rows: ' + result.rowCount);
    res.set('Content-Type', 'application/json').send({
      data: result.rows
    });
  })
});

router.get('/timeseries', (req, res, next) => {

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
