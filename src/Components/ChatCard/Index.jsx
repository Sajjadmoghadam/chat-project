import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const ChatCard = ({avatar,title,lastMessage,id}) => {
  return (
    <>
    <ListItem disablePadding id={id}>
      <ListItemButton alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatar} />
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
