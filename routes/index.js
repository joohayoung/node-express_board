var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Hello world!</h1>');
});

router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/template', function(req,res){
  res.render('temp',{data:'lion'});
})

router.get('/topic/:id/:mode', function(req,res){
  res.send(req.params.id + ',' + req.params.mode);
})

module.exports = router;
