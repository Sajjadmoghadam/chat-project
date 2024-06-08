import {
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const { phone,handleToken } = useContext(auth);
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const HandleOtp=()=>{
    fetch(process.env.REACT_APP_BASE_URL +"/api/v1/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        code: getValues("otp")
      })
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("userData", JSON.stringify(data?.user));
        handleToken(data?.token)
        if (data?.token) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Stack width={"400px"}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <img src="assets/images/logo.svg" alt="" className="logo" />
          <Typography fontSize={"2rem"} fontWeight={"bold"} gutterBottom>
            {phone}
          </Typography>
          <Typography fontSize={"1rem"} mb={8} textAlign={"center"}>
            We've sent the code to the{" "}
            <span style={{ fontWeight: "bold" }}>Telegram</span> on your other
            device{" "}
          </Typography>
        </Stack>
        <Stack>
          <TextField
            {...register("otp", { required: true })}
            label={"Code"}
            InputProps={{
              sx: { borderRadius: "16px" },
              startAdornment: (
                <InputAdornment position="start">
                  {getValues("countryCode")}
                </InputAdornment>
              )
            }}
          ></TextField>
          <Button
          onClick={handleSubmit(HandleOtp)}
            variant="contained"
            sx={{ padding: "20px", marginTop: "20px", borderRadius: "16px" }}
          >
            Otp Check
          </Button>
        </Stack>
      </Stack>{" "}
    </>
  );
}
