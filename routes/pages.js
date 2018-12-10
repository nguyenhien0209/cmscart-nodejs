var express = require('express');
var router = express.Router();

var Page = require('../models/page');

/*
 * GET /
 */
router.get('/', function(req, res){
    
    Page.findOne({ slug : 'home'}, function(err, page){
        if(err) {
            return console.log(err);
        }
        
        if(!page) {
            res.redirect('/');
        } else {
            res.render('index', {
                title: page.title,
                content: page.content
            });
        }
    }); 
});

/*
 * GET /
 */
router.get('/:slug', function(req, res){
    
    var slug = req.params.slug;
    
    Page.findOne({ slug : slug}, function(err, page){
        if(err) {
            return console.log(err);
        }
        
        if(!page) {
            res.redirect('/');
        } else {
            res.render('index', {
                title: page.title,
                content: page.content
            });
        }
    });
    
     
});

//Exports Module
module.exports = router;