const express = require('express');
const router = express.Router();
const productCtrl = require('../api/products.Ctrl');
const data = require('../data');
const dbProductCtrl = require('../api/dbProducts.Ctrl');
const productsByAsyncAwait = require('../api/productsByAsyncAwait.Ctrl');
const jwtAuthentication = require('../middleware');
// router.get('/:id', productCtrl.getProductById);
// router.get('/productById', productCtrl.getProductById);
// router.get('/products', productCtrl.getProducts);
// router.post('/products', productCtrl.addProduct);
// router.put('/products', productCtrl.updateProduct);

// router.get('/productById', dbProductCtrl.getProductById);
// router.get('/products', dbProductCtrl.getProducts);
// router.get('/productsByCategory', dbProductCtrl.getProductsByCategory);
// router.post('/products', dbProductCtrl.addProduct);
// router.put('/products/:id', dbProductCtrl.updateProduct);
// router.delete('/products/:id', dbProductCtrl.deleteProduct);
// router.get('/productsByPagination/:pageIndex/:pageSize', dbProductCtrl.productsByPagination);

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let filename = Date.now() + '-' + file.originalname;
        req.body.imgSrc = filename;
        cb(null, filename);
    }
})

const upload = multer({storage: storage});


router.get('/productById', jwtAuthentication, productsByAsyncAwait.getProductById);
router.get('/products', jwtAuthentication, productsByAsyncAwait.getProducts);
router.get('/productsByCategory', jwtAuthentication, productsByAsyncAwait.getProductsByCategory);
router.post('/products', jwtAuthentication, upload.single('image'), productsByAsyncAwait.addProduct);
router.put('/products/:id', jwtAuthentication, productsByAsyncAwait.updateProduct);
router.delete('/products/:id', jwtAuthentication, productsByAsyncAwait.deleteProduct);
router.get('/productsByPagination/:pageIndex/:pageSize', jwtAuthentication, productsByAsyncAwait.productsByPagination);
module.exports = router;