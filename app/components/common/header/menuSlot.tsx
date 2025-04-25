import { IconButton } from "@mui/material";
import { Menu01Icon } from "hugeicons-react";
export default function MenuSlot({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <IconButton size="large" onClick={() => setOpen(!open)}>
      <Menu01Icon />
    </IconButton>
  );
}
