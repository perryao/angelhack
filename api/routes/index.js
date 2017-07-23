var express = require('express');
var router = express.Router();
const Influx = require('influx');
const toNano = require('influx').toNanoDate;
const { Pool } = require('pg');
const snakeCaseKeys = require('snakecase-keys');

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

router.get('/complaints', (req, res, next) => {
  const pool = new Pool();

  pool.query('SELECT * FROM angel_hack.complaints WHERE "Production Code" like \'7%\' and length("Production Code") = 14', (err, result) => {
    if (err) {
      throw err
    }

    console.log('Found numer of rows: ' + result.rowCount);

    res.set('Content-Type', 'application/json').send({
      data: result.rows.map(snakeCaseKeys)
    });
  })
});

router.get('/timeseries', (req, res, next) => {
  const productionCode = req.query.productionCode;
  if (!productionCode) return res.send();

  const nanoseconds = productionCodeToNanoseconds(productionCode);
  const minus1hour = nanoMinus1Hour(nanoseconds);
  const plus1hour = nanoPlus1Hour(nanoseconds);

  res.send();

  // influx.query('select a_kghr from  "plant_data"."autogen"."data" where time < now() - 1h limit 1000')
  // influx.query('select b_kghr from  "plant_data"."autogen"."data" where time > 1493658000000 limit 1000;')
  //   .then(result => {
  //     res.set('Content-Type', 'application/json').send({ data: result });
  //   })
  //   .catch(err => res.send(err));
});

function productionCodeToNanoseconds(code) {
  code = String(code);
  const yearNumber = code.slice(0, 1);
  const julianDate = code.slice(1, 4);
  const plantCode = code.slice(4, 8);
  const lineNumber = code.slice(8, 10);
  const militaryTime = code.slice(10, 14);

  const hours = militaryTime.slice(0, 2);
  const minutes = militaryTime.slice(2);

  const year = '201' + yearNumber;
  const date = makeDate(year, julianDate, hours, minutes);
  const milliseconds = date.getTime();
  const nanoseconds = milliseconds * 1000000;

  return nanoseconds;
}

function makeDate(year, day, hours, minutes) {
  var date = new Date(year, 0); // initialize a date in `year-01-01`
  date = new Date(date.setDate(day)); // add the number of days
  date = new Date(date.setHours(hours));
  date = new Date(date.setMinutes(minutes));
  return date;
}

function nanoMinus1Hour(nano) {
  return nano - (1 * 60 * 60 * 1000 * 1000000);
}

function nanoPlus1Hour(nano) {
  return nano + (1 * 60 * 60 * 1000 * 1000000);
}

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
