import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useStore();
  const wished = isInWishlist(product.id);

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
    >
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="product-overlay">View Detail</span>
      </Link>

      <div className="product-meta">
        <div>
          <p>{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <strong>${product.price}</strong>
      </div>

      <button
        type="button"
        className={wished ? 'wishlist-btn active' : 'wishlist-btn'}
        onClick={() => toggleWishlist(product.id)}
      >
        {wished ? 'Saved' : 'Save to Wishlist'}
      </button>
    </motion.article>
  );
}

export default ProductCard;
