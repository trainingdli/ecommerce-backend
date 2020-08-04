const reviewService = require('../services/review.svc');
const getErrors = require('../services/common.svc');
const config = require('../config');

const ReviewController  = {
    create: async(req, res) => {
        try {
            const review = await reviewService.create(req.body);
            if (review) {
                res.status(200);
                res.send({data: review, status: 'Reviewed added'});
            }
        } catch(error) {
            let errors = getErrors(error);
            res.send({errors});
            res.status(500);
        }
    }
}

module.exports = ReviewController;