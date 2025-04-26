"use client";

import FilterProducts from "@/app/components/products/filterProducts";
import PrdCard from "@/app/components/products/prdCard";
import PrdCardSkeleton from "@/app/components/products/prdCardSkeleton";
import { Prd } from "@/app/constants/types";
import useFetch from "@/app/hooks/useFetch";
import { Grid2 } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Products() {
  const searchParams = useSearchParams();
  const { data, isPending } = useFetch("api/data/products", searchParams);

  const brands = useMemo(() => {
    return Array.from(new Set(data.map((prd: Prd) => prd.brand)));
  }, [data]);

  // ✅ Only show filter component if needed
  // You can remove this if you want full flexibility
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <FilterProducts brandsList={brands} />
        </Grid2>

        {isPending
          ? Array.from({ length: 8 }).map((_, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                <PrdCardSkeleton />
              </Grid2>
            ))
          : data.length > 0 ? (
              data.map((prd: Prd) => (
                <Grid2 key={prd.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                  <PrdCard data={prd} />
                </Grid2>
              ))
            ) : (
              <Grid2 size={{ xs: 12 }}>
                <p style={{ padding: "2rem", textAlign: "center" }}>
                  No matching products found.
                </p>
              </Grid2>
            )}
      </Grid2>
    </>
  );
}
