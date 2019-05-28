var express = require('express');
var router = express.Router();
var item = require('../modules/Item');

router.get('/', (req,res,next)=>{
    res.render('index');
});

module.exports = router;
