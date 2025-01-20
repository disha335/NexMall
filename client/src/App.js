import React from 'react'
import Header from './components/header/Header'
import Pages from './components/mainPages/Pages'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider, GlobalState } from './GlobalState'
import LoginRegister from './LoginRegister'
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <DataProvider>
    <Router>
      <MainContent />
    </Router>
    </DataProvider>
  );
};

const MainContent = () => {
  const { pathname } = useLocation();

  // Check if the current route is login or register
  const isAuthPage = pathname === '/login' || pathname === '/register';
  return (
    <div className="App">
      {isAuthPage ? (
        <div className="login">
          <LoginRegister />
        </div>
      ) : (
        <div className='App'>
          <Header/>
          <Pages/>
          <Footer/>
        </div>
      )}
    </div>
  );
};

export default App;

