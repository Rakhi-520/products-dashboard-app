import { Prd } from "@/app/constants/types";
import prds from "@app/placeholders/productsList.json";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Sad01Icon } from "hugeicons-react";
import Image from "next/image";

export default async function Product({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const prod: string = (await params).name;

  // Helper to find product by name
  const inquiryProductByName = (name: string) =>
    prds.find((prd) => prd.title.toLowerCase().replaceAll(" ", "-") === name);

  const prd: Prd | undefined = inquiryProductByName(prod);

  return prd ? (
    <Card sx={{ boxShadow: 4 }}>
      <CardHeader
        sx={{ py: 3 }}
        title={prd.title}
        titleTypographyProps={{ variant: "h4" }}
        action={
          <Typography variant="h5" sx={{ color: "primary.main" }}>
            $ {prd.price}
          </Typography>
        }
      />
      <CardMedia sx={{ position: "relative", height: 600 }}>
        <Image
          src={prd.image}
          alt={prd.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          Summary
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ lineHeight: 1.8, mt: 1 }}
        >
          {prd.summary}
        </Typography>
        <Typography sx={{ mt: 3 }} variant="h6" color="textPrimary">
          Description
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ lineHeight: 1.8, mt: 1 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. ...
        </Typography>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          spacing={2}
          mt={2}
          py={3}
        >
          <Chip
            label={`In Stock: ${prd.quantity}`}
            color={prd.quantity > 5 ? "success" : "warning"}
            variant="filled"
          />
          <Chip
            label={`Rating: ${prd.score} / 5`}
            color="success"
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  ) : (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" color="error">
        <Sad01Icon size={36} />
      </Typography>
      <Typography variant="h5" color="error">
        Product not found.
      </Typography>
    </Box>
  );
}
