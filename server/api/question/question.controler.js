const pool = require("../../config/database");
const { createQuestion, getAllQuestions}= require('./question.service')

module.exports = {
    createQuestion: (req, res) => {
      const { question, question_description } = req.body;
      // console.log("question title ", title);
      // console.log(" question description ", description);
  
      if (!question)
        return res
          .status(400)
          .json({ msg: "Please provide a title for your question." });
  
      createQuestion(req.body, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ msg: "Error adding the question: database connection err" });
        }
        return res.status(200).json({
          msg: "New question is created successfully",
          data: results,
        });
      });
    },
    getQuestions: (req, res) => {
      getAllQuestions((err, results) => {
        if (err) {
          console.log("get Questions: ", err);
          return res.status(500).json({ msg: "Database connection error." });
        }
        return res.status(200).json({ data: results });
      });
  },
};
