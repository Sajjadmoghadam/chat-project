import React from "react";
import {
  Avatar,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function ContactCard({ profile, userName, fullName, id, handleToggle, checked }) {
  const labelId = `checkbox-list-secondary-label-${id}`;
  return (
    <ListItem
      key={id}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => handleToggle(id)}
          checked={checked}
          inputProps={{ "aria-labelledby": labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={userName} src={profile ? profile : "/static/images/avatar/1.jpg"} />
        </ListItemAvatar>
        <ListItemText primary={fullName} id={labelId} />
      </ListItemButton>
    </ListItem>
  );
}
