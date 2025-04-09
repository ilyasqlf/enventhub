import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Billeterie.css';

import concertImg from '../../assets/concert.jpg';
import theatreImg from '../../assets/theatre.jpg';
import sportsImg from '../../assets/sports.jpg';
import gamingImg from '../../assets/gaming.jpg';

const Billeterie = () => {
  const location = useLocation();
  const keyword = location.state?.keyword?.toLowerCase() || '';
  const [filteredEvents, setFilteredEvents] = useState([]);

  const allEvents = [
    { id: 1, title: 'Festival Electro', date: '30 Avril 2024', location: 'Lyon', image: concertImg, price: '50€' },
    { id: 2, title: 'Pièce Classique', date: '28 Mars 2024', location: 'Paris', image: theatreImg, price: '30€' },
    { id: 3, title: 'Match de Football', date: '30 Mars 2024', location: 'Marseille', image: sportsImg, price: '40€' },
    { id: 4, title: 'LAN Party', date: '1 Avril 2024', location: 'Lille', image: gamingImg, price: '20€' },
  ];

  useEffect(() => {
    if (keyword) {
      const results = allEvents.filter(event =>
        event.title.toLowerCase().includes(keyword)
      );
      setFilteredEvents(results);
    } else {
      setFilteredEvents(allEvents);
    }
  }, [keyword]);

  return (
    <div className="billeterie-container">
      <h1>Billetterie</h1>
      <section className="weekly-events">
        <h2>Les événements de la semaine</h2>

        {filteredEvents.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Aucun événement trouvé pour "{keyword}"</p>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image-container">
                  <img src={event.image} alt={event.title} />
                  <div className="event-date">{event.date}</div>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p className="event-location">📍 {event.location}</p>
                  <p className="event-price">💰 {event.price}</p>
                  <button className="buy-button">Acheter</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Billeterie;