const reviewModel = require('../models/review.model');

class ReviewService {
    create(data) {
        const review = new reviewModel(data);
        return review.save();
    }
    getReviews(productId) {
        return reviewModel.find({productId}, {__v: 0})
        .exec();
    }
}

module.exports = new ReviewService();