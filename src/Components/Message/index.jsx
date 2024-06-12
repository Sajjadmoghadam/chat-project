import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Index = ({ message, date, userName, img, video, userId }) => {
  // const isMobile = useMediaQuery()
  return (
   <Stack width={"100%"} sx={{alignItems:userId===JSON.parse(localStorage.getItem("userData"))._id?"end":"Start"}}>
     <Stack
      direction={"column"}
      bgcolor={"#fff"}
      sx={{
        
        direction: "rtl",
        color: "#000",
        width: "60%",
        borderRadius: "5px",
        margin: "2px 10px"
      }}
      p={1}
      
    >
      <Typography
        sx={{ direction: "ltr", fontWeight: "550" }}
        px={2}
        color={"#3288c2"}
      >
        {userName}
      </Typography>
      {img && <img src="" style={""} />}
      {video && <video src="" style={""}></video>}
      <Typography p={1} sx={{direction:"ltr"}}>{message}</Typography>
      <Typography color={"GrayText"} fontSize={".8em"}>
        {date}
      </Typography>
    </Stack>
   </Stack>
  );
};

export default Index;
