import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

function Wishlist() {
  const { wishlist, toggleWishlist } = useStore();
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="wishlist-page">
      <div className="section-heading">
        <p>Wishlist</p>
        <h1>Saved Pieces</h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="empty-state">
          <h2>Your wishlist is empty</h2>
          <Link to="/collection">Browse collection</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => (
            <article key={product.id} className="wishlist-card">
              <img src={product.image} alt={product.name} />
              <div>
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <strong>${product.price}</strong>
              </div>
              <button type="button" onClick={() => toggleWishlist(product.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
