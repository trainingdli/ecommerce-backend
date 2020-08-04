const express = require('express');
const data = require('../data');
const productModel = require('../models/product.model');
const reviewService = require('../services/review.svc');

class ProductCtrl {
    getProductById(req, res) {
        // const id = +req.params.id;
        const id = +req.query.id;
        const category = req.query.category;
        let filteredProduct;
        data.products.forEach(product => {
            if (product.id === id && product.category === category) {
                filteredProduct = product
            }
        });
        if (filteredProduct) {
            res.json({
                data: filteredProduct
            })
            res.status(200);
        } else {
            res.send({data: 'Not found'});
            res.status(404);
        }
    }
    getProducts(req, res) {
        if (data) {
            res.json({products: data.products});
            res.status(200);
        } else {
            res.send({data: 'Not found'});
            res.status(404);
        }
    }
    addProduct(req, res) {
        let isExist;
        data.products.forEach(product => {
            if (product.id === +req.body.id) {
                isExist = true;
            }
        })
        if (isExist) {
            res.send({data: 'Already Exist'});
            res.status(200);
        } else {
            data.products.push(req.body);
            res.json(req.body);
            res.status(200);
        }
    }
    updateProduct(req, res) {
        let isExist;
        data.products.forEach((product, index) => {
            if (product.id === +req.body.id) {
                isExist = true;
                product.name = req.body.name;
                if (req.body.specifications) {
                    product.specifications = req.body.specifications;
                }
                product.imgSrc = req.body.imgSrc;
                product.price = req.body.price;
                product.category = req.body.category;
            }
        })
        if (isExist) {
            res.send({data: 'Updated successfully'});
            res.status(200);
        } else {
            res.json({data: 'Product not found'});
            res.status(404);
        }
    }
    deleteProduct() {

    }
}

module.exports = new ProductCtrl();


