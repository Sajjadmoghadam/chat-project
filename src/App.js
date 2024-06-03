import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/Login/Index";
import ChatPage from "./Pages/ChatPage/Index";
import RegisterPage from "./Pages/Register/Index";
import auth from "./utils/auth";
import { CssBaseline } from "@mui/material";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userExist, setUserExist] = useState(false);
  const [phone, setPhone] = useState("");

  const handlePhone = (ph) => {
    setPhone(ph);
  };
  const handleToken = (tr) => {
    setToken(tr);
  };
  const navigate = useNavigate();
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
        console.log(data);
        setUserExist(data.userExist);
        navigate("/otp-register");
      });
  };

  return (
    <>
      <auth.Provider value={{ phone, handlePhone, token, handleToken }}>
        <CssBaseline/>
        <Routes>
          <Route
            path="/"
            exact
            element={token ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!token ? <LoginPage login={login} /> : <Navigate to="/" />}
          />

          <Route
            path="/otp-register"
            element={
              !token ? (
                <RegisterPage userExist={userExist} />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
        </Routes>
      </auth.Provider>
    </>
  );
};

export default App;
