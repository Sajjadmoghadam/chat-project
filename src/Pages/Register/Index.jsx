import { Stack } from "@mui/material";
import React from "react";
import Otp from "../../Components/Otp";
import Register from "../../Components/register";

const RegisterPage = ({userExist}) => {
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack>
          <Stack>
            {userExist?.userExist? <Otp /> : <Register/>}

          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default RegisterPage;
