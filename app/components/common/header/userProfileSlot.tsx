"use client";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Menu,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import UserProfileContent from "./userProfileContent";

export default function UserProfileSlot() {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isShowSignoutDialog, setIsShowSignoutDialog] =
    useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };
  const handleCloseMenu = () => {
    setIsShowMenu(false);
  };
  const handleShowSignoutDialog = () => {
    setIsShowSignoutDialog(true);
  };

  const anchorEl = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <IconButton size="small" ref={anchorEl} onClick={handleToggleMenu}>
        <Avatar
          alt={session?.user?.name ?? ""}
          src={session?.user?.image ?? ""}
        >
          {session?.user?.name?.charAt(0)}
        </Avatar>
      </IconButton>

      {sm ? (
        <Drawer
          anchor="right"
          variant="temporary"
          open={isShowMenu}
          onClose={() => setIsShowMenu(false)}
          PaperProps={{
            sx: { minWidth: "fit-content", width: xs ? "100%" : "50%", pt: 2 },
          }}
        >
          <Toolbar />
          <UserProfileContent
            session={session}
            closeMenu={handleCloseMenu}
            showSignoutDialoge={handleShowSignoutDialog}
          />
        </Drawer>
      ) : (
        <Menu
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          anchorEl={anchorEl.current}
          open={isShowMenu}
          onClose={handleCloseMenu}
        >
          <UserProfileContent
            session={session}
            closeMenu={handleCloseMenu}
            showSignoutDialoge={handleShowSignoutDialog}
          />
        </Menu>
      )}

      <Dialog
        PaperProps={{ sx: { p: 1 } }}
        fullWidth
        fullScreen={xs ? true : false}
        open={isShowSignoutDialog}
      >
        <DialogTitle>Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              signOut({ redirect: true, callbackUrl: currentPath })
            }
          >
            Sign Out
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsShowSignoutDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
