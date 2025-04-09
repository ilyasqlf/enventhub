import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Section Marque avec logo */}
        <div className="footer-brand">
          <div className="footer-logo-container">
            <img src={logo} alt="ÉVENTHÈS" className="footer-logo" />
          </div>
          
          {/* Navigation principale */}
          
        </div>

        {/* Section Réseaux sociaux */}
        <div className="footer-social">
          <h3 className="social-title">Suivez-nous</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-item">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-item">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-item">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} EVENTHUB. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

