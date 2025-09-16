import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <motion.main
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </motion.main>
      <Footer />
    </Router>
  );
};

export default App;