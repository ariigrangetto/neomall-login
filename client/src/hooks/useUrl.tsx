import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { FiltersType, Product } from "../utils/types.d.ts";

const RESULT_PER_PAGE = 10;

export const useUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    return Number.isNaN(page) ? 1 : page;
  });

  const [filters, setFilters] = useState<FiltersType>({
    category: searchParams.get("category") || "",
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  //changing url in case of changed page, filter and search
  useEffect(() => {
    async function fetchData() {
      const offset = (currentPage - 1) * RESULT_PER_PAGE;
      let baseUrl = `https://dummyjson.com/products`;

      if (filters.category) {
        baseUrl = `https://dummyjson.com/products/category/${filters.category}`;
      }

      const params = new URLSearchParams();
      params.append("limit", RESULT_PER_PAGE.toString());
      params.append("skip", offset.toString());

      if (inputValue) {
        baseUrl = `https://dummyjson.com/products/search?${params.toString()}&q=${inputValue}`;
      } else {
        baseUrl = `${baseUrl}?${params.toString()}`;
      }

      const response = await fetch(`${baseUrl}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setFilteredProducts(data.products);
      setTotal(data.total);
    }
    fetchData();
  }, [currentPage, filters.category, inputValue]);

  useEffect(() => {
    setSearchParams(() => {
      const params = new URLSearchParams();

      if (filters.category) params.set("category", filters.category);

      if (inputValue) params.set("q", inputValue);

      if (currentPage > 1) params.set("page", currentPage.toString());

      return params;
    });
  }, [filters.category, currentPage, inputValue]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(total / RESULT_PER_PAGE);

  const handleUpdateInputSearch = (text: string) => {
    setInputValue(text);
  };

  return {
    handleChangePage,
    totalPages,
    handleUpdateInputSearch,
    filteredProducts,
    setFilters,
    currentPage,
  };
};
