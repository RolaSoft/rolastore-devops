
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>RolaStore</h1>

      <p>RolaSoft Technologies E-Commerce Platform</p>

      <hr />

      <h2>Products</h2>

      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px"
            }}
          >
            <h3>{product.name}</h3>

            <p>
              ₦{product.price.toLocaleString()}
            </p>

            <button>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;

