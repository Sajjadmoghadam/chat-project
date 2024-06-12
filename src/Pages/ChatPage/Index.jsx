import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  Modal,
  Stack,
  TextField,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Input,
} from "@mui/material";
import { DevTool } from "@hookform/devtools";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Message from "../../Components/Message";
import MenuIcon from "@mui/icons-material/Menu";
import ForumIcon from "@mui/icons-material/Forum";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ContactCard from "../../Components/ContactCard";
import SettingCard from "../../Components/SettingCard";
import ChatCard from "../../Components/ChatCard/Index";
import auth from "../../utils/auth";
import { useForm } from "react-hook-form";

const ChatPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { token } = useContext(auth);
  const inputRef = useRef(null);
  const [img, setImg] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [openChannel, setOpenChannel] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [search, setSearch] = useState("");
  const [searchContact, setSearchContact] = useState([]);
  const [checked, setChecked] = useState([]); // Ensure checked is an array

  const handleOpenGroup = () => setOpenGroup(true);
  const handleCloseGroup = () => setOpenGroup(false);
  const handleOpenChannel = () => setOpenChannel(true);
  const handleCloseChannel = () => setOpenChannel(false);
  const handleOpenSetting = () => setOpenSetting(true);
  const handleCloseSetting = () => setOpenSetting(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/v1/conversation", {
      method: "GET",
      headers: {
        authorization: "bearer " + token,
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setConversation(data.data.conversationIds);
      });
  }, [token]);

  const handleToggle = (id) => {
    setChecked((prevChecked) => {
      const currentIndex = prevChecked.indexOf(id);
      if (currentIndex === -1) {
        return [...prevChecked, id];
      } else {
        return prevChecked.filter((checkedId) => checkedId !== id);
      }
    });
  };

  const conversationList = conversation?.map((e) => {
    let privateTitle = "";
    if (e.conversationType === "private") {
      const { id } = JSON.parse(localStorage.getItem("userData"));
      e?.members.forEach((z) => {
        if (z.id === id) {
          privateTitle = z.fullName;
        }
      });
    }
    return (
      <ChatCard
        key={e._id}
        id={e._id}
        lastMessage={e?.messages?.at(-1)?.text}
        title={e.conversationType === "private" ? privateTitle : e.title}
        avatar={e.profile}
      />
    );
  });

  useEffect(() => {
    if (search) {
      fetch(process.env.REACT_APP_BASE_URL + "/api/v1/search", {
        method: "POST",
        headers: {
          authorization: "bearer " + token,
          "content-type": "application/json",
        },
        body: JSON.stringify({ search }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.users) {
            setSearchContact(data?.data?.users);
          }
        });
    }
  }, [search, token]);

  const createGroup = (data) => {
    const members = searchContact
      .filter((user) => checked.includes(user._id))
      .map((user) => user._id);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("members", JSON.stringify(members));
    if (img) {
      formData.append("file", img);
    }

    fetch("http://localhost:5000/api/v1/conversation/group", {
      method: "POST",
      headers: {
        authorization: "bearer " + token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Handle success
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  };

  return (
    <>
      <Stack flexDirection={"row"} width={"100%"} height={"100vh"} bgcolor={""}>
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
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>
          <Stack
            height={"100%"}
            maxHeight={"100%"}
            sx={{ overflowY: "scroll" }}
          >
            <List sx={{ width: "100%" }}>{conversationList}</List>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          justifyContent={"space-between"}
          borderLeft={"1px #cccccc solid"}
          width={"75%"}
          height={"100%"}
        >
          <Stack direction={"column"}>
            <Stack
              width={"100%"}
              justifyContent={"space-between"}
              height={"60px"}
              bgcolor={"#fff"}
              direction={"row"}
              alignItems={"center"}
            >
              <Stack px={2} direction={"column"}>
                <Typography variant="body1">همکاران حسابداری معین</Typography>
                <Typography color={"gray"} variant="caption">
                  50 members,2 online
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={1} px={2}>
                <SearchIcon />
                <MoreVertIcon />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              backgroundImage:
                "url(https://w0.peakpx.com/wallpaper/425/514/HD-wallpaper-telegram-pattern-art-patterns.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
            }}
          >
            <Message
              userId={"165"}
              date={"20:22"}
              userName={"مهدی"}
              message={
                "دره آل مشهد یکی از زیباترین و جذاب‌ترین مناطق طبیعی استان خراسان رضوی است که هر ساله گردشگران زیادی را به خود جذب می‌کند. این دره با طبیعت بکر و دست‌نخورده، آبشارهای فصلی، چشمه‌های زلال و محیط کوهستانی خود، مقصدی ایده‌آل برای علاقه‌مندان به طبیعت و ماجراجویی است. در این مقاله، با توجه به اصول سئو و کلمات کلیدی پرجستجو، به معرفی جامع دره آل مشهد در پنج سرفصل اصلی پرداخته و هر کدام را به تفصیل توضیح می‌دهیم."
              }
            />
          </Stack>
          <Stack direction={"row-reverse"} height={"60px"} width={"100%"}>
            <Button>
              <SendIcon />
            </Button>
            <Button>
              <SentimentSatisfiedAltIcon style={{ color: "gray" }} />
            </Button>
            <TextField
              fullWidth
              placeholder="Write a message..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
            />
            <Button sx={{ padding: "0" }}>
              <AttachmentIcon style={{ color: "gray" }} />
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300 }} role="presentation">
          <Stack
            flexDirection={"row"}
            height={"100px"}
            justifyContent={"space-between"}
            p={2}
            alignItems={"center"}
          >
            <Avatar />
            <Typography>moghadam</Typography>
          </Stack>
          <Divider variant="fullWidth" />
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenGroup}>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary={"New Group"} />
              </ListItemButton>
            </ListItem>
            <Modal open={openGroup} onClose={handleCloseGroup}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid white",
                  borderRadius: "16px",
                  boxShadow: 24,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack
                  alignItems={"center"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
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
                    {img ? (
                      <img
                        src={URL.createObjectURL(img)}
                        alt="Preview"
                        style={{
                          height: "70px",
                          width: "70px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <IconButton onClick={handleClick}>
                        <CameraAltIcon
                          sx={{ color: "#fff", fontSize: "2.5rem" }}
                        />
                      </IconButton>
                    )}
                    <Input
                      inputRef={inputRef}
                      sx={{
                        display: "none",
                      }}
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      id="standard-basic"
                      label="Group Name"
                      variant="standard"
                      fullWidth
                      {...register("title")}
                    />
                  </Stack>
                </Stack>
                <Stack mt={2}>
                  <TextField
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      backgroundColor: "#F1F1F1",
                      borderRadius: "24px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                    }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <Stack
                    sx={{
                      backgroundColor: "#F1F1F1",
                      borderRadius: "16px",
                      maxHeight: "250px",
                      overflowY: "scroll",
                    }}
                    mt={1}
                  >
                    {searchContact.map((user) => (
                      <ContactCard
                        key={user._id}
                        id={user._id}
                        profile={user.profile}
                        userName={user.userName}
                        fullName={user.fullName}
                        handleToggle={handleToggle}
                        checked={checked.includes(user._id)}
                      />
                    ))}
                  </Stack>
                </Stack>
                <Stack mt={1}>
                  <Button onClick={handleSubmit(createGroup)} variant="contained">
                    Create
                  </Button>
                </Stack>
              </Box>
            </Modal>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenChannel}>
                <ListItemIcon>
                  <ForumIcon />
                </ListItemIcon>
                <ListItemText primary={"New Channel"} />
              </ListItemButton>
            </ListItem>
            <Modal
              open={openChannel}
              onClose={handleCloseChannel}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid white",
                  borderRadius: "16px",
                  boxShadow: 24,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack
                  alignItems={"center"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
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
                    <IconButton onClick={handleClick}>
                      <CameraAltIcon
                        sx={{ color: "#fff", fontSize: "2.5rem" }}
                      />
                    </IconButton>
                    <Input
                      inputRef={inputRef}
                      sx={{
                        display: "none",
                      }}
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Stack>
                  <Stack>
                    <TextField
                      id="standard-basic"
                      label="Channel Name"
                      variant="standard"
                    />
                  </Stack>
                </Stack>
                <Stack mt={1} gap={1}>
                  <TextField
                    id="standard-basic"
                    label="Channel Id"
                    variant="standard"
                    size="small"
                  />
                  <TextField
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      backgroundColor: "#F1F1F1",
                      borderRadius: "24px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.Mui-focused fieldset": {
                          border: "none",
                        },
                      },
                    }}
                  />
                  <Stack
                    sx={{
                      backgroundColor: "#F1F1F1",
                      borderRadius: "16px",
                      maxHeight: "250px",
                      overflowY: "scroll",
                    }}
                    mt={1}
                  >
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                    <ContactCard />
                  </Stack>
                </Stack>
                <Stack mt={1}>
                  <Button variant="contained">Create</Button>
                </Stack>
              </Box>
            </Modal>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenSetting}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Setting"} />
              </ListItemButton>
            </ListItem>
            <Modal open={openSetting} onClose={handleCloseSetting}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  height: 600,
                  bgcolor: "#fff",
                  border: "2px solid white",
                  borderRadius: "16px",
                  boxShadow: 24,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SettingCard close={handleCloseSetting} />
              </Box>
            </Modal>
          </List>
        </Box>
      </Drawer>
      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
};

export default ChatPage;
