import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = () => {
  const { query } = useParams();
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/evenements')
      .then((res) => {
        const results = res.data.filter(event =>
          event.nom.toLowerCase().includes(query.toLowerCase()) ||
          event.lieu.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEvents(results);
      })
      .catch((err) => {
        console.error('Erreur lors de la recherche des événements :', err);
      });
  }, [query]);

  return (
    <div className="search-results">
      <h2>Résultats pour : "{query}"</h2>
      {filteredEvents.length > 0 ? (
        <div className="results-grid">
          {filteredEvents.map(event => (
            <div key={event.id} className="result-card">
              <img src={`https://source.unsplash.com/400x200/?${event.nom}`} alt={event.nom} />
              <h3>{event.nom}</h3>
              <p>📍 {event.lieu}</p>
              <p>📅 {event.date}</p>
              <p>💰 {event.prix} €</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun événement trouvé.</p>
      )}
    </div>
  );
};

export default SearchResults;