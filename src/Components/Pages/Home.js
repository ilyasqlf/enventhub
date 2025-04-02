import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './Home.css';

// Vidéo d'exemple - À remplacer par votre propre vidéo
import heroVideo from '../../assets/hero-video.mp4';
import concertImg from '../../assets/concert.jpg';
import theatreImg from '../../assets/theatre.jpg';
import sportsImg from '../../assets/sports.jpg';
import gamingImg from '../../assets/gaming.jpg';
import natureImg from '../../assets/nature.jpg';

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { name: 'Concerts', image: concertImg, color: '#FF6B6B' },
    { name: 'Spectacles', image: theatreImg, color: '#4ECDC4' },
    { name: 'Sports', image: sportsImg, color: '#45B7D1' },
    { name: 'Jeux vidéos', image: gamingImg, color: '#96CEB4' },
    { name: 'Nature et bien être', image: natureImg, color: '#FFEEAD' },
  ];

  const weeklyEvents = [
    { id: 1, title: 'Festival Electro', date: '25 Mars 2024', location: 'Lyon', image: concertImg, lat: 45.764043, lng: 4.835659 },
    { id: 2, title: 'Pièce Classique', date: '28 Mars 2024', location: 'Paris', image: theatreImg, lat: 48.856613, lng: 2.352222 },
    { id: 3, title: 'Match de Football', date: '30 Mars 2024', location: 'Marseille', image: sportsImg, lat: 43.296482, lng: 5.36978 },
    { id: 4, title: 'LAN Party', date: '1 Avril 2024', location: 'Lille', image: gamingImg, lat: 50.62925, lng: 3.057256 },
  ];

  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const handleChooseEvent = (event) => {
    navigate('/events', { state: { selectedEvent: event } });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD6DAKmgB9_LT4B66a4SGiA-vfGb6P3CEs"
  });

  return (
    <div className="home-container">
     

      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay loop muted className="hero-video">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Ne manquez plus jamais un événement près de chez vous !</h1>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Rechercher un événement..." 
            />
            <button>Explorer</button>
          </div>
          <p className="subtitle">Pour ceux qui adorent sortir</p>
        </div>
      </section>

      {/* Catégories */}
      <section className="categories-section">
        <h2>Catégories populaires</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link 
              to="/events" 
              key={index}
              className="category-card"
              style={{ backgroundColor: category.color }}
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Événements de la semaine */}
      <section className="weekly-events">
        <h2>Les événements de la semaine</h2>
        <div className="events-grid">
          {weeklyEvents.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-image-container">
                <img src={event.image} alt={event.title} />
                <div className="event-date">{event.date}</div>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-location">📍 {event.location}</p>
                <button onClick={() => handleDetailsClick(event)} className="details-button">Voir détails</button>
                <button onClick={() => handleChooseEvent(event)} className="choose-button">Y aller</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Détails de l'événement */}
      {selectedEvent && (
        <div className="event-details-modal">
          <div className="event-details-content">
            <button className="close-button" onClick={handleCloseDetails}>X</button>
            <h2>{selectedEvent.title}</h2>
            <p>Date: {selectedEvent.date}</p>
            <p>Lieu: {selectedEvent.location}</p>
            <img src={selectedEvent.image} alt={selectedEvent.title} />
            <p>Description de l'événement...</p>
            <button onClick={() => handleChooseEvent(selectedEvent)} className="choose-button">Y aller</button>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '300px' }}
                center={{ lat: selectedEvent.lat, lng: selectedEvent.lng }}
                zoom={12}
              >
                <Marker position={{ lat: selectedEvent.lat, lng: selectedEvent.lng }} />
              </GoogleMap>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;