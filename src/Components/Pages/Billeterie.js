import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Billeterie.css';

// Images d'exemple - À remplacer par vos propres assets
import concertImg from '../../assets/concert.jpg';
import theatreImg from '../../assets/theatre.jpg';
import sportsImg from '../../assets/sports.jpg';
import gamingImg from '../../assets/gaming.jpg';

const Billeterie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedEvent = location.state?.selectedEvent;
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const weeklyEvents = [
    { id: 1, title: 'Festival Electro', date: '25 Mars 2024', location: 'Lyon', image: concertImg, price: '50€' },
    { id: 2, title: 'Pièce Classique', date: '28 Mars 2024', location: 'Paris', image: theatreImg, price: '30€' },
    { id: 3, title: 'Match de Football', date: '30 Mars 2024', location: 'Marseille', image: sportsImg, price: '40€' },
    { id: 4, title: 'LAN Party', date: '1 Avril 2024', location: 'Lille', image: gamingImg, price: '20€' },
  ];

  const categories = [
    { name: 'Catégorie 1', price: '50€', color : '#FF6B6B' },
    { name: 'Catégorie 2', price: '70€', color : '#4ECDC4' },
    { name: 'Catégorie 3', price: '100€', color : '#45B7D1' },
  ];

  const handleBuyClick = (event) => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handlePayClick = () => {
    navigate('/payment', { state: { selectedCategory, selectedEvent } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="billeterie-container">
      <h1>Billetterie</h1>
      <section className="weekly-events">
        <h2>Les événements de la semaine</h2>
        <div className="events-grid">
          {weeklyEvents.map((event) => (
            <div key={event.id} className={`event-card ${selectedEvent && selectedEvent.id === event.id ? 'selected' : ''}`}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} />
                <div className="event-date">{event.date}</div>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-price">💰 {event.price}</p>
                <button className="buy-button" onClick={() => handleBuyClick(event)}>Acheter</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <h2>Choisissez une catégorie</h2>
            <div className="categories">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`category ${selectedCategory === category ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <h3>{category.name}</h3>
                  <p>{category.price}</p>
                </div>
              ))}
            </div>
            <button className="pay-button" onClick={handlePayClick} disabled={!selectedCategory}>Payer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billeterie;