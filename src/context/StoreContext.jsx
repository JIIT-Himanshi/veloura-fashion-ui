import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';

const STORE_KEY = 'veloura-store-v1';
const StoreContext = createContext(null);

function readInitialStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { wishlist: [], cart: [] };
    const parsed = JSON.parse(raw);
    return {
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
    };
  } catch {
    return { wishlist: [], cart: [] };
  }
}

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readInitialStore().wishlist);
  const [cart, setCart] = useState(() => readInitialStore().cart);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ wishlist, cart }));
  }, [wishlist, cart]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const addToCart = (id, size = 'M') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { id, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          if (!product) return null;
          return {
            ...item,
            product,
            lineTotal: item.quantity * product.price,
          };
        })
        .filter(Boolean),
    [cart],
  );

  const cartTotal = cartDetailed.reduce((sum, item) => sum + item.lineTotal, 0);

  const value = {
    wishlist,
    cart,
    cartDetailed,
    cartTotal,
    toggleWishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInWishlist: (id) => wishlist.includes(id),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return context;
}
