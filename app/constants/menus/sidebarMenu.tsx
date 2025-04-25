import { Typography } from "@mui/material";
import {
  Analytics01Icon,
  CustomerService01Icon,
  DashboardSquare01Icon,
  InformationCircleIcon,
  Settings01Icon,
  ShoppingBag02Icon,
} from "hugeicons-react";
import { Navs } from "../types";

export const primarySideBarMenu: Navs = [
  {
    element: (
      <Typography px={1.2} color="textSecondary" variant="overline">
        Main
      </Typography>
    ),
  },
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardSquare01Icon />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <ShoppingBag02Icon />,
  },
  {
    title: "Statistics",
    path: "#", // Used # for disabling
    icon: <Analytics01Icon />,
  },
  {
    title: "Services",
    path: "#", // Used # for disabling
    icon: <CustomerService01Icon />,
  },
  {
    element: (
      <Typography px={0.5} color="textSecondary" variant="overline">
        Others
      </Typography>
    ),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings01Icon />,
  },
  {
    title: "About",
    path: "#", // Used # for disabling
    icon: <InformationCircleIcon />,
  },
  // {
  //   title: "Help",
  //   path: "#", // Used # for disabling
  //   icon: <HelpCircleIcon />,
  //   elink: "https://www.google.com",
  //   eicon: <LinkSquare02Icon size={18} />,
  // },
];
