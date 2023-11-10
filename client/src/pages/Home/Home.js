import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import QuestionsList from "../AskQueation/QuestionList";
import { MdArrowForwardIos } from "react-icons/md";

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [page, setPage] = useState("Home");
  const [allQuestions, setAllQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");
    // console.log("Home useEffect: 0");
    const fetchQuestions = async () => {

      let questions = await axios.get(
        "http://localhost:4000/api/questions/all"
      );
        questions = questions.data.data;

      // console.log("Fetched questions:", questions);
      setAllQuestions(() => {
        return questions;
      });
    };
    fetchQuestions();
  }, [userData.user, navigate]);
  console.log(allQuestions);

  return (
    <>
      <div className="bg-gray-100 pt-4">
        {/* Show username in homepage */}
        <div className="bg-white">
          <div className="flex justify-between items-center pt-4 pe-16 ps-[100px]">
            <button
              onClick={() => navigate("/AskQuestion")}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-orange-400 ms-4 text-sm flex relative text-center "
            >
              Ask Question
            </button>
            <h4 className="text-xl font-medium">
              Welcome: {userData.user?.display_name}
            </h4>
          </div>

          <h3 className="text-xl font-medium ps-28 pt-4 ">Questions</h3>
         
          <div className="mt-4 divide-y-4 divide-slate-400/[.24] divide-gray-800">
            {allQuestions?.map((question) => (
              <div key={question.question_id} className="mb-4">
                <Link
                  to={`/Answer/${question.question_id}`}
                  state={{
                    question: question,
                    currentUserId: userData.user?.id,
                  }}
                  className="text-gray-500 hover:underline"
                >
                  {/* <div>
                  {question.question}
                </div> */}
                  <div className="ps-28">
                    <QuestionsList show={question} />
                  </div>

                  <MdArrowForwardIos className="MdArrowForwardIos relative ms-[400px] md:ms-[800px] lg:ms-[1100px] bottom-4" />

                  {/* You can add an icon here using a suitable icon library */}
                </Link>
              </div>
            ))}
          </div>
          {allQuestions.length < 3 && <div className="mt-4" />}
          {/* Logout when the button clicked in which the function comes from app.js */}
        </div>
      </div>
    </>
  );
};

export default Home;
