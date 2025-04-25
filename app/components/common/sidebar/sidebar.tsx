import { Drawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import Navigation from "./navigation";

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(11)})`,
});

const Aside = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  return sm ? (
    <Drawer // For mobile and Tablet
      ModalProps={{ sx: { position: "absolute" } }}
      PaperProps={{
        sx: {
          position: "absolute",
          width: xs ? "100%" : "50%",
          minWidth: "fit-content",
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
      variant="temporary"
      disablePortal
      open={open}
      onClick={() => setOpen(false)}
      onClose={() => setOpen(false)}
    >
      <Toolbar />
      <Navigation open={open} />
    </Drawer>
  ) : (
    <Aside // For Laptop and Desktop
      PaperProps={{
        sx: {
          position: "absolute",
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
      variant="permanent"
      open={open}
    >
      <Navigation open={open} />
    </Aside>
  );
}
