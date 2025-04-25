"use client";
import { NavItem } from "@/app/constants/types";
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import LinkMUI from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Github01Icon, Linkedin01Icon } from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primarySideBarMenu } from "../../../constants/menus/sidebarMenu";
import appVersion from "@/package.json"

export default function Navigation({
  open,
}: {
  open: boolean;
}) {
  const version = `v${appVersion.version}`;
  const chipInfo = open
    ? `${version} --- Powered by Material UI`
    : `${version}`;
  const currentPath = usePathname();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: md ? 0 : 5,
          // mb: 30,
        }}
      >
        <List>
          {primarySideBarMenu.map((props: NavItem, index) => {
            if ("title" in props && "path" in props && "icon" in props) {
              return (
                <ListItem key={index}>
                  <ListItemButton
                    selected={currentPath === props.path}
                    disabled={props.path === "#" ? true : false}
                    href={props.path}
                    LinkComponent={Link}
                    sx={{ borderRadius: 1 }}
                  >
                    <ListItemIcon>{props.icon}</ListItemIcon>
                    <ListItemText primary={props.title} />
                  </ListItemButton>
                </ListItem>
              );
            } else if ("element" in props) {
              return <ListItem key={index}>{props.element}</ListItem>;
            }
          })}
        </List>
        <Stack gap={2}>
          <Stack
            flexDirection={"row"}
            justifyContent={"center"}
            gap={2}
            sx={{
              visibility: open ? "visible" : "hidden",
              opacity: open ? 1 : 0,
              transition: "all 0.1s linear",
              transitionDelay: open ? "0.3s" : "",
            }}
          >
            <LinkMUI
              align="center"
              href="https://github.com/EhsanEDev/nextjs-dashboard-app"
              target="_blank"
              color="primary"
              sx={{
                "&:hover": {
                  color: "secondary.light",
                },
              }}
            >
              <Github01Icon size={26} strokeWidth={1} />
            </LinkMUI>
            <LinkMUI
              align="center"
              href="https://www.linkedin.com/in/ehsan-ekhtiyar/"
              target="_blank"
              variant="caption"
              color="primary"
              sx={{
                "&:hover": {
                  color: "secondary.light",
                },
              }}
            >
              <Linkedin01Icon size={26} strokeWidth={1} />
            </LinkMUI>
          </Stack>
          <Chip
            sx={{
              textAlign: "center",
              mx: "10px",
              mb: "25px",
            }}
            color="primary"
            size="small"
            variant="outlined"
            label={chipInfo}
          />
        </Stack>
      </Box>
    </>
  );
}
