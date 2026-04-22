import { useMemo, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

function Collection() {
  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [],
  );
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts =
    activeFilter === 'All'
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <section className="collection-page">
      <div className="section-heading">
        <p>Collection</p>
        <h1>Curated Looks</h1>
      </div>

      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeFilter === category ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
}

export default Collection;
