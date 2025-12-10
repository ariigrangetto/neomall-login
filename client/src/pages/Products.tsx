import { useEffect, useState } from "react";
import type { Product } from "../utils/types.d.ts";
import getData from "../Service/getData.js";
import { Helmet } from "react-helmet";
import ListOfProducts from "../Components/ListOfProducst.tsx";
import WithoutProducts from "../Components/WithoutProducts.tsx";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function FetchData() {
      const data = await getData();
      setProducts(data.products);
    }

    FetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>NeoMall products</title>
      </Helmet>

      {products.length !== 0 ? <ListOfProducts /> : <WithoutProducts />}
    </>
  );
}
