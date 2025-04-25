import { CardCategory } from "@/app/constants/types";

import { TrendingDown, TrendingUp } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import {
  DollarReceive01Icon,
  SaveMoneyDollarIcon,
  ShoppingCart02Icon,
  UserMultipleIcon,
} from "hugeicons-react";

export default function CardBrief({
  type,
  value,
  percent,
}: {
  type: CardCategory;

  value: string | number;
  percent: number;
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        titleTypographyProps={{
          color: "textSecondary",
          variant: "subtitle1",
          component: "h6",
        }}
        title={
          (type === "sales" && "Today's sales") ||
          (type === "orders" && "Today's orders") ||
          (type === "profit" && "Today's profit") ||
          (type === "customers" && "Today's customers")
        }
        action={
          <Chip
            color={percent > 0 ? "success" : "warning"}
            size="small"
            variant="outlined"
            label={`${percent}%`}
            icon={
              percent > 0 ? (
                <TrendingUp fontSize="small" />
              ) : (
                <TrendingDown fontSize="small" />
              )
            }
          />
        }
        sx={{
          "& .MuiCardHeader-action": {
            m: 0,
          },
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ opacity: 0.65 }} color="primary">
          {type === "sales" && (
            <DollarReceive01Icon size={48} strokeWidth={1} />
          )}
          {type === "profit" && (
            <SaveMoneyDollarIcon size={48} strokeWidth={1} />
          )}
          {type === "orders" && (
            <ShoppingCart02Icon size={42} strokeWidth={1} />
          )}
          {type === "customers" && (
            <UserMultipleIcon size={42} strokeWidth={1} />
          )}
        </Typography>
        <Stack flexDirection="row" alignItems="end" columnGap={0.5}>
          {["sales", "profit"].includes(type) && (
            <Typography variant="body1" component="span">
              $
            </Typography>
          )}
          <Typography variant="h5" component="span">
            {/* Format numbers nicely with commas */}
            {typeof value === "number" ? value.toLocaleString() : value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
