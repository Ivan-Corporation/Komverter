import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.module.scss';
import Container from '../Container';
import SearchBar from '../SearchBar';
import { motion } from 'framer-motion/dist/framer-motion'


const Hero = ({ searchTerm, onSubmit, onChange }) => (
  <motion.div
                initial={{ opacity: 0, y: -180 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1,
                    delay: 0.8,
                }}
                >
  <section className={styles.hero}>
    
    <Container>
      <div className={styles.heroContent}>
      <motion.div
                initial={{ opacity: 0, x: -180 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1,
                    delay: 1.4,
                }}
                >
        <h1>Convert Youtube videos to mp3 🎧</h1>
        </motion.div>
        <motion.div
                initial={{ opacity: 0, x: 180 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1,
                    delay: 1.6,
                }}
                >
        <p>Copy video link and paste it here (or just write title):</p>
        </motion.div>
        <SearchBar
          className={styles.heroSearchBar}
          searchTerm={searchTerm}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </div>
    </Container>
    
  </section>
  </motion.div>
);

Hero.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Hero;
