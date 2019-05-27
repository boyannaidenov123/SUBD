var express = require('express');
var router = express.Router();
var item = require('../modules/Item');

/* GET home page. */
router.get('/item', item.Get());

router.post('/item', item.Create());

module.exports = router;
