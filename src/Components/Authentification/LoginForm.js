import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Api/config';
import { UserContext } from '../../context/UserContext';
import './Auth.css';
import logo from '../../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 
  const [formData, setFormData] = useState({
    Email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', formData);
      alert('Connexion réussie !');
      localStorage.setItem('token', response.data.token); // Stockez le token dans le localStorage
      setUser(response.data.user);
      navigate('/'); // Redirigez vers la page d'accueil après la connexion
    } catch (error) {
      console.error('Erreur de connexion :', error.response);
      alert('Erreur de connexion : ' + (error.response?.data?.message || 'Erreur inconnue'));
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
        <h2>Connexion</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
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
                placeholder="Mot de passe"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;