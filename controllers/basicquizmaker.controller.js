// Accessing the Service that we just created
var QuestionService = require('../services/basicquizmaker.service')

// Saving the context of this module inside the _the variable
_this = this


// Async Controller function to get the Question List
exports.getQuestions = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
        var basicquizmakers = await QuestionService.getQuestions({}, page, limit)
        
        // Return the basicquizmakers list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: basicquizmakers, message: "Successfully Retrieved Questions"});
        
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createQuestion = async function(req, res, next){
    // Req.Body contains the form submit values.
    var basicquizmaker = {
        question: req.body.question,
        answers: req.body.answers,
        correct: req.body.correct,
        section: req.body.section,
        status: req.body.status
    }

    try{
        // Calling the Service function with the new object from the Request Body
        var createdQuestion = await QuestionService.createQuestion(basicquizmaker)
        return res.status(201).json({status: 201, data: createdQuestion, message: "Successfully Created Question"})
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Question Creation was Unsuccesfull"})
    }
}

exports.updateQuestion = async function(req, res, next){
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    console.log(req.body)

    var basicquizmaker = {
        id,
        question: req.body.question ? req.body.question : null,
        answers: req.body.answers ? req.body.answers : null,
        correct: req.body.correct ? req.body.correct : null,
        section: req.body.section ? req.body.section : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedQuestion = await QuestionService.updateQuestion(basicquizmaker)
        return res.status(200).json({status: 200, data: updatedQuestion, message: "Successfully Updated Question"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeQuestion = async function(req, res, next){
    var id = req.params.id;

    try{
        var deleted = await QuestionService.deleteQuestion(id)
        return res.status(204).json({status:204, message: "Successfully Deleted Question"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
