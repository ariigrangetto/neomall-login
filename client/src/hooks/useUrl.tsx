import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { FiltersType, Product } from "../utils/types.d.ts";

const RESULT_PER_PAGE = 10;

export const useUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    return Number.isNaN(page) ? 1 : page;
  });

  const [filters, setFilters] = useState<FiltersType>({
    category: searchParams.get("category") || "",
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  //changing url in case of changed page, filter and search
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let baseUrl = `http://localhost:8080/products`;

        const params = new URLSearchParams();

        if (filters.category) {
          params.append("category", filters.category);
        }

        if (inputValue) {
          params.append("title", inputValue);
        }

        const response = await fetch(`${baseUrl}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          setLoading(false);
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setFilteredProducts(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage, filters.category, inputValue]);

  useEffect(() => {
    setSearchParams(() => {
      const params = new URLSearchParams();

      if (filters.category) params.set("category", filters.category);

      if (inputValue) params.set("title", inputValue);

      if (currentPage > 1) params.set("page", currentPage.toString());

      return params;
    });
  }, [filters.category, currentPage, inputValue]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / RESULT_PER_PAGE);

  const handleUpdateInputSearch = (text: string) => {
    setInputValue(text);
  };

  return {
    handleChangePage,
    totalPages,
    loading,
    handleUpdateInputSearch,
    filteredProducts,
    setFilters,
    currentPage,
  };
};
