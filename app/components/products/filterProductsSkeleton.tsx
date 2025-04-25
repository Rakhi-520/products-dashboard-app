import { Card, Skeleton } from "@mui/material";

export default function FilterProductsSkeleton() {
  return (
    <Card
      sx={{
        px: 3,
        py: 1,
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} sx={{ flexGrow: 1, minWidth: 120 }}  height={80} />
      ))}
    </Card>
  );
}
