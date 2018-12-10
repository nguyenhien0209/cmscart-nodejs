var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var auth = require('../config/auth');
var isUser = auth.isUser;

//Get Product model
var Product = require('../models/product');

//Get Category model
var Category = require('../models/category');

/*
 * GET all products
 */
router.get('/', function(req, res){
    
    Product.find( function(err, products){
        if(err) {
            return console.log(err);
        } else {
            res.render('all_products', {
                title: 'All products',
                products: products
            });
        }
    }); 
});


/*
 * GET all products by category
 */
router.get('/:category', function(req, res){
    
    var categorySlug = req.params.category;
    
    Category.findOne({slug: categorySlug}, function(err, category){
        if(err) {
            console.log(err);
        } else {
            Product.find({category : categorySlug}, function(err, products){
                if(err) {
                    return console.log(err);
                } else {
                    res.render('category_products', {
                        title: category.title,
                        products: products
                    });
                }
            });
        }
    });    
});


/*
 * GET products details
 */
router.get('/:category/:product', function(req, res){
    
    var galleryImages = null;
    var loggedIn = (req.isAuthenticated()) ? true : false;
    
    Product.findOne({slug : req.params.product}, function(err, product){
        if(err) {
            console.log(err);
        } else {
            var galleryDir = 'public/product_images/'+ product._id +'/gallery';
            
            fs.readdir(galleryDir, function(err, files) {
                if(err) {
                    console.log(err);
                } else {
                    galleryImages = files;
                    
                    res.render('product',{
                        title: product.title,
                        product: product,
                        galleryImages : galleryImages,
                        loggedIn : loggedIn
                    });
                }
            });
        }
    });
        
});



//Exports Module
module.exports = router;