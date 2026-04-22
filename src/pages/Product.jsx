import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

function Product() {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => item.id === Number(id)), [id]);
  const [size, setSize] = useState('M');
  const { addToCart, isInWishlist, toggleWishlist } = useStore();

  if (!product) {
    return (
      <section className="empty-state">
        <h2>Product not found</h2>
        <Link to="/collection">Back to collection</Link>
      </section>
    );
  }

  const wished = isInWishlist(product.id);

  return (
    <section className="product-page">
      <img src={product.image} alt={product.name} className="product-detail-image" />

      <div className="product-detail-copy">
        <p>{product.category}</p>
        <h1>{product.name}</h1>
        <strong>${product.price}</strong>
        <p>{product.description}</p>

        <div className="size-list">
          {sizes.map((item) => (
            <button
              key={item}
              type="button"
              className={size === item ? 'size-btn active' : 'size-btn'}
              onClick={() => setSize(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-actions">
          <button type="button" className="btn-primary" onClick={() => addToCart(product.id, size)}>
            Add to Cart
          </button>
          <button
            type="button"
            className={wished ? 'btn-secondary active' : 'btn-secondary'}
            onClick={() => toggleWishlist(product.id)}
          >
            {wished ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Product;
