const joi = require('joi');

module.exports.listingschema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().positive().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        image: joi.string().allow("", null),
    }).required()
}).required();



module.exports.reviewschema = joi.object({
    review: joi.object({
        rating: joi.number().min(1).max(5).required(),
        comment: joi.string().required(),
    }).optional()
});





// module.exports.reviewschema=joi.object({

// review:joi.object({
//     rating:joi.number().min(1).max(5).required(),
//     comment:joi.string().required(),
// }).required()
// });




