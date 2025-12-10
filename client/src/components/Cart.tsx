import { Link } from "react-router";
import useCartActions from "../Hooks/cartReducerActions.tsx";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartActions();

  return (
    <>
      <Helmet>
        <title>NeoMall cart</title>
      </Helmet>
      <h1>Aqui va el carrito</h1>
      <Link to='/products'>Return to products</Link>

      {cart.length > 0 ? (
        <ul>
          {cart.map((product) => (
            <>
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <h2>
                  {product.title} {product.category}
                </h2>
                <strong>{product.price}</strong>
                <p>{product.description}</p>
                <Link to={`/products/details/${product.id}`}>Ver detalle</Link>
              </li>
              <button onClick={() => removeFromCart(product.id)}>
                Remove from cart
              </button>
            </>
          ))}
          <button onClick={clearCart}>Clear cart</button>
        </ul>
      ) : (
        <h1>No cuenta con productos en el carrito aún</h1>
      )}
    </>
  );
}
