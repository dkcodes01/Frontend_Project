
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Search, filter and sorting states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  // Product pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Page number grouping
  const [pageGroup, setPageGroup] = useState(0);
  const pagesPerGroup = 10;

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=0"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Reset pagination when filters change
  const resetPagination = () => {
    setCurrentPage(1);
    setPageGroup(0);
  };

  // Search, category filter and sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low-high") {
        return a.price - b.price;
      }

      if (sort === "high-low") {
        return b.price - a.price;
      }

      return 0;
    });

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  // Calculate products for the current page
  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Calculate the 10 visible page numbers
  const startPage = pageGroup * pagesPerGroup + 1;

  const endPage = Math.min(
    startPage + pagesPerGroup - 1,
    totalPages
  );

  const visiblePages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index
  );

  // Loading state
  if (loading) {
    return <h2 className="message">Loading products...</h2>;
  }

  // Error state
  if (error) {
    return (
      <div className="message">
        <h2 className="error">Error: {error}</h2>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1>ShopEase Store</h1>

      <p className="subtitle">
        Discover products you'll love
      </p>

      {/* Search, category and sorting */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetPagination();
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            resetPagination();
          }}
        >
          <option value="all">All Categories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            resetPagination();
          }}
        >
          <option value="default">Default Sorting</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Results count */}
      <p className="results-count">
        Showing{" "}
        {filteredProducts.length === 0 ? 0 : startIndex + 1}
        {" - "}
        {Math.min(
          startIndex + productsPerPage,
          filteredProducts.length
        )}
        {" of "}
        {filteredProducts.length} products
      </p>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <p className="empty-message">
          No products found. Try another search!
        </p>
      ) : (
        <>
          <div className="products-grid">
            {currentProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />

                <h3>{product.title}</h3>

                <p className="description">
                  {product.description}
                </p>

                <p className="price">
                  ${product.price.toFixed(2)}
                </p>

                <p className="rating">
                  ⭐ {product.rating}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="view-details-button"
                >
                  View Details
                </Link>

                <button
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="pagination">
              {/* Previous page */}
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    const previousPage = currentPage - 1;

                    setCurrentPage(previousPage);

                    if (previousPage < startPage) {
                      setPageGroup((group) => group - 1);
                    }
                  }
                }}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Show only 10 page numbers */}
              {visiblePages.map((page) => (
                <button
                  key={page}
                  className={
                    currentPage === page ? "active-page" : ""
                  }
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              {/* Next page */}
              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    const nextPage = currentPage + 1;

                    setCurrentPage(nextPage);

                    if (nextPage > endPage) {
                      setPageGroup((group) => group + 1);
                    }
                  }
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;

