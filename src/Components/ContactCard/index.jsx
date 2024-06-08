import React from "react";
import {
  Avatar,
  Checkbox,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function ContactCard() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = () => () => {
    const currentIndex = checked.indexOf();
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push();
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <>
      <>
        <ListItem disablePadding >
          <ListItemButton alignItems="center" onClick={handleToggle()}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              />
              <Checkbox checked={checked.indexOf() !== -1}/>
          </ListItemButton>
        </ListItem>
      </>
    </>
  );
}
