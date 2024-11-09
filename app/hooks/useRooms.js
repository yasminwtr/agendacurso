'use client';
import { useState, useEffect } from 'react';

function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      const response = await fetch('/api/rooms');
      const data = await response.json();
      setRooms(data);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      setError(error);
    }
  }

  async function addRoom(roomData) {
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) throw new Error('Erro ao criar sala');

      const newRoom = await response.json();
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    } catch (error) {
      console.error('Erro ao criar sala:', error);
      setError(error);
    }
  }

  async function updateRoom(id, roomData) {
    try {
      const response = await fetch(`/api/rooms?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar sala');

      const updatedRoom = await response.json();
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === id ? updatedRoom : room))
      );
    } catch (error) {
      console.error('Erro ao atualizar sala:', error);
      setError(error);
    }
  }

  async function deleteRoom(id) {
    try {
      const response = await fetch(`/api/rooms?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar sala');

      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    } catch (error) {
      console.error('Erro ao deletar sala:', error);
      setError(error);
    }
  }

  return { rooms, loading, error, fetchRooms, addRoom, updateRoom, deleteRoom };
}

export default useRooms;
