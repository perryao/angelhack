var express = require('express');
var router = express.Router();
const Influx = require('influx');
const toNano = require('influx').toNanoDate;
const { Pool } = require('pg');
const snakeCaseKeys = require('snakecase-keys');
const faker = require('faker');

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

router.get('/faker', (req, res, next) => {
  const randomIndex = getRandomInt(0, randomNumbers.length - 1);
  res.send(String(randomNumbers[randomIndex]));
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

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumbers = [
  76.5,
  67.1999969482422,
  78.4000015258789,
  59.4000015258789,
  50.0999984741211,
  73.4000015258789,
  78.6999969482422,
  63.2000007629395,
  63.4000015258789,
  63.7999992370605,
  61.7000007629395,
  73.1999969482422,
  59.2000007629395,
  55.7999992370605,
  66.0999984741211,
  61.5999984741211,
  67.5,
  64.1999969482422,
  51,
  64.9000015258789,
  59.9000015258789,
  70.5, 60.2999992370605, 74.6999969482422, 70.5999984741211, 61.9000015258789, 71.0999984741211, 67.8000030517578, 63, 70.1999969482422, 77, 59.7999992370605, 48.2000007629395, 55.7999992370605, 77.9000015258789, 52.4000015258789, 53.5, 68.5999984741211, 70.5999984741211, 55.2999992370605, 68.4000015258789, 51.5, 73.3000030517578, 70.5, 64, 75, 66.6999969482422, 78.5, 69.5, 51.0999984741211, 62.7000007629395, 60, 76.1999969482422, 48.0999984741211, 76.5999984741211, 65.4000015258789, 49.4000015258789, 64.0999984741211, 58.0999984741211, 80.5, 75.8000030517578, 82.4000015258789, 80.4000015258789, 63.7000007629395, 61.5, 67.5, 73.6999969482422, 49.5, 67, 62.9000015258789, 74.8000030517578, 75.1999969482422, 66.8000030517578, 53, 56.2999992370605, 72.4000015258789, 56.0999984741211, 47.9000015258789, 46.5999984741211, 59.7000007629395, 64.1999969482422, 65, 65.5999984741211, 61.4000015258789, 48.5999984741211, 51.7000007629395, 63.5, 71.0999984741211, 64.1999969482422, 57.2000007629395, 56.2999992370605, 51.9000015258789, 70.8000030517578, 70.5999984741211, 74.6999969482422, 63.5999984741211, 74.5999984741211, 64.3000030517578, 64.1999969482422, 64.0999984741211, 49.0999984741211, 62.7999992370605, 61.5999984741211, 61.5999984741211, 66.4000015258789, 56.4000015258789, 63.0999984741211, 77.0999984741211, 63.5, 50.9000015258789, 75.1999969482422, 65.8000030517578, 71.9000015258789, 54.5, 70.8000030517578, 61.5999984741211, 53.5999984741211, 70.8000030517578, 57.0999984741211, 67.5999984741211, 72.4000015258789, 71.9000015258789, 66.5, 61.9000015258789, 67.5, 50.7999992370605, 78.9000015258789, 77.9000015258789, 56.7000007629395, 60.2000007629395, 73.0999984741211, 61.2999992370605, 63.4000015258789, 62.5, 58.2000007629395, 70, 61.5999984741211, 63.7999992370605, 72.4000015258789, 68.4000015258789, 72.1999969482422, 67.1999969482422, 61.2000007629395, 56.2999992370605, 54.7999992370605, 53, 69.8000030517578, 66.8000030517578, 65.0999984741211, 57.5, 74.6999969482422, 66.3000030517578, 60.2000007629395, 72.4000015258789, 75.8000030517578, 77.1999969482422, 63.2000007629395, 53.2000007629395, 68.0999984741211, 53.5999984741211, 74.5999984741211, 67.9000015258789, 50.7000007629395, 63.7000007629395, 71.5999984741211, 71.4000015258789, 56.2000007629395, 63.2999992370605, 61.2999992370605, 56.4000015258789, 77.3000030517578, 68.5, 77.3000030517578, 61.4000015258789, 76.3000030517578, 63, 58.2000007629395, 66.8000030517578, 63.7000007629395, 71.1999969482422, 52.7000007629395, 75.4000015258789, 79.9000015258789, 73.8000030517578, 51.7000007629395, 62.7000007629395, 60.2000007629395, 67.9000015258789, 63.2999992370605, 80.3000030517578, 78, 78.0999984741211, 60.4000015258789, 68.5999984741211, 71.6999969482422, 66.9000015258789, 80.0999984741211, 52.2999992370605, 75.5999984741211, 63.4000015258789, 73.3000030517578, 72.9000015258789, 63, 76.5, 61.2999992370605, 75.9000015258789, 62.7999992370605, 76.8000030517578, 66.9000015258789, 77.5, 63.2999992370605, 68.4000015258789, 66.8000030517578, 66.0999984741211, 77.6999969482422, 55.7999992370605, 64.8000030517578, 68.9000015258789, 72.4000015258789, 58.9000015258789, 60.2999992370605, 51.0999984741211, 49.5, 64.3000030517578, 62, 63.2999992370605, 70.6999969482422, 71, 68, 57.4000015258789, 68.5999984741211, 49.2999992370605, 69.6999969482422, 75.9000015258789, 70.6999969482422, 50.7999992370605, 65.8000030517578, 52.0999984741211, 57.2999992370605, 59, 62.2000007629395, 71.5999984741211, 49.9000015258789, 62.7000007629395, 76.4000015258789, 66.5999984741211, 68.0999984741211, 60.2999992370605, 50.5, 59, 77.4000015258789, 51.5, 50.9000015258789, 51.7000007629395, 47.7000007629395, 51.5, 73.8000030517578, 52.7999992370605, 58.4000015258789, 64.1999969482422, 75.6999969482422, 75.8000030517578, 57.2000007629395, 72.4000015258789, 48.7000007629395, 70.6999969482422, 63.7000007629395, 52.9000015258789, 50.5, 75.4000015258789, 73.0999984741211, 63.7999992370605, 62.9000015258789, 48.5, 65, 71.0999984741211, 58.0999984741211, 54, 67, 65.0999984741211, 65.5, 67.0999984741211, 51.5999984741211, 52, 62.5999984741211, 65.4000015258789, 75.9000015258789, 78.6999969482422, 72.8000030517578, 72.8000030517578, 76.5, 71.4000015258789, 71.1999969482422, 73.3000030517578, 63.5999984741211, 62.7999992370605, 54.9000015258789, 75.3000030517578, 66.6999969482422, 81.4000015258789, 62.7999992370605, 70.1999969482422, 67.9000015258789, 62.2000007629395, 67, 54.5, 55, 55.5999984741211, 84.4000015258789, 78.5999984741211, 55.9000015258789, 74.0999984741211, 56.5999984741211, 65.5999984741211, 61.7999992370605, 52.7000007629395, 66.4000015258789, 68.5999984741211, 59.4000015258789, 71, 66.5, 76.4000015258789, 63.5999984741211, 80.6999969482422, 54.7999992370605, 74.8000030517578, 74.4000015258789, 70.6999969482422, 52.5, 62.4000015258789, 65.0999984741211, 71.0999984741211, 63.2999992370605, 70.4000015258789, 64.9000015258789, 50.2999992370605, 61.7000007629395, 69.8000030517578, 61.5, 65.4000015258789, 77.6999969482422, 66.5999984741211, 56.7000007629395, 51.9000015258789, 63.5, 60.9000015258789, 64.5999984741211, 51.5999984741211, 76.4000015258789, 65.0999984741211, 64.4000015258789, 63.2000007629395, 62.7999992370605, 69.0999984741211, 69, 60.0999984741211, 76.9000015258789, 62.2000007629395, 60.0999984741211, 73.0999984741211, 69.6999969482422, 63.4000015258789, 64.4000015258789, 66.5, 78.9000015258789, 68.0999984741211, 62.7000007629395, 56.7999992370605, 63.2000007629395, 75, 50.7000007629395, 69.6999969482422, 80.8000030517578, 69.6999969482422, 68.6999969482422, 63.9000015258789, 73.0999984741211, 69.4000015258789, 52.9000015258789, 67.6999969482422, 63.9000015258789, 50, 51.7000007629395, 78.8000030517578, 75.9000015258789, 66.8000030517578, 67, 63.2999992370605, 66.9000015258789, 73, 54.4000015258789, 75.3000030517578, 52.9000015258789, 47.2000007629395, 64.5999984741211, 56.4000015258789, 55, 68.9000015258789, 64.9000015258789, 60.5, 70.5999984741211, 51.5999984741211, 48.5, 64.0999984741211, 63.2999992370605, 77.4000015258789, 59.5999984741211, 72.0999984741211, 67.8000030517578, 70.5, 61.5, 63.0999984741211, 51, 76, 63.4000015258789, 65.4000015258789, 74.5999984741211, 76.6999969482422, 59.2000007629395, 77.9000015258789, 76, 72.9000015258789, 74.9000015258789, 56.5999984741211, 68.4000015258789, 65.9000015258789, 73, 50.9000015258789, 66.6999969482422, 53.4000015258789, 55.7999992370605, 59.7999992370605, 66.0999984741211, 66.3000030517578, 72.0999984741211, 63.5999984741211, 47.2000007629395, 80.6999969482422, 49.4000015258789, 56.0999984741211, 75.6999969482422, 66.5, 73.0999984741211, 64.1999969482422, 62.5, 75.0999984741211, 62.5999984741211, 64.1999969482422, 65.4000015258789, 57.2000007629395, 67.3000030517578, 73, 65.0999984741211, 73.1999969482422, 49.5, 60.0999984741211, 69.4000015258789, 56.4000015258789, 75.8000030517578, 70.4000015258789, 63.7000007629395, 51.7000007629395, 66.1999969482422, 70.9000015258789, 51.7000007629395, 62, 57.9000015258789, 65.5, 71, 75, 73.6999969482422, 54.7999992370605, 68.5999984741211, 63.4000015258789, 63.5, 74, 64.0999984741211, 63.2999992370605, 76.1999969482422, 52.7999992370605, 60.4000015258789, 74.1999969482422, 63.5, 62.5, 68.9000015258789, 49.4000015258789, 53.2999992370605, 79.9000015258789, 66.3000030517578, 60.0999984741211, 65.9000015258789, 56.0999984741211, 71.0999984741211, 67.3000030517578, 79.0999984741211, 63.9000015258789, 77.4000015258789, 62.0999984741211, 77.3000030517578, 76.5999984741211, 79.4000015258789, 52, 75.1999969482422, 63.7000007629395, 75.6999969482422, 75.1999969482422, 47.9000015258789, 54.7999992370605, 76.4000015258789, 60, 75, 74.3000030517578, 57.5999984741211, 66.4000015258789, 70.4000015258789, 63.7999992370605, 69.6999969482422, 50, 63.2000007629395, 63.5, 65.3000030517578, 73.3000030517578, 77.4000015258789, 72.0999984741211, 71.5999984741211, 63.7000007629395, 54.0999984741211, 77.3000030517578, 65.4000015258789, 61.2000007629395, 71.5, 64.3000030517578, 65.9000015258789, 59.7999992370605, 58.7999992370605, 63.7000007629395, 73.9000015258789, 59.2000007629395, 47.5, 63.2999992370605, 75.3000030517578, 80.6999969482422, 60.9000015258789, 62.2000007629395, 69.0999984741211, 80.4000015258789, 62.2000007629395, 66.4000015258789, 69.5999984741211, 64.0999984741211, 73.6999969482422, 77.6999969482422, 64.5999984741211, 64.5999984741211, 58.5, 80, 64.3000030517578, 64.6999969482422, 73.4000015258789, 70.1999969482422, 65, 61.2999992370605, 66.5, 72.5999984741211, 54.5, 75.8000030517578, 54.7999992370605, 54, 75.5999984741211, 70.1999969482422, 69.4000015258789, 54, 57.5999984741211, 69.1999969482422, 77.9000015258789, 62.4000015258789, 64.0999984741211, 66.1999969482422, 62.2999992370605, 75.0999984741211, 74.1999969482422, 68.4000015258789, 49.0999984741211, 74.9000015258789, 77.4000015258789, 53.0999984741211, 56.0999984741211, 57.2000007629395, 64.3000030517578, 72, 48.0999984741211, 65.5, 72, 70.3000030517578, 60, 61.7000007629395, 62, 80.0999984741211, 58.9000015258789, 72.3000030517578, 75, 72.5999984741211, 61.5999984741211, 56.5999984741211, 67.5999984741211, 59.2000007629395, 51.0999984741211, 56.4000015258789, 59.2000007629395, 60.0999984741211, 75.8000030517578, 77.6999969482422, 72.4000015258789, 61.5999984741211, 57.5, 79.1999969482422, 56.2999992370605, 51.2000007629395, 50.5, 73.5999984741211, 53.5, 70.5, 66.5, 63.0999984741211, 73.4000015258789, 59.2000007629395, 74.9000015258789, 78.1999969482422, 63.9000015258789, 51.7000007629395, 73, 78.4000015258789, 77.8000030517578, 61.5, 67.0999984741211, 52.5, 71.0999984741211, 65.4000015258789, 63.5999984741211, 55.7999992370605, 70.4000015258789, 56, 78.5, 57.7000007629395, 63.2000007629395, 66.4000015258789, 53.9000015258789, 55, 77.6999969482422, 71.0999984741211, 66.3000030517578, 65, 79.9000015258789, 70.3000030517578, 53.0999984741211, 63.5, 63.2000007629395, 75.9000015258789, 74.1999969482422, 66.1999969482422, 70.5, 56.7999992370605, 65.1999969482422, 52.7000007629395, 63.2999992370605, 62, 60.4000015258789, 49.5, 74.5, 74.0999984741211, 66.6999969482422, 71, 65.5, 58.2000007629395, 77.8000030517578, 73.4000015258789, 76.0999984741211, 80, 64.0999984741211, 70.6999969482422, 64.0999984741211, 62.9000015258789, 49.0999984741211, 71.4000015258789, 59.9000015258789, 80.3000030517578, 71.4000015258789, 64, 65.1999969482422, 49.9000015258789, 62.0999984741211, 48.0999984741211, 62.5999984741211, 54.5, 72, 77.8000030517578, 65.0999984741211, 59.2000007629395, 64.4000015258789, 72.5999984741211, 63.2999992370605, 65, 73.0999984741211, 52.4000015258789, 78, 65, 52.2000007629395, 76.3000030517578, 63.5, 69.8000030517578, 73.8000030517578, 59.2999992370605, 71.4000015258789, 61.4000015258789, 64.5999984741211, 78.6999969482422, 72.9000015258789, 72.4000015258789, 69, 65.5, 63.7999992370605, 62.2999992370605, 66.3000030517578, 70.6999969482422, 75.5, 76.0999984741211, 64.4000015258789, 48.2000007629395, 56.7000007629395, 63.4000015258789, 69.6999969482422, 73.5, 77.1999969482422, 78.4000015258789, 70.0999984741211, 75.0999984741211, 75.0999984741211, 67.0999984741211, 66.8000030517578, 64.4000015258789, 76.6999969482422, 73.0999984741211, 49, 73.6999969482422, 64.1999969482422, 51.2999992370605, 69.8000030517578, 60.2999992370605, 63, 62, 49.2999992370605, 58, 77.9000015258789, 81.9000015258789, 80.9000015258789, 65.9000015258789, 78, 78.5999984741211, 75.3000030517578, 68.1999969482422, 51.2000007629395, 50.5999984741211, 67.5999984741211, 69.5, 68.3000030517578, 76.1999969482422, 59.7000007629395, 67.4000015258789, 61.4000015258789, 49.5999984741211, 60.2000007629395, 56.2999992370605, 67.8000030517578, 64.8000030517578, 78.6999969482422, 56.5, 50.7999992370605, 76.1999969482422, 69.5999984741211, 70.1999969482422, 61.2999992370605, 69.8000030517578, 51.5999984741211, 49.4000015258789, 68.4000015258789, 46.9000015258789, 74.3000030517578, 65.3000030517578, 78.1999969482422, 49.2000007629395, 77.5, 62.0999984741211, 77.6999969482422, 65.0999984741211, 49.4000015258789, 54.7999992370605, 70.4000015258789, 54.0999984741211, 70.9000015258789, 70.6999969482422, 50, 52.4000015258789, 63.7000007629395, 66.6999969482422, 70.5, 72.4000015258789, 74.9000015258789, 64.1999969482422, 63.5, 68.9000015258789, 55.5, 78.4000015258789, 71.5999984741211, 69.5999984741211, 63.5999984741211, 78.5999984741211, 66.6999969482422, 56, 63.0999984741211, 69, 65.4000015258789, 51, 56.2999992370605, 47.0999984741211, 60.2000007629395, 62.7000007629395, 76.1999969482422, 70.3000030517578, 73, 53.0999984741211, 80.0999984741211, 69.5999984741211, 63.5999984741211, 64, 47.5999984741211, 73.6999969482422, 67.1999969482422, 72.6999969482422, 72.6999969482422, 75, 49.0999984741211, 61.2999992370605, 73.3000030517578, 61.0999984741211, 77.8000030517578, 79.8000030517578, 74.5999984741211, 59.7999992370605, 63, 72.4000015258789, 62.5, 75, 53.0999984741211, 59.4000015258789, 75, 78.4000015258789, 68.3000030517578, 66.9000015258789, 74.6999969482422, 61.7999992370605, 69, 49, 54.9000015258789, 77.9000015258789, 63.7999992370605, 61.9000015258789, 52, 61.5999984741211, 73.1999969482422, 70.1999969482422, 74.6999969482422, 68.0999984741211, 60.7000007629395, 71, 64.3000030517578, 72.0999984741211, 51.7999992370605, 51, 71.4000015258789, 76.8000030517578, 74.0999984741211, 70.9000015258789, 70.6999969482422, 56.5, 77.5, 49.2999992370605, 62, 68, 63.5999984741211, 50.5999984741211, 51.2000007629395, 51.7999992370605, 66.8000030517578, 50.7999992370605, 63.4000015258789, 54, 49.4000015258789, 80.6999969482422, 60.5, 75.9000015258789, 49.4000015258789, 74.8000030517578, 70, 72.3000030517578, 68, 51.0999984741211, 75, 61.0999984741211, 66.4000015258789, 62.5, 47.7999992370605, 55.7999992370605, 52.9000015258789, 56.7000007629395, 61.5, 73.9000015258789, 77.8000030517578, 54.5, 84.4000015258789, 69.1999969482422, 63.5999984741211, 79.4000015258789, 79.6999969482422, 71.5, 64.5999984741211, 56, 74.9000015258789, 64.8000030517578, 70.9000015258789, 60.7999992370605, 71.5999984741211, 68.8000030517578, 70.9000015258789, 77.3000030517578, 53.2999992370605, 77.3000030517578, 65.8000030517578, 79.1999969482422, 64.1999969482422, 70.5999984741211, 68.6999969482422, 64.0999984741211, 62.2000007629395, 63.7000007629395, 56.4000015258789, 71.5, 72.0999984741211, 64, 56, 51.4000015258789, 78, 69.8000030517578, 56.2999992370605, 63.7999992370605, 54.7000007629395, 50.4000015258789, 67.1999969482422, 69.5, 79.5999984741211, 50.7999992370605, 61.7000007629395, 71.3000030517578, 68.4000015258789, 67.5, 66.1999969482422, 62.5, 53, 51.7999992370605, 66.0999984741211, 62.5, 65.1999969482422, 64, 79.5, 64.1999969482422, 50.7999992370605, 65.4000015258789, 62.5, 70.5999984741211, 68.1999969482422, 66.6999969482422, 63.5, 64.9000015258789, 70.4000015258789, 78.9000015258789, 60.2000007629395, 65.5999984741211, 65.3000030517578, 71, 50.7999992370605, 79.9000015258789, 58.5999984741211, 49.5, 52.7000007629395, 75.5, 63.7000007629395, 49.7000007629395, 64.5999984741211, 52.7000007629395, 57.5, 7
];

module.exports = router;
