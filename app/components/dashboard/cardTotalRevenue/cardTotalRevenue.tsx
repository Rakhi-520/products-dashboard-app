import dataset from "@app/placeholders/totalRevenue.json";
import { Card, CardContent, CardHeader, colors } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";

export default function CardTotalRevenue() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        titleTypographyProps={{
          color: "textSecondary",
          variant: "h6",
          component: "h6",
        }}
        title="Total Revenue"
      />
      <CardContent>
        <BarChart
          margin={{ left: 30, right: 30, top: 50, bottom: 30 }}
          grid={{ horizontal: true }}
          borderRadius={5}
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              tickPlacement: "middle",
              disableTicks: true,
            },
          ]}
          yAxis={[{ disableTicks: true }]}
          series={[
            {
              dataKey: "profit",
              label: "Profit",
              color: colors.blue.A400,
            },
            {
              dataKey: "loss",
              label: "Loss",
              color: colors.cyan.A400,
            },
          ]}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "middle" },
              itemMarkWidth: 15,
              itemMarkHeight: 15,
            },
          }}
          sx={{
            [`& .${chartsGridClasses.horizontalLine}`]: {
              strokeDasharray: "3 3",
              strokeWidth: 1,
            },
          }}
          height={350}
        />
      </CardContent>
    </Card>
  );
}
