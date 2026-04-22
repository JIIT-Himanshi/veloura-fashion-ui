import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

function SidebarMenu({ isOpen, onClose }) {
  const { wishlist, cart } = useStore();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="menu-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="sidebar-menu"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="menu-close" onClick={onClose}>
              Close
            </button>
            <div className="sidebar-content">
              <Link to="/" onClick={onClose}>
                Home
              </Link>
              <Link to="/collection" onClick={onClose}>
                Collection
              </Link>
              <Link to="/wishlist" onClick={onClose}>
                Wishlist ({wishlist.length})
              </Link>
              <Link to="/cart" onClick={onClose}>
                Cart ({cart.length})
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default SidebarMenu;
