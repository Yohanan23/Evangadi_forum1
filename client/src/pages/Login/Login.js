import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";

const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send user data to the database to log in
      const loginRes = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // Update global state with the response from the backend user-info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.log("Problem:", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen md:inline-flex lg:inline-flex items-center justify-center w-full p-12 landing">
        <div className="bg-white p-6 rounded-md md:shadow-2xl w-96 md:w-[400px] md:h-[360px]">
          <h1 className=" text-2xl font-semibold mb-4">
            Login to your account
          </h1>
          <p className="text-sm text-gray-800 mb-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 ">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none"
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-orange-400 focus:outline-none"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-sm">
            <Link to="/signup" className="text-orange-500">
              Create a new account
            </Link>
          </p>
        </div>
        <div className="  p-6 md:ms-16 w-96  md:w-[400px] md:h-[360px] relative">
          <p className=" text-orange-400">About</p>
          <p className="text-[30px] font-medium">Evangadi Networks</p>
          <p className="text-sm">
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>{" "}
          <br />
          <p className="text-sm">
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
