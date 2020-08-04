const mongoose = require('mongoose');

module.exports = mongoose.model('product', {
    name: {type: String, required: [true, 'Name is required']},
    imgSrc: {type: String, required: [true, 'Img Src is required']},
    code: { // dddd-dddd-dddd
        type: String,
        required: [
            true, 'Code is required'
        ],
        validate: {
            validator: (value) => {
                return (/\d{4}-\d{4}-\d{4}/.test(value));
            },
            message: (props) => {
                return `${props.value} is not a valid code format.`
            }
        }
    },
    price: {
        type: Number, 
        required: [true, 'Price is required'], 
        min: [5000, 'Minimum price is 5000'], 
        max: [50000, 'Maximum price is 50000']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Mobiles', 'Washing Machines']
    },
    specifications: Array,
    inStock: {
        type: Boolean,
        default: true,
        required: [true, 'Instock is required']
    },
    lastUpdateOn: {type: Date, default: Date.now()}
});


