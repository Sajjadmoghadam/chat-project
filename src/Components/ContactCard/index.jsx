import React from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function ContactCard() {
  return (
    <>
      <>
        <ListItem disablePadding>
          <ListItemButton alignItems="center">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
            />
          </ListItemButton>
        </ListItem>
      </>
    </>
  );
}
