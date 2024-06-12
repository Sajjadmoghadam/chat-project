import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useForm } from "react-hook-form";

export default function SettingCard({close}) {
  const { handleSubmit, register } = useForm();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const inputRef = useRef(null);
  const [img, setImg] = useState(userData.profilePhoto.at(-1));
// console.log(userData.profilePhoto)
  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const updateUser = async (data) => {
    try {
      let response;
      if (img) {
        const formData = new FormData();
        formData.append("file", img);
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
  
        response = await fetch(process.env.REACT_APP_BASE_URL + "/api/v1/user", {
          method: "PATCH",
          headers: {
            authorization: "bearer " + token,
          },
          body: formData,
        });
      } else {
        // Send JSON data if there's no image
        response = await fetch(process.env.REACT_APP_BASE_URL + "/api/v1/user", {
          method: "PATCH",
          headers: {
            authorization: "bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: data.fullName,
            userName: data.username,
            bio: data.bio,
          }),
        });
      }
  
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
  
      const updatedUser = await response.json();
  
      // Remove old userData and save the new one
      localStorage.removeItem("userData");
      localStorage.setItem("userData", JSON.stringify(updatedUser.user));
  
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };
  

  return (
    <>
      <Stack>
        <Stack alignSelf={"end"}>
          <ClearIcon onClick={()=>{close()}}/>
        </Stack>
        <FormControl
          component="form"
          onSubmit={handleSubmit(updateUser)}
          sx={{
            display: "flex",
            mt: 2,
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              height: "70px",
              width: "70px",
              borderRadius: "50%",
              bgcolor: "#39a5db",
            }}
          >
            {img && img instanceof File ? (
              <img
                src={URL.createObjectURL(img)}
                alt="Preview"
                style={{
                  height: "70px",
                  width: "70px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Avatar
                onClick={handleClick}
                sx={{ width: 70, height: 70 }}
                alt="Remy Sharp"
                src={process.env.REACT_APP_BASE_URL+img}
              />
            )}
            <Input
              inputRef={inputRef}
              sx={{
                display: "none",
              }}
              type="file"
              onChange={handleImageChange}
            />
          </Stack>

          <Typography sx={{ color: "black", fontWeight: "bold" }}>
            {userData.fullName}
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            variant="standard"
            placeholder="Bio"
            label="Bio"
            defaultValue={userData.bio || ""}
            {...register("bio")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            defaultValue={userData.fullName}
            {...register("fullName")}
          />
          <TextField
            type="number"
            sx={{ width: "100%" }}
            label="Phone number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            defaultValue={userData.phone}
            {...register("phone")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            defaultValue={userData.username || "@amirreza"}
            {...register("username")}
          />
          <Button type="submit" sx={{ width: "100%" }} variant="contained">
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "red",
              color: "#fff",
              "&:hover": { backgroundColor: "red" },
            }}
            onClick={logOut}
          >
            Log out
          </Button>
        </FormControl>
      </Stack>
    </>
  );
}
