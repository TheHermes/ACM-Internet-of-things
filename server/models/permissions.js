/**
 * Created by ardavan on 07/09/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var permissionSchema = new Schema({
    userId : Number,
    doorId : Number,
    permissionId: Number,
    startDate : Date,
    endDate : Date,
    isUnlimited : Boolean
})
module.exports = permissionSchema;
