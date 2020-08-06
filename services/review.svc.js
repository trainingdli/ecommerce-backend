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
    getAvgRating(id) {
        return reviewModel.aggregate([
            {$match: {productId: id}},
            {$group: {_id: '$productId', avgRating: {$avg: '$rating'}}},
            {$project: {_id: 0}}
        ]).exec();
    }
    getCountByRating(id) {
        return reviewModel.aggregate([
            {$match: {productId: id}},
            {$group: {_id: '$rating', count: {$sum: 1}}},
            {$project: {
               rating: '$_id',
               _id: 0,
                count: '$count'
            }}
        ]).exec();
    }
}

module.exports = new ReviewService();