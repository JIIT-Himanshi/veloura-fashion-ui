import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const models = [
  {
    id: 1,
    name: 'Alexandra Brunchi',
    subname: 'Victoria Malone',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    preview:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Noelle Arden',
    subname: 'Mira Solene',
    image:
      'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=900&q=80',
    preview:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Isla Monet',
    subname: 'Ariana Cloud',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    preview:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80',
  },
];

function Hero() {
  const [index, setIndex] = useState(0);
  const active = models[index];
  const next = useMemo(() => models[(index + 1) % models.length], [index]);

  return (
    <section className="hero-frame">
      <motion.div
        className="hero-left-copy"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: { opacity: 0, y: 18 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
          },
        }}
      >
        <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
          New Collection
        </motion.p>
        <motion.h3 variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
          Read how to spark this season with refined selections, designed around your preferences.
        </motion.h3>
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
          <Link to="/collection" className="hero-cta">
            Explore
            <motion.span whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 280, damping: 20 }}>
              -&gt;
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero-socials">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          Facebook
        </a>
      </div>

      <p className="hero-year">2026</p>

      <AnimatePresence mode="wait">
        <motion.h1
          key={active.name}
          className="hero-overlay-name"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 0.8, y: 0 }}
          exit={{ opacity: 0, y: -22 }}
          transition={{ duration: 0.7 }}
        >
          {active.name}
        </motion.h1>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.img
          key={active.image}
          src={active.image}
          alt={active.name}
          className="hero-main-image"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <motion.h2
        className="hero-bottom-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.78, y: 0 }}
        transition={{ duration: 0.85, delay: 0.25 }}
      >
        Fashion Inspiration
      </motion.h2>

      <motion.button
        type="button"
        className="hero-preview"
        onClick={() => setIndex((prev) => (prev + 1) % models.length)}
        initial={{ opacity: 0, x: 46 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span>{next.subname}</span>
        <img src={next.preview} alt={next.subname} />
      </motion.button>
    </section>
  );
}

export default Hero;
