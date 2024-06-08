import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import auth from "../../utils/auth";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { phone ,handleToken} = useContext(auth);
  const [img, setImg] = useState();
  const { register, handleSubmit, getValues, control } = useForm();
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
const navigate = useNavigate()
  const handleRegister = (data) => {
    const body = new FormData();
    body.append("file", img);
    body.append("code", data.code);
    body.append("fullName", data.firstName + " " + data.lastName);
    body.append("phone", phone);
    console.log(data);
    fetch(process.env.REACT_APP_BASE_URL +"/api/v1/auth/register", {
      method: "POST",
      body: body
    }).then(res=>res.json()).then(data=>{
      console.log(data);
      localStorage.setItem("token",data?.token)
      localStorage.setItem("userData", JSON.stringify(data?.user));
      handleToken(data?.token)

      if(data?.token){
        navigate("/")
      }
    }).catch(err=>console.log(err))
  };

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  return (
    <Stack
      direction={"column"}
      width={"100%"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack width={"400px"} gap={3} component={"form"} onSubmit={handleSubmit(handleRegister)}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"column"} spacing={2} width={"60%"}>
            <Typography variant="h6" sx={{ color: "#000" }}>
              Your Info
            </Typography>
            <Typography variant="" sx={{ color: "gray" }}>
              Please enter your code, name and upload a photo.
            </Typography>
          </Stack>

          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              height: "70px",
              width: "70px",
              borderRadius: "50%",
              bgcolor: "#39a5db"
            }}
          >
            <IconButton onClick={handleClick}>
              <CameraAltIcon sx={{ color: "#fff", fontSize: "2.5rem" }} />
            </IconButton>
            <Input
              inputRef={inputRef}
              sx={{
                display: "none"
              }}
              type="file"
              onChange={handleImageChange}
            />
          </Stack>
        </Stack>
        <Stack direction={"column"} gap={2}>
          <TextField
            {...register("code")}
            InputProps={{ sx: { borderRadius: "16px" } }}
            id="standard-basic"
            label="Code"
            variant="outlined"
          />
          <TextField
            {...register("firstName")}
            InputProps={{ sx: { borderRadius: "16px" } }}
            InputLabelProps={{ style: { fontSize: ".9rem" } }}
            id="standard-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField
            {...register("lastName")}
            InputProps={{ sx: { borderRadius: "16px" } }}
            InputLabelProps={{ style: { fontSize: ".9rem" } }}
            id="standard-basic"
            label="Last Name"
            variant="outlined"
          />
        </Stack>
        <Button
          type="submit" // تغییر این به type="submit" برای ارسال فرم
          variant="contained"
          sx={{
            bgcolor: "#39a5db",
            padding: " 10px 0",
            mt: "10px",
            borderRadius: "16px"
          }}
        >
          SIGN UP
        </Button>
      </Stack>
      <DevTool control={control} />
    </Stack>
  );
}
