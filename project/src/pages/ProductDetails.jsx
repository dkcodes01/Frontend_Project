
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  // Fetch the selected product
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setAdded(false);

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Add product to Redux cart
  function handleAddToCart() {
    dispatch(addToCart(product));
    setAdded(true);
  }

  if (loading) {
    return <p className="message">Loading product...</p>;
  }

  if (error) {
    return (
      <div className="page-content">
        <h2 className="error">{error}</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="page-content">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <div className="details-layout">
        <div className="details-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="details-info">
          <p className="category-label">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <p className="details-description">
            {product.description}
          </p>

          <p className="rating">
            ⭐ {product.rating} / 5
          </p>

          <h2 className="price">
            ${product.price.toFixed(2)}
          </h2>

          <p>
            Availability:{" "}
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>

          <button
            className="details-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {product.stock <= 0
              ? "Out of Stock"
              : added
              ? "Add Again"
              : "Add to Cart"}
          </button>

          {added && (
            <p className="success-message">
              ✓ Product added to your cart!
            </p>
          )}

          <div className="details-actions">
            <Link to="/cart">View Shopping Cart →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
