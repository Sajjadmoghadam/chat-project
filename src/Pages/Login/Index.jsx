import { Stack } from "@mui/material";
import React from "react";
import Login from "../../Components/Login/Index";

const LoginRegister = () => {
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
            <Login/>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default LoginRegister;
