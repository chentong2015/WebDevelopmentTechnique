// set the routes of the page 
module.exports = function(app) {
    app.get('/',function(req,res){
        res.render('index');
    });
    app.get('/customer',function(req,res){
        res.render('customer');
    });
    app.get('/admin',function(req,res){
        res.render('admin');
    });
}