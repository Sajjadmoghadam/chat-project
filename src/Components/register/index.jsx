import {
    Box,
    Button,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
  } from "@mui/material";
  import { Stack } from "@mui/system";
  import React from "react";
  import { useForm } from "react-hook-form";
  import CameraAltIcon from "@mui/icons-material/CameraAlt";
  export default function Register() {
    const { register, handleSubmit, getValues } = useForm();
    return (
      <Stack
        direction={"column"}
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack width={"400px"} gap={3}>
          <Stack direction={'row'} justifyContent={"space-between"} alignItems={"center"} >
  
            <Stack direction={'column'} spacing={2} width={'60%'}>
              <Typography  variant="h6" sx={{ color: "#000" }}>
                Your Info
              </Typography>
              <Typography variant="" sx={{ color: "gray" }}>
                Please code and enter your name and upload a photo.
              </Typography>
            </Stack>
  
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
              <CameraAltIcon sx={{ color: "#fff", fontSize: "2.5rem" }} />
            </Stack>
  
          </Stack>
          <Stack direction={'column'} gap={2}>
          <TextField {...register("code")} InputProps={{ sx: { borderRadius: "16px"  }  }} id="standard-basic" label="code" variant="outlined"  />
          <TextField {...register("firstName")} InputProps={{ sx: { borderRadius: "16px"  }  }} InputLabelProps={{style:{fontSize:'.9rem'}}} id="standard-basic" label="First Name" variant="outlined" />
          <TextField {...register("lastName")} InputProps={{ sx: { borderRadius: "16px"  }  }} InputLabelProps={{style:{fontSize:'.9rem'}}} id="standard-basic" label="Last Name" variant="outlined" />
          </Stack>
          <Button  variant="contained" sx={{bgcolor:'#39a5db',padding:' 10px 0',mt:'10px',borderRadius:'16px'}}>
              SIGN UP
          </Button>
        </Stack>
      </Stack>
    );
  }