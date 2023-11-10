import { useContext, useEffect } from "react";
import { UserContext } from "./context/Context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import the correct routing components
import axios from "axios";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer";
import AskQuestion from "./pages/AskQueation/AskQueation";
import AnswerQuestion from "./pages/Answer/AnswerQuestion";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    // Check if a token already exists in local storage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", ""); // Set an empty auth token in local storage
      token = "";
    } else {
      try {
        const userRes = await axios.get("http://localhost:4000/api/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (error) {
        // Handle errors here, e.g., invalid token or network issues
        console.error("Error checking user login:", error);
        // You might want to log the user out or display an error message to the user.
      }
    }
  };

  const logout = () => {
    try {
      // Use setUserData to update the state
      setUserData({
        token: undefined,
        user: undefined,
      });
      // Other logout logic
      localStorage.setItem("auth-token", "");
    } catch (error) {
      // Handle the error here
      console.error("Error while logging out:", error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <Nav logout={logout} />

      <Routes>
        {/* Define your routes here */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        {/* passing logout function as props to Home page */}
        <Route path="/" element={<Home logout={logout} />} />

        <Route path="/askquestion" element={<AskQuestion />} />
        <Route path="/Answer/:questionId" element={<AnswerQuestion logout={logout} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
