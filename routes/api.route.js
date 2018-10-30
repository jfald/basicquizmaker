var express = require('express')

var router = express.Router()
var questions = require('./api/basicquizmaker.route')

router.use('/questions', questions);

module.exports = router;
