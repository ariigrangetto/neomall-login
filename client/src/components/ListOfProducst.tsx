import { Link } from "react-router";
import useCartActions from "../Hooks/cartReducerActions.tsx";
import { useUrl } from "../Hooks/useUrl.tsx";
import SearchProducts from "./SearchProducts.tsx";
import Pagination from "./Pagination.tsx";

export default function ListOfProducts() {
  const { addToCart, cart } = useCartActions();
  const {
    handleChangePage,
    totalPages,
    handleUpdateInputSearch,
    filteredProducts,
    setFilters,
    currentPage,
  } = useUrl();

  return (
    <>
      <header>
        <Link to='cart' className='cart-icon'>
          cart
        </Link>
      </header>
      <h1>List of products:</h1>
      <SearchProducts
        setFilter={setFilters}
        onChangeInputValue={handleUpdateInputSearch}
      />
      {filteredProducts.length > 0 ? (
        <>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h2>
                  {product.title} {product.category}
                </h2>
                <strong>{product.price}</strong>
                <p>{product.description}</p>
                <button onClick={() => addToCart(product)}>
                  {cart.some((item) => item.id === product.id)
                    ? "Agregado al carrito"
                    : "Agregar al carrito"}
                </button>
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
