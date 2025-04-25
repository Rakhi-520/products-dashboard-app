import { Prd } from "@/app/constants/types";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Layers01Icon, LinkSquare02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";

export default function PrdCard({ data }: { data: Prd }) {
  const palette = useTheme().palette;
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        position: "relative",
        "&:hover .btn-header": {
          opacity: 1,
          transform: "translateY(0)",
          background: palette.background.paper,
        },
        "&:hover .card-header": {
          background: `linear-gradient(45deg, rgba(0,0,0,0) 75%, rgba(0,0,0,0.8) 100%)`,
        },
      }}
    >
      <CardMedia sx={{ position: "relative", height: 250 }}>
        <Image
          src={data.image}
          alt={data.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="600px"
        />
      </CardMedia>
      <CardHeader
        className="card-header"
        sx={{
          width: "100%",
          position: "absolute",
          pb: 10,
        }}
        action={
          <IconButton
            sx={{
              opacity: 0,
              transform: "translateY(-10px)",
              transition: "opacity 0.3s, transform 0.3s",
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
            className="btn-header"
            LinkComponent={Link}
            size="medium"
            href={`/products/${data.title.toLowerCase().replaceAll(" ", "-")}`}
          >
            <LinkSquare02Icon size={18} />
          </IconButton>
        }
      />
      <CardContent>
        <Stack
          flexDirection="row"
          alignItems="start"
          justifyContent="space-between"
          pb={2}
        >
          <Typography variant="body2" component="div">
            {data.brand}
          </Typography>
          <Stack gap={1} flexDirection={"row"}>
            <Rating
              size="small"
              defaultValue={data.score}
              precision={0.5}
              disabled
            />
            <Stack gap={0.2} alignItems={"baseline"} flexDirection={"row"}>
              <Typography color="textSecondary" variant="body2" component="div">
                {data.score}
              </Typography>
              <Typography
                color="textSecondary"
                variant="caption"
                component="div"
              >
                {`/5`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Typography noWrap gutterBottom variant="h6" component="div">
          {data.title}
        </Typography>
        <Typography
          sx={{ height: "40px" }}
          variant="caption"
          component="div"
          color="textSecondary"
        >
          {data.summary.slice(0, 180) + "..."}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", p: 2, pt: 0 }}>
        <Tooltip arrow title={`${data.quantity} in stock`}>
          <Chip
            sx={{ px: 1 }}
            color={
              data.quantity > 5
                ? "success"
                : data.quantity === 0
                ? "default"
                : "warning"
            }
            size="medium"
            variant="filled"
            label={`${data.quantity}`}
            icon={<Layers01Icon size={18} />}
          />
        </Tooltip>
        <Box>
          <Typography
            color={data.quantity === 0 ? "textDisabled" : "textPrimary"}
            variant="body1"
            component="span"
          >
            ${" "}
          </Typography>
          <Typography
            sx={{
              textDecoration: data.quantity === 0 ? "line-through" : "none",
            }}
            color={data.quantity === 0 ? "textDisabled" : "textPrimary"}
            variant={data.quantity === 0 ? "subtitle1" : "h6"}
            component="span"
          >
            {data.price}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
