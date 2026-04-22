import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const links = [
  { to: '/', label: 'About' },
  { to: '/collection', label: 'Collection' },
  { to: '/product/1', label: 'Model' },
];

function Navbar({ onMenuToggle }) {
  const { wishlist, cart } = useStore();

  return (
    <motion.header
      className="nav"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      <div className="logo-circle" aria-label="Veloura logo" />

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="menu-btn" onClick={onMenuToggle}>
        <span className="menu-count">{wishlist.length + cart.length}</span>
        <span className="menu-lines" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
    </motion.header>
  );
}

export default Navbar;
