const mongoose = require('mongoose');

module.exports = mongoose.model('order', {
    userId: {type: String, required: [true, 'UserId is required']},
    productIds: {type: Array, required: [true, 'ProductIds is required']},
    totalAmount: {type: String},
    lastUpdateOn: {type: Date, default: Date.now()}
});


