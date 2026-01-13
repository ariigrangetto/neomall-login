import { Link } from "react-router";
import { useUrl } from "../Hooks/useUrl.tsx";
import SearchProducts from "./SearchProducts.tsx";
import Pagination from "./Pagination.tsx";
import Header from "./Header.tsx";
import "./ListOfProducts.css";
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

  const findItem = (id: number | string) => {
    const findedProduct = cart.some((item) => item?.product_id === id);
    let text = findedProduct ? "Agregado al carrito" : "Agregar al carrito";
    let className = findedProduct ? "btn-added" : "btn-add";
    return { text, className };
  };

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
          <ul className='ul-products'>
            {totalResult.map((product) => (
              <li key={product.id} className='li-products'>
                <img src={product.image} alt={product.title} />
                <div className='description'>
                  <h2>
                    {product.title} {product.category}
                  </h2>
                  <strong>${product.price}</strong>
                  <p>{product.description}</p>
                  {isAuthenticated ? (
                    <button
                      onClick={() => addProduct(product.id)}
                      className={findItem(product.id).className}
                    >
                      {findItem(product.id).text}
                    </button>
                  ) : (
                    <Link to='/login' className='btn-link'>
                      Agregar al carrito
                    </Link>
                  )}
                </div>

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
