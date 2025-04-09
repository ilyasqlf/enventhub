import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Api/config';
import './Auth.css';
import logo from '../../assets/logo.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    pseudonyme: '',
    Email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/register', formData);
      alert('Inscription réussie !');
      navigate('/login');
    } catch (error) {
      alert('Erreur d\'inscription : ' + error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="auth-logo" />
        </Link>
      </div>

      <div className="auth-card">
        <h2>Inscription</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Prénom</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="First_Name"
                value={formData.First_Name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nom</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="Last_Name"
                value={formData.Last_Name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Pseudonyme</label>
            <div className="input-with-icon">
              <i className="fas fa-calendar"></i>
              <input
                type="text"
                name="pseudonyme"
                value={formData.pseudonyme}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button">
            S'inscrire
          </button>

          <div className="auth-links">
            <Link to="/login">Déjà un compte ? Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;