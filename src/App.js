import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Index";
import ChatPage from "./Pages/ChatPage/Index";
import RegisterPage from "./Pages/Register/Index";
import auth from "./utils/auth";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userExist, setUserExist] = useState(false);
  const handleToken = (tr) => {
    setToken(tr);
  };
  const login = ({ phone }) => {
    fetch("http://localhost:5000/api/v1/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ phone })
    })
      .then((res) => res.json())
      .then((data) => {
        setUserExist(data.data);
        window.location.href = "http://localhost:3000/otp-register";
      });
  };

  return (
    <>
      <auth.Provider value={{ token, handleToken }}>
        <Routes>
          <Route
            path="/"
            element={token ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route path="/login" exact element={<LoginPage login={login} />} />
          <Route
            path="/otp-register"
            exact
            element={<RegisterPage userExist={userExist} />}
          />
        </Routes>
      </auth.Provider>
    </>
  );
};

export default App;
