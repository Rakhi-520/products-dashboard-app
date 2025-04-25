import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Prd } from "../constants/types";

export default function useFetch(
  url: string,
  searchParams?: ReadonlyURLSearchParams
) {
  const [data, setData] = useState<Prd[] | []>([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = useCallback(() => {

    startTransition(async () => {
      try {
        const queryString = searchParams ? searchParams.toString() : "";
        const path = queryString ? `${url}?${queryString}` : url;
        const response = await fetch(path);
        const result = (await response.json()) as Prd[];
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  }, [url, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending };
}
