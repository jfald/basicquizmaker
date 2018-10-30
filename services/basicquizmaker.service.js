// Gettign the Newly created Mongoose Model we just created 
var BasicQuizMaker = require('../models/basicquizmaker.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Questions 
exports.getQuestions = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    try {
        var basicquizmakers = await BasicQuizMaker.paginate(query, options)
        
        // Return the basicquizmakerd list that was retured by the mongoose promise
        return basicquizmakers;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Questions')
    }
}

exports.createQuestion = async function(basicquizmaker){
    // Creating a new Mongoose Object by using the new keyword
    var newQuestion = new BasicQuizMaker({
        question: basicquizmaker.question,
        answers: basicquizmaker.answers,
        correct: basicquizmaker.correct,
        section: basicquizmaker.section,
        status: basicquizmaker.status
    })

    try{
        // Saving the Question 
        var savedQuestion = await newQuestion.save()
        return savedQuestion;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Question")
    }
}

exports.updateQuestion = async function(basicquizmaker){
    var id = basicquizmaker.id

    try{
        //Find the old Question Object by the Id
        var oldQuestion = await BasicQuizMaker.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Question")
    }

    // If no old Question Object exists return false
    if(!oldQuestion){
        return false;
    }

    console.log(oldQuestion)

    //Edit the Question Object
    oldQuestion.question= basicquizmaker.question
    oldQuestion.answers= basicquizmaker.answers
    oldQuestion.correct= basicquizmaker.correct
    oldQuestion.section= basicquizmaker.section
    oldQuestion.status = basicquizmaker.status


    console.log(oldQuestion)
    try{
        var savedQuestion = await oldQuestion.save()
        return savedQuestion;
    }catch(e){
        throw Error("And Error occured while updating the Question");
    }
}

exports.deleteQuestion = async function(id){
    
    // Delete the Question
    try{
        //var deleted = await BasicQuizMaker.deleteOne({_id: id})
        //if(deleted.result.n === 0){
        //    throw Error("Question Could not be deleted")
        //}
        //return deleted
        BasicQuizMaker.deleteOne({_id: id}, function (err, numberRemoved) {
          if (numberRemoved === 0) throw Error("ID was not found.");
          if (err) throw Error(handleError(err));
        });
    }catch(e){
        console.log(e);
        throw Error("Error Occured while Deleting the Question")
    }
}
