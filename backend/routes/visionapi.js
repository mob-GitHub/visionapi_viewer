var express = require('express');
var router = express.Router();
var vision = require('@google-cloud/vision');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.textDetection('./public/images/IMG_9385.jpg');
  const detections = result.textAnnotations;
  res.render('visionapi', { result: detections[0].description });
});

module.exports = router;