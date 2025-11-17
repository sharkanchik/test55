// C:\Users\yurab\Desktop\test52\test55\src\App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';
import SuccessPage from './SuccessPage';
import Footer from './Footer';



const App = () => {
  return (
        <Router>
        <Routes>
            {}
            <Route path="/" element={<ApplicationForm />} /> 
            
            {}
            <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;