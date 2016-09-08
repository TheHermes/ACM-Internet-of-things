var mongoose = require('mongoose');

var GoldoonSchema = mongoose.Schema({
    id: {
        type: Number
    },
    ip : {
        type: String
    },
    humidity: {
        type: Number
    },
    least_humidity: {
        type: Number
    },
    frequency : {
        type: Number
    },
    last_updated : {
        type: Date
    }

});


module.exports = GoldoonSchema;
