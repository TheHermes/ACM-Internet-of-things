/**
 * question
 */

var mongoose = require ('mongoose');

var questionSchema = mongoose.Schema({
	text: String,
    answer: [String],
    response: [Number],
});

// Question = new questionSchema('question', questionSchema);

module.exports = questionSchema;