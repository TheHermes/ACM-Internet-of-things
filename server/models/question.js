/**
 * question
 */

var mongoose = require ('mongoose');

var questionSchema = mongoose.Schema({
	text: String,
    answer: [String],
    response: [Number],
});

model_name = 'questions'
model = new questionSchema('questions', questionSchema);

module.exports = {
    schema: questionSchema,
    model: model,
    model_name: model_name
};