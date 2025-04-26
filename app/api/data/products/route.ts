import { Prd } from "@/app/constants/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// Cache to avoid reading file repeatedly
let cachedData: { data: Prd[]; timestamp: number } | null = null;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const sortby = searchParams.get("sortby");
    const show = searchParams.get("show");
    const price = searchParams.get("price");
    const brand = searchParams.get("brand");

    // Load product data from file if not cached
    if (!cachedData) {
      const filePath = path.join(process.cwd(), "app/placeholders", "productsList.json");
      const data = await fs.readFile(filePath, "utf-8");
      cachedData = { data: JSON.parse(data), timestamp: Date.now() };
    }

    let filteredData: Prd[] = cachedData?.data || [];

    // ✅ Improved Search Filter: Matches title or description
    if (search) {
      const query = search.toLowerCase();
      filteredData = filteredData.filter(
        (prd) =>
          prd.title.toLowerCase().includes(query) ||
          prd.description?.toLowerCase().includes(query)
      );
    }

    // 🔁 Sort Filter
    if (sortby) {
      switch (sortby) {
        case "popular":
          filteredData.sort((a, b) => b.score - a.score);
          break;
        case "ascqty":
          filteredData.sort((a, b) => a.quantity - b.quantity);
          break;
        case "desqty":
          filteredData.sort((a, b) => b.quantity - a.quantity);
          break;
        case "ascprice":
          filteredData.sort((a, b) => a.price - b.price);
          break;
        case "desprice":
          filteredData.sort((a, b) => b.price - a.price);
          break;
        default:
          filteredData.sort((a, b) => a.id - b.id);
      }
    }

    // 🟢 Availability Filter
    if (show) {
      filteredData = filteredData.filter((prd) =>
        show === "available" ? prd.quantity > 0 : prd.quantity === 0
      );
    }

    // 💰 Price Filter
    if (price) {
      const { min, max } = JSON.parse(decodeURIComponent(price));
      filteredData = filteredData.filter(
        (prd) =>
          (!min || prd.price >= min) && (!max || prd.price <= max)
      );
    }

    // 🏷️ Brand Filter
    if (brand) {
      filteredData = filteredData.filter(
        (prd) => prd.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    return NextResponse.json(filteredData, { status: 200 });

  } catch (error) {
    console.error("Error fetching or filtering data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
