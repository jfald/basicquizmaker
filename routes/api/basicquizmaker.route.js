var express = require('express')
var router = express.Router()

// Getting the BasicQuizMaker Controller
var BasicQuizMakerController = require('../../controllers/basicquizmaker.controller');

//Map each API to the Controller Functions
router.get('/', BasicQuizMakerController.getQuestions)
router.post('/', BasicQuizMakerController.createQuestion)
router.put('/', BasicQuizMakerController.updateQuestion)
router.delete('/:id', BasicQuizMakerController.removeQuestion)

// Export the Router
module.exports = router; 
