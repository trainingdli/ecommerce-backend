const express = require('express');
const data = require('../data');
const productService = require('../services/product.svc');
const reviewService = require('../services/review.svc');
const getErrors = require('../services/common.svc');
const config = require('../config');
const { json } = require('body-parser');

const ProductCtrl = {
    getProductById: async(req, res) => {
        try {
            const id = req.query.id;
            const product = await productService.getById(id);
            if (product) {
                const avgRating = await reviewService.getAvgRating(id);
                const countByRatings = await reviewService.getCountByRating(id);
                const reviews = await reviewService.getReviews(id);
                const jsonProduct = product.toJSON();
                jsonProduct.imgSrc = `${config.serverUrl}/${jsonProduct.imgSrc}`;
                jsonProduct.reviews = reviews;
                jsonProduct.averageRating = avgRating[0].avgRating;
                jsonProduct.countByRatings = countByRatings;
                res.json({data: jsonProduct})
                res.status(200);
            } else {
                res.send({data: 'Not found'});
                res.status(404);
            }
        } catch(error) {
            console.log(error);
            res.send(error);
            res.status(500);
        }
    },
    getProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            products.forEach(product => {
                product.imgSrc = `${config.serverUrl}/${product.imgSrc}`;
            })
            if (products) {
                res.json({products});
                res.status(200);
            } else {
                res.json({products});
                res.status(404);  
            }
        } catch(error) {
            res.send(error);
            res.status(500);
        }
    },
    getProductsByCategory: async(req, res) => {
        try {
            const category = req.query.category;
            const products = await productService.getProductsByCategory(category);
            if (products) {
                res.json({products});
                res.status(200);
            } else {
                res.json({products});
                res.status(404);  
            }
        } catch(error) {
            res.send(error);
            res.status(500);
        }
    },
    addProduct: async (req, res) => {
        try {
            const savedProduct = await productService.addProduct(req.body);
            if (savedProduct) {
                res.json(savedProduct);
                res.status(200);
            }
        } catch(error) {
            let errors = getErrors(error);
            res.send({errors});
            res.status(500);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productService.updateProduct(id, req.body);
            if (product) {
                res.status(200);
                res.send({status: 'Updated successfully', data: product});
            } else {
                res.json({data: 'Product not found'});
                res.status(404);  
            }
        }catch(error) {
            res.status(500);
            res.send(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productService.deleteProduct(id);
            if (product) {
                res.status(200);
                res.send({status: 'deleted successfully'});
            }
        } catch(error) {
            res.status(500);
            res.send(error);
        }
    },
    productsByPagination: async (req, res) => {
        try {
            const pageIndex = +req.params.pageIndex;
            const pageSize = +req.params.pageSize;
            const direction = req.query.direction;
            const propertyName = req.query.propertyName;
            const cnt = await productService.getCount();
            if (cnt) {
                let totalPages = Math.ceil(cnt/pageSize);
                let metaData = {
                    count: cnt,
                    totalPages,
                    currentPage: (pageIndex + 1),
                    hasPrevious: pageIndex > 0,
                    hasNext: pageIndex < totalPages - 1
                }
                const products = await productService.getProductForPagination(pageIndex, pageSize, direction, propertyName);
                if (products) {
                    const response = {metaData, products};
                    res.status(200);
                    res.send(response);
                }
            }

        } catch(error) {
            res.status(500);
            res.send(error);
        }
    }
}

module.exports = ProductCtrl;


// Introduction to Mongoose for MongoDB. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. 
// It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.


// Promises


// function a() {
//     return new Promise((resolve, reject) => {
//         resolve()
//         reject()
//     })
// }

// then(response)
// Pagination:

// 50 - Products
// 1       2       3       4       5
// 0/10    1/10    2/10    3/10    4/10
// pageSize - 10
// pageIndex - 0 - 4

// index = 0;
// (index + 1)

// 50 records => 50/10 - (totalRecords/PageSize)   5 - Pages

// index.js -> product router -> controller -> service -> model -> database


// const obj = {
//     a: () => {

//     }
// }

// class product() {
//     async get(): any {
//         await
//     }
// }