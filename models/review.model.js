const mongoose = require('mongoose');

module.exports = mongoose.model('review', {
    rating: {type: Number, required: [true, 'Rating is required']},
    subject: {type: String, required: [true, 'Subject is required']},
    review: {type: String, required: [true, 'Review is required']},
    productId: {type: String},
    lastUpdatedOn: {type: Date, default: Date.now()}
});


