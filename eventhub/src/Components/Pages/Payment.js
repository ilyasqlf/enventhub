import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import visaIcon from '../../assets/icons/visa.png';
import mastercardIcon from '../../assets/icons/mastercard.png';
import amexIcon from '../../assets/icons/amex.png';
import lockIcon from '../../assets/icons/lock.png';
import shieldIcon from '../../assets/icons/shield.png';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedEvent = location.state?.selectedEvent;
  const selectedCategory = location.state?.selectedCategory;

  const [isGuest, setIsGuest] = useState(false);
  const [cardType, setCardType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    detectCardType(cardNumber);
  }, [cardNumber]);

  const detectCardType = (number) => {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        setCardType(type);
        return;
      }
    }
    setCardType('');
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Numéro de carte invalide';
    if (!document.getElementById('expiryDate').value.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) 
      newErrors.expiryDate = 'Date d\'expiration invalide';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuestCheckout = () => {
    setIsGuest(true);
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation de traitement
    setIsProcessing(false);
    
    alert('Paiement effectué avec succès !');
    navigate('/');
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Paiement Sécurisé <img src={shieldIcon} alt="Secured" className="security-icon" /></h1>
        <div className="secure-notice">
          <img src={lockIcon} alt="Secure" />
          <span>Transaction 100% sécurisée</span>
        </div>
      </div>

      {selectedEvent && (
        <div className="payment-flow">
          <div className="progress-indicator">
            <div className={`step ${!isGuest ? 'active' : ''}`}>1. Identification</div>
            <div className={`step ${isGuest ? 'active' : ''}`}>2. Paiement</div>
          </div>

          <div className="payment-details">
            <div className="event-summary">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="event-image" />
              <div className="event-info">
                <h2>{selectedEvent.title}</h2>
                <div className="event-meta">
                  <p><i className="fas fa-calendar-alt"></i> {selectedEvent.date}</p>
                  <p><i className="fas fa-map-marker-alt"></i> {selectedEvent.location}</p>
                  <p className="price"><i className="fas fa-tag"></i> {selectedCategory?.price}</p>
                </div>
              </div>
            </div>

            {!isGuest ? (
              <div className="auth-section">
                <div className="auth-options">
                  <button className="auth-button login" >
                    <i className="fab fa-google"></i> Continuer avec Google
                  </button>
                  <button className="auth-button login">
                    <i className="fas fa-envelope"></i> Se connecter
                  </button>
                  <div className="guest-option">
                    <button className="guest-button" onClick={handleGuestCheckout}>
                      Continuer en tant qu'invité
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form className="payment-form" onSubmit={handlePayment}>
                <fieldset className="payment-fieldset">
                  <legend><i className="fas fa-credit-card"></i> Informations de paiement</legend>
                  
                  <div className="card-preview">
                    <div className={`card ${cardType}`}>
                      <div className="card-chip"></div>
                      <div className="card-number">{cardNumber.padEnd(19, '•').match(/.{1,4}/g)?.join(' ')}</div>
                      <div className="card-footer">
                        <div className="card-holder">{document.getElementById('cardName')?.value || 'NOM PRENOM'}</div>
                        <div className="card-expiry">{document.getElementById('expiryDate')?.value || 'MM/AA'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group icon-input">
                    <label htmlFor="cardName">Nom sur la carte</label>
                    <i className="fas fa-user"></i>
                    <input type="text" id="cardName" required />
                  </div>

                  <div className="form-group icon-input">
                    <label htmlFor="cardNumber">Numéro de carte</label>
                    <i className="far fa-credit-card"></i>
                    <input
                      type="text"
                      id="cardNumber"
                      value={formatCardNumber(cardNumber)}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
                      maxLength="19"
                      required
                    />
                    {cardType && <span className="card-type">{cardType}</span>}
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group icon-input">
                      <label htmlFor="expiryDate">Expiration</label>
                      <i className="fas fa-calendar-day"></i>
                      <input
                        type="text"
                        id="expiryDate"
                        placeholder="MM/AA"
                        required
                      />
                      {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                    </div>

                    <div className="form-group icon-input">
                      <label htmlFor="cvv">CVV</label>
                      <i className="fas fa-lock"></i>
                      <input
                        type="text"
                        id="cvv"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="billing-fieldset">
                  <legend><i className="fas fa-user"></i> Informations personnelles</legend>
                  
                  <div className="form-group icon-input">
                    <label htmlFor="buyerName">Nom complet</label>
                    <i className="fas fa-user-tag"></i>
                    <input type="text" id="buyerName" required />
                  </div>

                  <div className="form-group icon-input">
                    <label htmlFor="buyerEmail">Adresse email</label>
                    <i className="fas fa-at"></i>
                    <input type="email" id="buyerEmail" required />
                  </div>
                </fieldset>

                <div className="form-footer">
                  <div className="secure-3d">
                    <i className="fas fa-shield-check"></i>
                    <span>Protégé par 3D Secure -    -  </span>
                  </div>
                  <button type="submit" className="pay-button" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Traitement...
                      </>
                    ) : (
                      <>
                        Payer {selectedCategory?.price}
                        <i className="fas fa-lock"></i>
                      </>
                    )}
                  </button>
                  <div className="card-icons">
                    <img src={visaIcon} alt="Visa" className={cardType === 'visa' ? 'active' : ''} />
                    <img src={mastercardIcon} alt="Mastercard" className={cardType === 'mastercard' ? 'active' : ''} />
                    <img src={amexIcon} alt="American Express" className={cardType === 'amex' ? 'active' : ''} />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;