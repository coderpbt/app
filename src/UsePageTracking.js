import React, { useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';

// Declare the dataLayer array
const dataLayer = [];

const App = () => {
  const navigate = useNavigate();

  // Function to push events into dataLayer array
  const pushToDataLayer = (event) => {
    dataLayer.push({ event, timestamp: new Date().toISOString() });
    console.log('Data Layer:', dataLayer);
  };

  // Screen load event
  useEffect(() => {
    pushToDataLayer('screen_load');
  }, []);

  // Handle browser back/forward navigation using popstate
  useEffect(() => {
    const handlePopState = () => {
      pushToDataLayer('screen_load');
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle page reload
  useEffect(() => {
    const handleBeforeUnload = () => {
      pushToDataLayer('screen_load');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle link clicks
  const handleLinkClick = (e) => {
    e.preventDefault();
    pushToDataLayer('click');
    navigate(e.target.getAttribute('href'));
  };

  return (
    <div className='container'>
      <h1>React Website</h1>
      <nav>
        <Link to="/page1" onClick={handleLinkClick}>Page 1</Link>
        <Link to="/page2" onClick={handleLinkClick}>Page 2</Link>
      </nav>
      <Routes>
        <Route path="/page1" element={<div>Page 1 Content</div>} />
        <Route path="/page2" element={<div>Page 2 Content</div>} />
      </Routes>
    </div>
  );
};

export default App;
