import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import NewLoanModal from './components/NewLoanModal';

const App = () => {
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);

  return (
    <Router>
      <Header />
      <motion.main
        initial='initial'
        animate='animate'
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
      >
        <Routes>
          <Route path="/" element={<Home onOpenLoanModal={() => setIsLoanModalOpen(true)} />} />
        </Routes>
      </motion.main>
      <Footer />
      
      <NewLoanModal 
        isOpen={isLoanModalOpen} 
        onClose={() => setIsLoanModalOpen(false)} 
      />
    </Router>
  );
};

export default App;
