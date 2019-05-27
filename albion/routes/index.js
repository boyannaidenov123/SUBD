var express = require('express');
var router = express.Router();
var item = require('../node_modules/albionStoreModule/Item');

/* GET home page. */
router.get('/item', item.Get());

router.post('/item', item.Create());

module.exports = router;
