var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Page Title', condition: true, anyArray: [1,2,3]} );
});

// pass params id 
// '/test/:id/param2'  ==> req.params.param2
router.get('/test/:id', function(req, res, next) {
  res.render('test', {output: req.params.id} );     // =======> Get Methode 
});

// "/test/submit" for the POST request !!
// Get the id form From and redirect to the same page web
router.post('/test/submit', function(req, res, next) {  
  // get params form post request : by body   
  var id = req.body.id;             // =======> POST Methode
  res.redirect('/test/'+id); 
  // res.redirect('/test/:'+id);
});

module.exports = router;
