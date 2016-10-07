var app = require('express');
var router = app.Router();

router.get('/', function(req, res, next){
    res.render('admin/index');
});


router.get('/user_list', function(req, res, next){
    res.render('admin/user_list');
});
router.get('/user_form', function(req, res, next){
    res.render('admin/user_form');
});

module.exports = router;