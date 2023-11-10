const router = require("express").Router();


const {
  createQuestion,
  // getAllQuestions,
  getQuestions,
} = require("./question.controler");

router.post("/", createQuestion);
router.get("/all", getQuestions);
// router.get("/", getQuestionDetails);




module.exports = router;





