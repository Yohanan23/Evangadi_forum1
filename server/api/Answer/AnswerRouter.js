const router = require("express").Router();

const { createAnswer, readAnswers } = require("./AnswerControler");

router.post("/", createAnswer);
router.get("/:questionId", readAnswers);

module.exports = router;
