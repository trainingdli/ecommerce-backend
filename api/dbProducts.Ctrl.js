const express = require('express');
const data = require('../data');
const productModel = require('../models/product.model');

class ProductCtrl {
    getProductById(req, res) {
        // const id = +req.params.id;
        const id = req.query.id;
        const category = req.query.category;
        // productModel.findById(id, (err, product) => {
        //     if (product) {
        //         res.json({
        //             data: product
        //         })
        //         res.status(200);
        //     } else {
        //         res.send({data: 'Not found'});
        //         res.status(404);
        //     }
        // })
        productModel.findById(id)
            .exec()
            .then( (product) => {
                if (product) {
                    res.json({data: product})
                    res.status(200);
                } else {
                    res.send({data: 'Not found'});
                    res.status(404);
                }
            })
            .catch((error) => {
                res.send(error);
                res.status(500);
            })
    }
    getProducts(req, res) {
        // productModel.find({}, (err, products) => {
        //     if (products) {
        //         res.json({products});
        //         res.status(200);
        //     } else {
        //         res.send({data: 'Not found'});
        //         res.status(404);
        //     }
        // })
        productModel.find({})
            .exec()
            .then((products) => {
                if (products) {
                    res.json({products});
                    res.status(200);
                } else {
                    res.json({products});
                    res.status(404);  
                }
            }).catch((error) => {
                res.send(error);
                res.status(500);
            })
        
    }
    getProductsByCategory(req, res) {
        const category = req.query.category;
        // productModel.find({category}, (err, products) => {
        //     if (products) {
        //         res.json({products});
        //         res.status(200);
        //     } else {
        //         res.send({data: 'Not found'});
        //         res.status(404);
        //     }
        // })   
        productModel.find({category})
            .exec()
            .then((products) => {
                if (products) {
                    res.json({products});
                    res.status(200);
                } else {
                    res.json({products});
                    res.status(404);  
                }
            }).catch((error) => {
                res.send(error);
                res.status(500);
            })
    }
    addProduct(req, res) {
        const product = new productModel(req.body);
        // product.save((err, savedProduct) => {
        //     if (err) {
        //         res.status(500).send('Internal Server Error');
        //     } else {
        //         res.json(savedProduct);
        //         res.status(200);
        //     }
        // })
        product.save()
            .then((savedProduct) => {
                res.json(savedProduct);
                res.status(200);
            }).catch((error) => {
                res.send(error);
                res.status(500);
            })
        // let isExist;
        // data.products.forEach(product => {
        //     if (product.id === +req.body.id) {
        //         isExist = true;
        //     }
        // })
        // if (isExist) {
        //     res.send({data: 'Already Exist'});
        //     res.status(200);
        // } else {
        //     data.products.push(req.body);
        //     res.json(req.body);
        //     res.status(200);
        // }
    }
    updateProduct(req, res) {
        const id = req.params.id;
        // productModel.findByIdAndUpdate(id, {
        //     $set: {
        //         price: req.body.price,
        //         imgSrc: req.body.imgSrc,
        //         specifications: req.body.specifications,
        //         inStock: req.body.inStock,
        //         category: req.body.category
        //     }, 
        // }, {upsert: true}, (err, product) => {
        //     if (err) {
        //         res.status(200);
        //         res.send(error);
        //     } else {
        //         res.status(200);
        //         res.send({status: 'Updated successfully', data: product});
        //     }
        // })
        productModel.findByIdAndUpdate(id, {
            $set: {
                price: req.body.price,
                imgSrc: req.body.imgSrc,
                specifications: req.body.specifications,
                inStock: req.body.inStock,
                category: req.body.category
            }, 
        }, {upsert: true})
            .exec()
            .then((product) => {
                res.status(200);
                res.send({status: 'Updated successfully', data: product});
            }).catch(error => {
                res.status(500);
                res.send(error);
            })
    }
    deleteProduct(req, res) {
        const id = req.params.id;
        productModel.findByIdAndRemove(id, (err, product) => {
            if (err) {
                res.status(500);
                res.send(error);
            } else {
                res.status(200);
                res.send({status: 'deleted successfully'});
            }
        })
        productModel.findByIdAndRemove(id)
            .exec()
            .then(product => {
                res.status(200);
                res.send({status: 'deleted successfully'});
            }).catch(errro => {
                res.status(500);
                res.send(error);
            })
    }
    productsByPagination(req, res) {
        const pageIndex = +req.params.pageIndex;
        const pageSize = +req.params.pageSize;
        productModel.count()
            .exec()
            .then(cnt => {
                let totalPages = Math.ceil(cnt/pageSize);
                let metaData = {
                    count: cnt,
                    totalPages,
                    currentPage: (pageIndex + 1),
                    hasPrevious: pageIndex > 0,
                    hasNext: pageIndex < totalPages - 1
                }
                productModel.find()
                    .skip(pageIndex * pageSize) // 0 * 10 - 0 // 1 * 10 - 10
                    .limit(pageSize)
                    .exec()
                    .then(products => {
                        const response = {
                            metaData,
                            products
                        }
                        res.status(200);
                        res.send(response);
                    })
                    .catch(error => {
                        res.status(500);
                        res.send(error);
                    })
            })
    }
}

module.exports = new ProductCtrl();


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