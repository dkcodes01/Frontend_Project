
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">YOUR EVERYDAY SHOPPING DESTINATION</span>

          <h1>
            Find your next
            <span> favourite thing.</span>
          </h1>

          <p>
            Discover products you'll love, explore new arrivals,
            and enjoy a simpler shopping experience with ShopEase.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="primary-btn">
              Explore Products <span>→</span>
            </Link>

            <Link to="/cart" className="secondary-btn">
              View Your Cart
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>Easy</strong>
              <span>Shopping</span>
            </div>
            <div>
              <strong>Fresh</strong>
              <span>Discoveries</span>
            </div>
            <div>
              <strong>Simple</strong>
              <span>Checkout</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow"></div>
          <div className="hero-product">
            <span className="hero-emoji">🛍️</span>
            <span className="floating-badge badge-top">
              ✨ Find something new
            </span>
            <span className="floating-badge badge-bottom">
              Your next favourite awaits
            </span>
          </div>
        </div>
      </section>

      <section className="category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE THE STORE</span>
            <h2>What are you looking for?</h2>
            <p>Browse our collection and find your favourites.</p>
          </div>

          <Link to="/products" className="text-link">
            All products →
          </Link>
        </div>

        <div className="category-grid">
          <Link
            to="/products"
            className="category-card category-blue"
          >
            <span className="category-icon">🎧</span>
            <span>
              <strong>Electronics</strong>
              <small>Discover useful gadgets</small>
            </span>
            <span className="category-arrow">↗</span>
          </Link>

          <Link
            to="/products"
            className="category-card category-purple"
          >
            <span className="category-icon">👗</span>
            <span>
              <strong>Fashion</strong>
              <small>Find your own style</small>
            </span>
            <span className="category-arrow">↗</span>
          </Link>

          <Link
            to="/products"
            className="category-card category-orange"
          >
            <span className="category-icon">🏠</span>
            <span>
              <strong>Home & Living</strong>
              <small>Little things for your space</small>
            </span>
            <span className="category-arrow">↗</span>
          </Link>
        </div>
      </section>

      <section className="home-bottom">
        <div>
          <span className="eyebrow">YOUR NEXT DISCOVERY STARTS HERE</span>
          <h2>Good finds are just a click away.</h2>
          <p>Explore the full collection and find something you love.</p>
        </div>

        <Link to="/products" className="primary-btn">
          Start Shopping →
        </Link>
      </section>
    </main>
  );
}

export default Home;
