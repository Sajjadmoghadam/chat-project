import { IconButton, Stack, TextField, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const ChatPage = () => {
  return (
    <>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        height={"100vh"}
        bgcolor={"red"}
      >
        <Stack width={"25%"} bgcolor={"#fff"} gap={2}>
          <Stack flexDirection={"row"} p={2}>
            <IconButton >
              <MenuIcon />
            </IconButton>
            <TextField
              size="small"
              fullWidth
              sx={{
                backgroundColor: "#F1F1F1",
                borderRadius: "24px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none"
                  },
                  "&:hover fieldset": {
                    border: "none"
                  },
                  "&.Mui-focused fieldset": {
                    border: "none"
                  }
                }
              }}
            />
          </Stack>
          <Stack></Stack>
        </Stack>
        <Stack width={"75%"}></Stack>
      </Stack>
    </>
  );
};

export default ChatPage;
