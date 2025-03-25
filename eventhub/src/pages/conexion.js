import React from 'react';
import { Link } from 'react-router-dom';  // Assure-toi d'importer `Link` ici
import '../styles/connexion.scss';

function Conexion() {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour gérer la soumission du formulaire (par exemple, validation)
        console.log("Form submitted!");
    };

    return (
        <div className="welcome-container">
            <div className="welcome-block">
                <h1>Welcome Back</h1>
                <p>Bienvenue sur nôtre plateforme. Veuillez vous se connecter pour continuer.</p>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label className="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                    
                    <label className="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                   <div className="remember-me">
                        <input 
                            type="checkbox" 
                            id="rememberMe" 
                            name="rememberMe" 
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                    <p className="forgot-password">
                        {/* Utilisation de `Link` pour la navigation */}
                        <Link to="/ForgotPassword" className="ForgotPassword-link">J'ai oublié mon mot de passe </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Conexion;
