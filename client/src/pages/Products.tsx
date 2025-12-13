import { useEffect, useState } from "react";
import type { Product } from "../utils/types.d.ts";
import getData from "../Service/getData.js";
import { Helmet } from "react-helmet";
import ListOfProducts from "../Components/ListOfProducst.tsx";
import WithoutProducts from "../Components/WithoutProducts.tsx";
import useAuth from "../hooks/useAuth.tsx";
import { Link, useLocation } from "react-router";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const path = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const { logout, login, isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    async function FetchData() {
      try {
        const data = await getData();
        setProducts(data.products);
      } catch (error) {
        throw new Error("Error fetching products");
      } finally {
        setLoading(false);
      }
    }

    FetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>NeoMall products</title>
      </Helmet>

      {loading ? (
        <h1>Cargando productos...</h1>
      ) : products.length > 0 ? (
        <ListOfProducts />
      ) : (
        <WithoutProducts />
      )}
    </>
  );
}
