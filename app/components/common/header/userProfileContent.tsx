import { UserProfileMenu } from "@/app/constants/menus/userProfileMenu";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Session } from "next-auth";

export default function UserProfileContent({
  session,
  closeMenu,
  showSignoutDialoge,
}: {
  session: Session | null;
  closeMenu: () => void;
  showSignoutDialoge: () => void;
}) {
  return (
    <>
      <ListItem key={"user"} sx={{ gap: 2 }}>
        <ListItemAvatar>
          <Avatar
            sx={{ width: 64, height: 64 }}
            alt={session?.user?.name ?? ""}
            src={session?.user?.image ?? ""}
          >
            {session?.user?.name?.charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={session?.user?.name}
          secondary={session?.user?.email}
        />
      </ListItem>
      <Divider />
      {UserProfileMenu.map((props, index) => {
        if ("title" in props && "path" in props && "icon" in props) {
          return (
            <ListItem disablePadding key={index}>
              <ListItemButton
                onClick={() => {
                  if (props.title === "Sign Out") showSignoutDialoge();
                  closeMenu();
                }}
                // LinkComponent={Link}
                // href={props.path}
              >
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText>{props.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        } else if ("element" in props) {
          return <ListItem divider disablePadding key={index}></ListItem>;
        }
      })}
    </>
  );
}
