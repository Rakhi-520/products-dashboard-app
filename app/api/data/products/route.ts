import { Prd } from "@/app/constants/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// Caching to avoid repeated file reads
let cachedData: { data: Prd[]; timestamp: number } | null = null;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const sortby = searchParams.get("sortby");
    const show = searchParams.get("show");
    const price = searchParams.get("price");
    const brand = searchParams.get("brand");

    if (!cachedData) {
      const filePath = path.join(
        process.cwd(),
        "app/placeholders",
        "productsList.json"
      );

      const data = await fs.readFile(filePath, "utf-8");
      cachedData = { data: JSON.parse(data), timestamp: Date.now() };
    }

    let filteredData: Prd[] = cachedData?.data || [];

    // ✅ Safe Search Filter (title OR description)
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(
        (prd) =>
          prd.title.toLowerCase().includes(searchLower) ||
          (prd.description?.toLowerCase().includes(searchLower) ?? false)
      );
    }

    // Sort by filter
    if (sortby) {
      switch (sortby) {
        case "popular":
          filteredData = filteredData.sort((a, b) => b.score - a.score);
          break;
        case "ascqty":
          filteredData = filteredData.sort((a, b) => a.quantity - b.quantity);
          break;
        case "desqty":
          filteredData = filteredData.sort((a, b) => b.quantity - a.quantity);
          break;
        case "ascprice":
          filteredData = filteredData.sort((a, b) => a.price - b.price);
          break;
        case "desprice":
          filteredData = filteredData.sort((a, b) => b.price - a.price);
          break;
        default:
          filteredData = filteredData.sort((a, b) => a.id - b.id);
          break;
      }
    }

    // Availability filter
    if (show) {
      filteredData = filteredData.filter((prd) => {
        switch (show) {
          case "available":
            return prd.quantity > 0;
          case "notavailable":
            return prd.quantity === 0;
          default:
            return true;
        }
      });
    }

    // Price filter
    if (price) {
      filteredData = filteredData.filter((prd) => {
        const { min, max } = JSON.parse(decodeURIComponent(price));
        return (!min || prd.price > min) && (!max || prd.price < max);
      });
    }

    // Brand filter
    if (brand) {
      filteredData = filteredData.filter(
        (prd) => prd.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    return NextResponse.json(filteredData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching or filtering data:", {
        message: error.message,
        stack: error.stack,
        requestUrl: request.url,
        queryParams: request.url.split("?")[1],
      });
    } else {
      console.error("Unknown error:", error);
    }

    return NextResponse.json(
      { error: `Error fetching or filtering data: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
