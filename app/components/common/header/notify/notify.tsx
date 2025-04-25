"use client";

import { Notifs } from "@/app/constants/types";
import { DoneAll } from "@mui/icons-material";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  ListItem,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { Mail01Icon, Notification02Icon } from "hugeicons-react";
import { useRef, useState } from "react";
import ListItems from "./listItems";

export default function Notify({
  variant,
  data,
}: {
  variant: "Messages" | "Notifications";
  data: Notifs;
}) {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isMarked, setIsMarked] = useState<boolean>(false); // JUST FOR DEMO
  const anchorEl = useRef<HTMLButtonElement | null>(null);
  const unread: number = data.reduce(
    (count, item) => (!item.read ? count + 1 : count),
    0
  );
  return (
    <>
      <IconButton
        size="large"
        ref={anchorEl}
        onClick={() => {
          setIsShowMenu(true);
        }}
      >
        <Badge variant="dot" badgeContent={isMarked ? 0 : unread} color="error">
          {variant === "Notifications" ? (
            <Notification02Icon size={20} />
          ) : (
            <Mail01Icon size={20} />
          )}
        </Badge>
      </IconButton>
      <Menu
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorEl={anchorEl.current}
        open={isShowMenu}
        onClose={() => setIsShowMenu(false)}
      >
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack gap={0.5}>
            <Typography variant="h6">{variant}</Typography>
            <Typography color="textSecondary" variant="caption">{`You have ${
              isMarked ? 0 : unread
            } unread message${unread > 1 ? "s" : ""}`}</Typography>
          </Stack>
          <IconButton
            onClick={() => setIsMarked(true)}
            title="Mark all as read"
          >
            <DoneAll />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItems items={data} markAsRead={isMarked} />
        <ListItem>
          <Button fullWidth variant="text">
            View all
          </Button>
        </ListItem>
      </Menu>
    </>
  );
}
