import Grid from "@mui/material/Grid";
import CardBrief from "../components/dashboard/cardBrief/cardBrief";
import CardTotalRevenue from "../components/dashboard/cardTotalRevenue/cardTotalRevenue";
import CardMostSold from "../components/dashboard/cardMostSold/cardMostSold";
import CardRecentOrders from "../components/dashboard/cardRecentOrders/cardRecentOrders";
import rawBriefInfo from "@/app/placeholders/todayBrief.json";
import { BriefCard } from "@/app/constants/types";

const briefInfo: BriefCard[] = rawBriefInfo as BriefCard[];


export default function Home() {
  return (
    <Grid container spacing={2}>
      {briefInfo.map((card, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <CardBrief
            type={card.type}
            value={card.value}
            percent={card.percent}
          />
        </Grid>
      ))}

      <Grid item xs={12} md={6}>
        <CardTotalRevenue />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardMostSold />
      </Grid>
      <Grid item xs={12}>
        <CardRecentOrders />
      </Grid>
    </Grid>
  );
}
