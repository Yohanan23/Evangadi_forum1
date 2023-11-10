import React from "react";

import { MdAccountCircle } from "react-icons/md";

function QuestionsList({ show }) {
  return (
    <div className="flex ">
      <div className="text-sm font-medium">
        <MdAccountCircle style={{ fontSize: 58 }} className="MdAccountCircle" />
        <span className="ms-3">{show?.user_name}</span>
      </div>
      <div>
        <p className=" relative text-sm ms-12 top-6">
          {show?.question || show?.answer_text ||
            "['the question/answer goes here]'?"}
        </p>
      </div>
    </div>
  );
}

export default QuestionsList;
