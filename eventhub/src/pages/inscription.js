import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos el hook para la navegación
import "../styles/inscription.scss";

function Inscription() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptConditions, setAcceptConditions] = useState(false); // Esto para aceptar las condiciones
    const navigate = useNavigate(); // Usamos el hook para navegar a otras paginas 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Verificación del patrón del password
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordPattern.test(password)) {
          alert("Le mot de passe doit comporter au moins huit caractères, au moins une majuscule, une minuscule, un chiffre et un caractère spécial.");
          return;
        }
    
        // Verificación de que las condiciones sean aceptadas
        if (!acceptConditions) { // Verificamos acceptConditions correctamente
          alert("Veuillez accepter les conditions légales.");
          return;
        }
    
        // Redirige a la página de inicio de sesión si todo es válido
        alert('Formulaire soumis avec succès!');
        navigate('/conexion');
    };

    return (
        <div className="signup-container">
  <div className="forms-container">
    <form onSubmit={handleSubmit}>
      {/* Espacio para la foto */}
      <div className="photo-container">
        <div className="photo-placeholder">Photo</div>
      </div>

      {/* Contenedor para los inputs de "Prénom" y "Nom de famille" */}
      <div className="input-container-group">
        <div className="input-container">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Entrez votre prénom"
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="lastName">Nom de famille</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Entrez votre nom"
            required
          />
        </div>
      </div>

      <div className="input-container">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choisissez un nom d'utilisateur"
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Créez un mot de passe"
          required
        />
      </div>

      {/* Checkbox de condiciones legales */}
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="terms"
          checked={acceptConditions}
          onChange={(e) => setAcceptConditions(e.target.checked)}
        />
        <label htmlFor="terms">
          J'accepte les conditiones legales<a href="/conditions" target="_blank" rel="noopener noreferrer">conditions legales</a>
        </label>
      </div>

      <button type="submit" className="submit-btn">Soumettre</button>
    </form>
  </div>
</div>
    );
}

export default Inscription;