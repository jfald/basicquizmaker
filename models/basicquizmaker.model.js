var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var BasicQuizMakerSchema = new mongoose.Schema({
    question : String,
    answers : String,
    correct : String,
    section : String, 
    status: String
})

BasicQuizMakerSchema.plugin(mongoosePaginate)
const BasicQuizMaker = mongoose.model('BasicQuizMaker', BasicQuizMakerSchema)

module.exports = BasicQuizMaker;
