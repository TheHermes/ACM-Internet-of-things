var Door = function(){

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var schema = new Schema({
        ip : String,
        id : Number
    });
    var model_name = 'doors';
    var _model = mongoose.model(model_name, schema);

    return {
        schema : schema,
        model : _model,
        model_name : model_name
    }

}();

module.exports = Door;