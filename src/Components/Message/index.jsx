import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const Index = ({ message, date, userName, img, video ,userId}) => {
    // const isMobile = useMediaQuery()
  return (
    <Stack direction={'column'} bgcolor={'#fff'} sx={{direction:'rtl',color:'#000',width:'60%',borderRadius:"5px",margin:'2px 10px'}} p={1} d>
      <Typography sx={{direction:'ltr',fontWeight:'550'}} px={2} color={'#3288c2'}>{userName}</Typography>
      {img && <img src="" style={""} />}
      {video && <video src="" style={""}></video>}
      <Typography p={1}>{message}</Typography>
      <Typography color={"GrayText"} fontSize={'.8em'}>{date}</Typography>
    </Stack>
  );
};

export default Index;
