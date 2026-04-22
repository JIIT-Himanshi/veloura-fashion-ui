import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

function Cart() {
  const { cartDetailed, cartTotal, updateQuantity, removeFromCart, clearCart } = useStore();

  return (
    <section className="cart-page">
      <div className="section-heading">
        <p>Cart</p>
        <h1>Selected Pieces</h1>
      </div>

      {cartDetailed.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <Link to="/collection">Explore collection</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartDetailed.map((item) => (
              <article key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div className="cart-item-copy">
                  <p>{item.product.category}</p>
                  <h3>{item.product.name}</h3>
                  <small>Size {item.size}</small>
                </div>

                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <strong>${item.lineTotal}</strong>

                <button
                  type="button"
                  className="remove-link"
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <p>
              Total <strong>${cartTotal}</strong>
            </p>
            <button type="button" className="btn-primary">
              Checkout
            </button>
            <button type="button" className="btn-secondary" onClick={clearCart}>
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;
