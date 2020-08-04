const express = require('express'); // Common JS Pattern
var cors = require('cors'); // Cross origin resource sharing
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const formData = require('express-form-data');

const config = require('./config');
const data = require('./data');
var bodyParser = require('body-parser');
const defaultRouter = require('./routes/default.router');
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const reviewRouter = require('./routes/review.router');
var corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (config.whiteListUrls.indexOf(origin) !== -1) {
            callback(null, true);
            
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: 'accept, content-type, authorization'
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Welcome to dl ecommerce backend app');
});
app.use('/', defaultRouter);
app.use('/user', userRouter);
app.use('/', productRouter);
app.use('/review', reviewRouter);
// http://localhost:3000/user/register
// app.get('/healthcheck', function(req, res) {
//     res.send({
//         health: 'E-Kart is runing successfully'
//     })
//     res.status(200);
// })

// app.get('/products', function(req, res) {
//     const products = data.products;
//     res.json(products);
//     res.status(200);
// })


// 1xx - Informational
// 2xx - Success
// 3xx - Redirection
// 4xx - Client Error
// 5xx - Server error

// GET - Read
// POST - Create
// PUT - Update
// DELETE - Delete

// var mongoDB = 'mongodb://localhost:27017/ecommerce';
var mongoDB = 'mongodb://admin:admin123@ds039860.mlab.com:39860/ecommerce';
mongoose.connect(mongoDB, { useNewUrlParser: true }, (error, response) => {
    if (error) {
        console.log(error);
    } else {    
        console.log(`db is runing on port ${response.port}`);
    }
});

const portNo = process.env.port || config.portNo
app.listen(portNo, function() {
    console.log(`EKart is runing on ${config.portNo}`)
})
