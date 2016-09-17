/**
 * Created by ardavan on 07/09/16.
 */

var Permission = function () {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var permissionSchema = new Schema({
        userId : Number,
        doorId : Number,
        permissionId: Number,
        startDate : Date,
        endDate : Date,
        isUnlimited : Boolean
    });

    var model_name = 'permissions';
    var model = mongoose.model(model_name, permissionSchema);

    return {
        schema: permissionSchema,
        model: model,
        model_name: model_name
    }

}();

module.exports = Permission;