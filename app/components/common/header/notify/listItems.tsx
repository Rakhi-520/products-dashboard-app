import { NotifItem, Notifs } from "@/app/constants/types";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CreditCardAcceptIcon,
  DiscountIcon,
  ShoppingCart02Icon,
  TruckDeliveryIcon,
} from "hugeicons-react";
import { ReactNode } from "react";
type Notif = "order" | "payment" | "shipping" | "promotion" | undefined;

export default function ListItems({
  items,
  markAsRead, // JUST FOR DEMO
}: {
  items: Notifs;
  markAsRead: boolean;
}) {
  // THIS IS LOCATED HERE TEMPORARY
  function getIcon(type: Notif): ReactNode {
    switch (type) {
      case "order":
        return <ShoppingCart02Icon />;
      case "payment":
        return <CreditCardAcceptIcon />;
      case "shipping":
        return <TruckDeliveryIcon />;
      case "promotion":
        return <DiscountIcon />;
      default:
        return <CreditCardAcceptIcon />;
    }
  }

  const palette = useTheme().palette;

  return (
    <>
      {items.map((item: NotifItem) => (
        <ListItem key={item.id} disablePadding divider>
          <ListItemButton selected={!markAsRead && !item.read}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  color: palette.background.paper,
                  bgcolor: palette.primary.light,
                }}
              >
                {item.sender?.charAt(0).toUpperCase() ??
                  getIcon(item.type as Notif)}
              </Avatar>
            </ListItemAvatar>
            <Stack gap={0.5} flexGrow={1} flexDirection={"column"}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="subtitle2">
                  {item.sender ?? item.type}
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  {item.time}
                </Typography>
              </Stack>
              <Typography color="textSecondary" variant="body2">
                {item.message}
              </Typography>
            </Stack>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}
