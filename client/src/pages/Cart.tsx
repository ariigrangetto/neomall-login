import { Link } from "react-router";
import { Helmet } from "react-helmet";
import useCartActions from "../hooks/cartActions.tsx";

export default function Cart() {
  const { cart, addProduct, decrementQuantity, deleteProductFromCart } =
    useCartActions();

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
                <img src={product.image} alt={product.title} />
                <h2>
                  {product.title} {product.category}
                </h2>
                <strong>{product.price}</strong>
                <p>{product.description}</p>
                <p>{product.quantity}</p>
                <Link to={`/products/details/${product.id}`}>Ver detalle</Link>
                <button onClick={() => addProduct(product.id)}>+</button>
                <button onClick={() => decrementQuantity(product.id)}>-</button>
                <button onClick={() => deleteProductFromCart(product.id)}>
                  Remove from cart
                </button>
              </li>
            </>
          ))}
        </ul>
      ) : (
        <h1>No cuenta con productos en el carrito aún</h1>
      )}
    </>
  );
}
