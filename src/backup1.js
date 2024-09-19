import React, { useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';

// Declare the dataLayer array
const dataLayer = [];

const pushToDataLayer = (event) => {
  dataLayer.push({ event, timestamp: new Date().toISOString() });
  console.log('Data Layer:', dataLayer);
};

const HomePage = () => {
  useEffect(() => {
    pushToDataLayer('screen_load');
  }, []);

  return (
    <div className='container'>
      <h1>Home Page</h1>
      <p>Data Layer: {JSON.stringify(dataLayer)}</p>
    </div>
  );
};

const Page1 = () => {
  useEffect(() => {
    pushToDataLayer('screen_load');
  }, []);

  return (
    <div className='container'>
      <h1>Page 1</h1>
      <p>Data Layer: {JSON.stringify(dataLayer)}</p>
    </div>
  );
};

const Page2 = () => {
  useEffect(() => {
    pushToDataLayer('screen_load');
  }, []);

  return (
    <div className='container'>
      <h1>Page 2</h1>
      <p>Data Layer: {JSON.stringify(dataLayer)}</p>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();

  // Handle link clicks
  const handleLinkClick = (e) => {
    e.preventDefault();
    pushToDataLayer('click');
    navigate(e.target.getAttribute('href'));
  };

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
