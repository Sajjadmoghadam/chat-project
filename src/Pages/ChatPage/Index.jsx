import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ForumIcon from '@mui/icons-material/Forum';
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import ChatCard from "../../Components/ChatCard/Index";
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';

const ChatPage = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        height={"100vh"}
        bgcolor={"red"}
      >
        <Stack
          width={"25%"}
          height={"100%"}
          maxHeight={"100%"}
          sx={{ overflowY: "scroll" }}
          bgcolor={"#fff"}
          gap={2}
        >
          <Stack
            flexDirection={"row"}
            p={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <TextField
              size="small"
              fullWidth
              sx={{
                backgroundColor: "#F1F1F1",
                borderRadius: "24px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none"
                  },
                  "&:hover fieldset": {
                    border: "none"
                  },
                  "&.Mui-focused fieldset": {
                    border: "none"
                  }
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              placeholder="search"
            />
          </Stack>
          <Stack
            height={"100%"}
            maxHeight={"100%"}
            sx={{ overflowY: "scroll" }}
          >
            <List sx={{ width: "100%" }}>
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
            </List>
          </Stack>
        </Stack>
        <Stack width={"75%"}></Stack>
      </Stack>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Stack flexDirection={"row"} height={"100px"} justifyContent={"space-between"} p={2} alignItems={"center"}>
            <Avatar/>
            <Typography>moghadam</Typography>
          </Stack>
          <Divider variant="fullWidth" />
          <List disablePadding>
            
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupsIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"New Group"} />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ForumIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"New Channel"} />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Setting"} />
                </ListItemButton>
              </ListItem>
           
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatPage;
