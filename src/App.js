import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import './App.css';
import Home from './Components/Pages/Home';
import Billeterie from './Components/Pages/Billeterie';
import RegisterForm from './Components/Authentification/RegisterForm';
import LoginForm from './Components/Authentification/LoginForm';
import EventDetails from './Components/EventDetails';
import Payment from './Components/Pages/Payment';
import Footer from './Components/Footer';
import logo from './assets/logo.png';

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimez le token du localStorage
    setUser(null); // Réinitialisez l'utilisateur dans le contexte
    alert('Déconnexion réussie !');
  };

  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/events">Billeterie</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
          </>
        ) : (
          <>
            <li className="welcome-message">Bienvenue, {user.pseudonyme} !</li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Déconnexion
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const weeklyEvents = [
    { id: 1, title: 'Festival Electro', date: '31 Mars 2025', location: 'Lyon', image: 'path/to/concert.jpg', lat: 45.764043, lng: 4.835659 },
    { id: 2, title: 'Pièce Classique', date: '28 Mars 2025', location: 'Paris', image: 'path/to/theatre.jpg', lat: 48.856613, lng: 2.352222 },
    { id: 3, title: 'Match de Football', date: '30 Mars 2025', location: 'Marseille', image: 'path/to/sports.jpg', lat: 43.296482, lng: 5.36978 },
    { id: 4, title: 'LAN Party', date: '1 Avril 2025', location: 'Lille', image: 'path/to/gaming.jpg', lat: 50.62925, lng: 3.057256 },
  ];

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Billeterie />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/event/:eventId" element={<EventDetails events={weeklyEvents} />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;