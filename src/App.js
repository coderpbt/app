import React, { useEffect, useRef } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';

// Declare the dataLayer globally
window.dataLayer = window.dataLayer || [];

// Push events to dataLayer with additional details
const pushToDataLayer = (event, previous_url) => {
  if (!window.dataLayer.some(item => item.event === event && item.url === window.location.href)) {
    window.dataLayer.push({
      event,
      timestamp: new Date().toISOString(),
      url: window.location.href, // current URL
      previous_url: previous_url || document.referrer // previous URL (manual or fallback to referrer)
    });
    console.log('dataLayer:', window.dataLayer);
  }
};

const HomePage = () => {
  useEffect(() => {
    pushToDataLayer('screen_load', document.referrer);
  }, []);

  return (
    <div className='container'>
      <h1>Home Page</h1>
    </div>
  );
};

const Page1 = () => {
  useEffect(() => {
    pushToDataLayer('screen_load', document.referrer);
  }, []);

  return (
    <div className='container'>
      <h1>Page 1</h1>
    </div>
  );
};

const Page2 = () => {
  useEffect(() => {
    pushToDataLayer('screen_load', document.referrer);
  }, []);

  return (
    <div className='container'>
      <h1>Page 2</h1>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousUrlRef = useRef('');

  // Handle link clicks
  const handleLinkClick = (e) => {
    e.preventDefault();
    pushToDataLayer('click', previousUrlRef.current);
    navigate(e.target.getAttribute('href'));
  };

  useEffect(() => {
    // After navigation, trigger the screen_load event
    pushToDataLayer('screen_load', previousUrlRef.current);
    // Update previous URL with the current one before changing
    previousUrlRef.current = window.location.href;
  }, [location]);

  return (
    <div className='container'>
      <nav>
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/page1" onClick={handleLinkClick}>Page 1</Link>
        <Link to="/page2" onClick={handleLinkClick}>Page 2</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  );
};

export default App;
