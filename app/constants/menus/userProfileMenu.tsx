import { Divider } from "@mui/material";
import { Logout04Icon, Settings01Icon, UserIcon } from "hugeicons-react";
import { Navs } from "../types";

export const UserProfileMenu: Navs = [
  {
    title: "My Profile",
    path: "",
    icon: <UserIcon size={20} />,
  },
  {
    title: "Account Settings",
    path: "",
    icon: <Settings01Icon size={20} />,
  },
  {
    element: <Divider />,
  },
  {
    title: "Sign Out",
    path: "",
    icon: <Logout04Icon size={20} />,
  },
];
