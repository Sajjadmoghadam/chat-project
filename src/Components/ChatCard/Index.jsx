import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const ChatCard = ({avatar,title,lastMessage,id,handleConversationId}) => {
  return (
    <>
    <ListItem disablePadding id={id} onClick={(e)=>handleConversationId(id)}>
      <ListItemButton alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={process.env.REACT_APP_BASE_URL+avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={lastMessage}
        /> 
        
      </ListItemButton>
      </ListItem>
      <Divider variant="fullWidth" component="li" />

    </>
  );
};

export default ChatCard;
