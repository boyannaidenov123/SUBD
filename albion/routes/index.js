var express = require('express');
var router = express.Router();
var item = require('../modules/Item');

router.get('/item', item.Get());

router.post('/item', item.Create());

router.put('/item', item.Update());

router.delete('/item', item.Delete());

module.exports = router;
