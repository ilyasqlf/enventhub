import React from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = ({ events }) => {
  const { eventId } = useParams();
  const event = events.find(event => event.id === parseInt(eventId));

  if (!event) {
    return <div>Événement non trouvé</div>;
  }

  return (
    <div className="event-details-container">
      <h1>{event.title}</h1>
      <p>Date: {event.date}</p>
      <p>Lieu: {event.location}</p>
      <img src={event.image} alt={event.title} />
      <p>Description de l'événement...</p>
    </div>
  );
};

export default EventDetails;