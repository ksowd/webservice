var express = require('express');
var router = express.Router();
let {
  anuncio
} = require('../models')
/* GET users listing. */
router.post('/', function (req, res, next) {
  return anuncio.create(req.body)
    .then((anuncio) => {
      res.status(201).json(anuncio);
    }).catch((err) => {
      console.log(err);
      res.status(500).send();
    })


});

module.exports = router;
