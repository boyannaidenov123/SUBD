var express = require('express');
var router = express.Router();
var item = require('../modules/Item');

router.get('/', item.Get());

router.post('/', item.Create());

router.put('/', item.Update());

router.delete('/', item.Delete());

module.exports = router;