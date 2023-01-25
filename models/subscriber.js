const mongoose = require('mongoose')

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribedToChannel: {
        type: String,
        required: true,
    },
    subscribeData: {
        type: Date,
        required: true,
        default: Date.now() 
    }
})


// The mongoose. model() function of the mongoose module is used to create a collection of a particular database of MongoDB
module.exports = mongoose.model('Subscriber', subscriberSchema)