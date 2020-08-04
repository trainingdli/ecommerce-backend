const productModel = require('../models/product.model');
class ProductService {
    getById(id) {
        return productModel.findById(id, {__v: 0})
        .exec();
    }
    getAllProducts() {
        return productModel.find({}, {__v: 0})
        .exec();
    }
    getProductsByCategory(category) {
        return productModel.find({category}, {__v: 0})
        .exec();
    }
    addProduct(data) {
        const product = new productModel(data);
        return product.save();
    }
    updateProduct(id, data) {
        return productModel.findByIdAndUpdate(id, {
            $set: {
                price: data.price,
                imgSrc: data.imgSrc,
                specifications: data.specifications,
                inStock: data.inStock,
                category: data.category
            }, 
        }, {upsert: true})
            .exec();
    }
    deleteProduct(id) {
        return productModel.findByIdAndRemove(id).exec();
    }
    getCount() {
        return productModel.count()
        .exec();
    }
    getProductForPagination(pageIndex, pageSize, direction, property) {
        direction = direction === 'asc' ? '': '-';
        return productModel.find()
        .skip(pageIndex * pageSize)
        .sort(direction + property) // propertyName: ascending -propertyName : descending
        .limit(pageSize)
        .exec()
    }
}

module.exports = new ProductService();

// lastUpdatedOn - For ascending order
// -lastUpdatedOn - For descending order