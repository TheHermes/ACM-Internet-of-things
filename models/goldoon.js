/**
 * Created by iman on 9/7/16.
 */

var mongoose = require('mongoose');

var GoldoonSchema = mongoose.Schema({
    id: {
        type: Number
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


var Goldoon = mongoose.model('lamp', LampSchema);

module.exports = Goldoon;
