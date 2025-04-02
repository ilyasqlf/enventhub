import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // usar para navegar 
import '../styles/forgotPassword.scss';

function ForgotPassword() {
    const [email, setEmail] = useState(''); 
    const navigate = useNavigate(); 

    //  formulaire 
    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log('Email soumis:', email);
        // ALERT
        alert("Vérifiez votre e-mail, un lien vous à été envoyé pour changer votre mot de passe.");
        navigate('/conexion'); // dirige a la pagina que deseas
    };

    // Fonction pour gérer le clic sur "I have forgotten my password"
    const handleForgotPassword = () => {
        // Redirige vers la page de réinitialisation du mot de passe
        navigate('/conexion');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value); 
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Your Password?</h1>
            <p>Saisissez votre adresse email pour recevoir un lien pour réinitialiser votre mot de passe.</p>
            <div className="formu-container">
                <form onSubmit={handleSubmit}>
                    <label className="email" htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email} // Lier l'input à l'état local
                        onChange={handleEmailChange} // Mise à jour de l'email
                        required
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <p className="forgot-password">
                <button onClick={handleForgotPassword} className="forgot-password-link">
                    Retour à la page de conexion 
                </button>
            </p>
        </div>
    );
}

export default ForgotPassword;


        
   

