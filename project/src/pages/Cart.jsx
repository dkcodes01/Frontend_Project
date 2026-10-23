
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h1>Your cart is waiting for you</h1>
          <p>
            Looks like you haven't added anything yet.
            Explore the store and find something you love.
          </p>
          <Link to="/products" className="primary-btn">
            Explore Products →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h1>Shopping Cart</h1>
          <p>
            {totalItems} {totalItems === 1 ? "item" : "items"}{" "}
            in your cart
          </p>
        </div>

        <Link to="/products" className="continue-link">
          ← Continue shopping
        </Link>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-product-image">
                <img src={item.thumbnail} alt={item.title} />
              </div>

              <div className="cart-item-info">
                <span className="cart-category">
                  {item.category}
                </span>

                <h3>{item.title}</h3>

                <p className="cart-unit-price">
                  ${item.price.toFixed(2)} each
                </p>

                <div className="cart-item-bottom">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      aria-label={`Decrease ${item.title} quantity`}
                      disabled={item.quantity === 1}
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      −
                    </button>

                    <span className="quantity-value">
                      {item.quantity}
                    </span>

                    <button
                      className="quantity-btn"
                      aria-label={`Increase ${item.title} quantity`}
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="cart-line-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <span className="eyebrow">ORDER OVERVIEW</span>
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items ({totalItems})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-label">Free</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>$0.00</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() =>
              alert("Checkout will be implemented next!")
            }
          >
            Proceed to Checkout →
          </button>

          <p className="checkout-note">
            This is a demo checkout. No payment will be taken.
          </p>

          <div className="secure-note">
            <span>🔒</span>
            <span>
              <strong>Your cart is saved</strong>
              <small>Items stay saved in this browser.</small>
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
