'use client';
import { useState, useEffect } from 'react';

function useClasses() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
      const response = await fetch('/api/classes');
      const data = await response.json();
      setClasses(data);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
      setError(error);
    }
  }

  async function addClass(classData) {
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) throw new Error('Erro ao criar turma');

      const newClass = await response.json();
      setClasses((prevClasses) => [...prevClasses, newClass]);
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      setError(error);
    }
  }

  async function updateClass(id, classData) {
    try {
      const response = await fetch(`/api/classes?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar turma');

      const updatedClass = await response.json();
      setClasses((prevClasses) =>
        prevClasses.map((classs) => (classs.id === id ? updatedClass : classs))
      );
    } catch (error) {
      console.error('Erro ao atualizar turma:', error);
      setError(error);
    }
  }

  async function deleteClass(id) {
    try {
      const response = await fetch(`/api/classes?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar turma');

      setClasses((prevClasses) => prevClasses.filter((classs) => classs.id !== id));
    } catch (error) {
      console.error('Erro ao deletar turma:', error);
      setError(error);
    }
  }

  return { classes, loading, error, fetchClasses, addClass, updateClass, deleteClass };
}

export default useClasses;
