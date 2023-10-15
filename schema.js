const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(), // Change 'descriptions' to 'description'
        price: joi.number().required().min(0), // Change 'string' to 'number'
        country: joi.string().required(),
        location: joi.string().required(),
        image: joi.string().allow("", null),
    }).required(),
});
