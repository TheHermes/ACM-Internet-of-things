/**
 * Created by iman on 9/7/16.
 */

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
    must_humidity: {
        type: Number
    },
    frequency : {
        type: Number
    },
    last_updated : {
        type: Date
    }
    
});

var model_name = 'goldoons'
var model = mongoose.model('Goldoon', GoldoonSchema);

module.exports = {
    schema: GoldoonSchema,
    model: model,
    model_name: model_name
};
