var express = require('express');
var router = express.Router();
var { execSync } = require('child_process');
const { default: axios } = require('axios');

/* GET home page. */
router.post('/', async function(req, res, next) {
  // フロントから画像取得
  const encodedImage = req.body.encodedImage.split(',')[1];
  // アクセストークン発行
  const accessToken = 'Bearer ' + execSync('gcloud auth application-default print-access-token').toString().replace(/\n/, '');
  // API発行
  const api = axios.create({
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': accessToken
    },
    responseType: 'json'
  });
  api.post(
    'https://vision.googleapis.com/v1/images:annotate',
    {
    'requests': [
      {
        'image': {
          'content': encodedImage
        },
        'features': [
          {
            'type': 'TEXT_DETECTION'
          }
        ]
      }
    ]
  })
  .then(response => {
    console.log(response.data);
    res.json(response.data);
  })
  .catch(error => {
    console.log('API Error!', error);
  });
});

module.exports = router;