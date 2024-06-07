import {
  Avatar,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
export default function SettingCard() {
  return (
    <>
      <Stack>
        <Stack alignSelf={"end"}>
          <ClearIcon />
        </Stack>
        <Stack mt={2} alignItems={"center"} justifyContent={"center"} gap={2}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            Amirreza Mirshafiee
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            variant="standard"
            placeholder="Bio"
            label="Bio"
          />
          <TextField
            sx={{ width: "100%" }}
            id="input-with-icon-textfield"
            label="Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={"Amirreza Mirshafiee"}
          />

          <TextField
            sx={{ width: "100%" }}
            id="input-with-icon-textfield"
            label="phone number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={" 09158907483"}
          />
          <TextField
            sx={{ width: "100%" }}
            id="input-with-icon-textfield"
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={"@amirreza"}
          />
          <Button sx={{ width: "100%" }} variant="contained">
            Save
          </Button>
          <Button variant="contained" sx={{ width: "100%", backgroundColor:"red" ,color:"#fff","&:hover":{backgroundColor:"red"}}} >
            Log out
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
