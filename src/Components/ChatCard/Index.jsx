import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const ChatCard = () => {
  return (
    <>
    <ListItem disablePadding>
      <ListItemButton alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary="salam key miyay khone"
        />
      </ListItemButton>
      </ListItem>
      <Divider variant="fullWidth" component="li" />

    </>
  );
};

export default ChatCard;
