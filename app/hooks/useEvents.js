import { useState, useEffect } from 'react';

function useEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
      setLoading(false)

    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      setError(error);
    }
  }

  async function getEventById(id) {
    document.body.style.cursor = 'wait';
    
    try {
      const response = await fetch(`/api/event?id=${id}`);
      const data = await response.json(); 
      return data;

    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      setError(error);
    }
  }

  async function addEvent(eventData) {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error('Erro ao criar evento');

      const newEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      setError(error);
    }
  }

  async function updateEvent(id, eventData) {
    try {
      const response = await fetch(`/api/event?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar evento');

      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? updatedEvent : event))
      );
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      setError(error);
    }
  }

  async function deleteEvent(id) {
    try {
      const response = await fetch(`/api/event?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar evento');

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      setError(error);
    }
  }

  return { events, error, loading, setLoading, fetchEvents, addEvent, getEventById, updateEvent, deleteEvent };
}

export default useEvents;
