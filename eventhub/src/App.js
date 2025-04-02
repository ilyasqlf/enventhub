import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';
import Billeterie from './Components/Pages/Billeterie';
import RegisterForm from './Components/Authentification/RegisterForm';
import LoginForm from './Components/Authentification/LoginForm';
import EventDetails from './Components/EventDetails';
import Payment from './Components/Pages/Payment';
import logo from './assets/logo.png';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const weeklyEvents = [
    { id: 1, title: 'Festival Electro', date: '25 Mars 2024', location: 'Lyon', image: 'path/to/concert.jpg', lat: 45.764043, lng: 4.835659 },
    { id: 2, title: 'Pièce Classique', date: '28 Mars 2024', location: 'Paris', image: 'path/to/theatre.jpg', lat: 48.856613, lng: 2.352222 },
    { id: 3, title: 'Match de Football', date: '30 Mars 2024', location: 'Marseille', image: 'path/to/sports.jpg', lat: 43.296482, lng: 5.36978 },
    { id: 4, title: 'LAN Party', date: '1 Avril 2024', location: 'Lille', image: 'path/to/gaming.jpg', lat: 50.62925, lng: 3.057256 },
  ];

  return (
    <Router>
      <div className="App">
        <nav>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            ☰
          </div>
          <ul className={menuOpen ? 'show' : ''}>
            <li>
              <Link to="/" onClick={toggleMenu}>Accueil</Link>
            </li>
            <li>
              <Link to="/events" onClick={toggleMenu}>Billeterie</Link>
            </li>
            <li>
              <Link to="/register" className="register-button" onClick={toggleMenu}>S'inscrire</Link>
            </li>
            <li>
              <Link to="/login" className="login-button" onClick={toggleMenu}>Se connecter</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Billeterie />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/event/:eventId" element={<EventDetails events={weeklyEvents} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
};









export default App;