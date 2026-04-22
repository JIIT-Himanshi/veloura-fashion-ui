import { motion } from 'framer-motion';
import Hero from '../components/Hero';

function Home() {
  return (
    <>
      <Hero />

      <motion.section
        className="home-note"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Calm confidence, built in silhouettes.</h2>
        <p>
          Veloura balances clean tailoring, soft structure, and rich textures to create an
          understated feminine narrative rooted in modern editorial style.
        </p>
      </motion.section>
    </>
  );
}

export default Home;
