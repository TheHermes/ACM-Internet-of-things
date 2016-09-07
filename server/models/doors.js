/**
 * Created by ardavan on 07/09/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var doorSchema = new Schema({
    ip : String,
    id : Number
});
module.exports = doorSchema;