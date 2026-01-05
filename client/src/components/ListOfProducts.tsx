import { Link } from "react-router";
import { useUrl } from "../Hooks/useUrl.tsx";
import SearchProducts from "./SearchProducts.tsx";
import Pagination from "./Pagination.tsx";
import Header from "./Header.tsx";
import { useEffect, useState } from "react";
import { getCart } from "../api/cart.js";
import useCartActions from "../hooks/cartActions.tsx";
import useAuth from "../hooks/useAuth.tsx";

export default function ListOfProducts() {
  const { cart, addProduct } = useCartActions();
  const { isAuthenticated } = useAuth();
  const {
    handleChangePage,
    totalPages,
    handleUpdateInputSearch,
    totalResult,
    setFilters,
    loading,
    currentPage,
  } = useUrl();

  return (
    <>
      <Header />
      <h1>List of products:</h1>
      <SearchProducts
        setFilter={setFilters}
        onChangeInputValue={handleUpdateInputSearch}
      />
      {loading ? (
        <p>Loading filtered products</p>
      ) : totalResult?.length > 0 ? (
        <>
          <ul>
            {totalResult.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.title} />
                <h2>
                  {product.title} {product.category}
                </h2>
                <strong>{product.price}</strong>
                <p>{product.description}</p>

                {isAuthenticated ? (
                  <button onClick={() => addProduct(product.id)}>
                    {cart.find((item) => item.id === product.id)
                      ? "Agregado al carrito"
                      : "Agregar al carrito"}
                  </button>
                ) : (
                  <Link to='/login'>Agregar al carrito </Link>
                )}
                {/* <button onClick={() => addProduct(product.id)}>
                  {cart.find((item) => item.id === product.id)
                    ? "Agregado al carrito"
                    : "Agregar al carrito"}
                </button> */}
                <Link to={`/products/details/${product.id}`}>Ver detalle</Link>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handleChangePage}
          />
        </>
      ) : (
        <h1>Not search found, try again</h1>
      )}
    </>
  );
}
