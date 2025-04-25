"use client";
import dataset from "@app/placeholders/mostSold.json";
import {
  Card,
  CardContent,
  CardHeader,
  colors,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
const bgLegends = [
  colors.blue.A400,
  colors.cyan.A400,
  colors.deepPurple.A200,
  colors.purple.A100,
  colors.blueGrey.A200,
];
export default function CardMostSold() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        titleTypographyProps={{
          color: "textSecondary",
          variant: "h6",
          component: "h6",
        }}
        title="Most Sold"
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid2
          container
          direction="row"
          columnGap={2}
          justifyContent="center"
          marginBottom={2}
        >
          {dataset.map((item, index) => (
            <Grid2 key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Paper
                sx={{
                  width: 15,
                  height: 15,
                  backgroundColor: bgLegends[index],
                  borderRadius: 0,
                  marginRight: 1,
                }}
              />
              <Typography variant="body1">{item.label}</Typography>
            </Grid2>
          ))}
        </Grid2>
        <PieChart
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          colors={bgLegends}
          sx={{ alignSelf: "center" }}
          series={[
            {
              cornerRadius: 3,
              startAngle: -90,
              paddingAngle: 1,
              innerRadius: 20,
              data: dataset,
              highlightScope: { fade: "global", highlight: "item" },
              valueFormatter: (item) => `${item.value}%`, // Append the '%' symbol
              arcLabel: (item) => `${item.value}%`, // Show values inside of Arc
              arcLabelRadius: 90,
              arcLabelMinAngle: 20,
            },
          ]}
          slotProps={{
            legend: {
              hidden: true,
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              itemMarkWidth: 15,
              itemMarkHeight: 15,
              labelStyle: {},
            },
            pieArcLabel: {
              fontSize: 14,
            },
          }}
          width={300}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
