"use client";

import {
  Box,
  Card,
  IconButton,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  FilterRemoveIcon,
  GridViewIcon,
  ListViewIcon,
} from "hugeicons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterProducts({
  brandsList,
}: {
  brandsList: string[];
}) {
  const [show, setShow] = useState("");
  const [sortby, setSortby] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const showQuery = searchParams.get("show") || "";
    const sortbyQuery = searchParams.get("sortby") || "";
    const categoryQuery = searchParams.get("category") || "";
    const priceQuery = searchParams.get("price") || "";
    const brandQuery = searchParams.get("brand") || "";
    setShow(showQuery);
    setSortby(sortbyQuery);
    setCategory(categoryQuery);
    setPrice(priceQuery);
    setBrand(brandQuery);
  }, [searchParams]);

  useEffect(() => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ show, sortby, category, price, brand }).filter(
          ([, value]) => value
        )
      )
    );
    router.push(`?${query.toString()}`, undefined);
  }, [show, sortby, category, price, brand, router]);

  const handleShow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShow(e.target.value === "all" ? "" : e.target.value);
  };
  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value) {
      case "max50":
        setPrice(`{"max":50}`);
        break;
      case "min50max100":
        setPrice(`{"min":50,"max":100}`);
        break;
      case "min100max250":
        setPrice(`{"min":100,"max":250}`);
        break;
      case "min250max500":
        setPrice(`{"min":250,"max":500}`);
        break;
      case "min500":
        setPrice(`{"min":500}`);
        break;
      default:
        setPrice("");
        break;
    }
  };
  const handleBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value === "all" ? "" : e.target.value);
  };
  const handleSortby = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortby(e.target.value);
  };

  const handleResetFilters = () => {
    setBrand("");
    setCategory("");
    setPrice("");
    setShow("");
    setSortby("");
  };

  const IsResetFiltersEnable = !(
    sortby || show || price || brand || category
  );

  return (
    <Card
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Sort */}
      <TextField
        select
        label="Sort by"
        size="small"
        variant="filled"
        defaultValue={"featured"}
        value={sortby === "" ? "featured" : sortby}
        onChange={handleSortby}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={"featured"}>Featured</MenuItem>
        <MenuItem value={"popular"}>Popular</MenuItem>
        <MenuItem value={"ascprice"}>Price: Low to high</MenuItem>
        <MenuItem value={"desprice"}>Price: High to low</MenuItem>
        <MenuItem value={"ascqty"}>Quantity: Low to high</MenuItem>
        <MenuItem value={"desqty"}>Quantity: High to low</MenuItem>
      </TextField>

      {/* Show (availability) */}
      <TextField
        select
        defaultValue={"all"}
        value={show === "" ? "all" : show}
        label="Show"
        size="small"
        variant="filled"
        onChange={handleShow}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"available"}>Available</MenuItem>
        <MenuItem value={"notavailable"}>Not Available</MenuItem>
      </TextField>

      {/* Price */}
      <TextField
        select
        label="Price"
        size="small"
        variant="filled"
        defaultValue={"all"}
        value={price === "" ? "all" : price}
        onChange={handlePrice}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"max50"}>Below $50</MenuItem>
        <MenuItem value={"min50max100"}>$50 - $100</MenuItem>
        <MenuItem value={"min100max250"}>$100 - $250</MenuItem>
        <MenuItem value={"min250max500"}>$250 - $500</MenuItem>
        <MenuItem value={"min500"}>Above $500</MenuItem>
      </TextField>

      {/* Brand */}
      <TextField
        select
        label="Brand"
        size="small"
        variant="filled"
        defaultValue={"all"}
        value={brand === "" ? "all" : brand}
        onChange={handleBrand}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem key={0} value={"all"}>
          All
        </MenuItem>
        {brandsList.map((brand, index) => (
          <MenuItem key={index + 1} value={brand.toLowerCase()}>
            {brand}
          </MenuItem>
        ))}
      </TextField>

      {/* Category (currently disabled) */}
      <TextField
        disabled
        select
        label="Category"
        size="small"
        variant="filled"
        defaultValue={0}
        onChange={handleCategory}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={0}>All</MenuItem>
      </TextField>

      {/* Reset Button */}
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          disabled={IsResetFiltersEnable}
          color="primary"
          onClick={handleResetFilters}
          size="large"
        >
          <FilterRemoveIcon />
        </IconButton>
      </Box>

      {/* View Toggle (disabled for now) */}
      <ToggleButtonGroup disabled exclusive size="small" value="grid">
        <ToggleButton color="info" value="list" sx={{ px: 2 }}>
          <ListViewIcon size={18} />
        </ToggleButton>
        <ToggleButton color="info" value="grid" sx={{ px: 2 }}>
          <GridViewIcon size={18} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
}
