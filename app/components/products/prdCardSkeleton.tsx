import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";

export default function PrdCardSkeleton() {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      {/* Media Placeholder */}
      <CardMedia>
        <Skeleton variant="rectangular" height={250} />
      </CardMedia>

      {/* Content Placeholder */}
      <CardContent>
        <Typography variant="h6">
          <Skeleton width="60%" />
        </Typography>
        <Typography variant="caption">
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="30%" />
        </Typography>
      </CardContent>

      {/* Actions Placeholder */}
      <CardActions sx={{ justifyContent: "space-between", p: 2, pt: 0 }}>
        <Skeleton height={50} width={80} />
        <Skeleton height={40} width={70} />
      </CardActions>
    </Card>
  );
}
