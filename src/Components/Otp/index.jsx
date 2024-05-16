import {
    Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";

export default function Otp() {
    const[otp,setOtp]=useState()
  const { register, handleSubmit, getValues } = useForm();
  return (
    <>
      <Stack width={"400px"}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <img src="assets/images/logo.svg" alt="" className="logo" />
          <Typography fontSize={"2rem"} fontWeight={"bold"} gutterBottom>
            +98 9158907483
          </Typography>
          <Typography fontSize={"1rem"} mb={8} textAlign={"center"}>
            We've sent the code to the <span style={{fontWeight:'bold'}}>Telegram</span> on your other device </Typography>
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
              ),
            }}
          ></TextField>
          <Button variant="contained"  sx={{padding:'20px', marginTop:'20px',borderRadius: "16px"}}>Otp Check</Button>
        </Stack>
      </Stack>{" "}
    </>
  );
}
