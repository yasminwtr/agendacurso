'use client';
import { useState, useEffect } from 'react';

function useCourseTypes() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseTypes();
  }, []);

  async function fetchCourseTypes() {
    try {
      const response = await fetch('/api/coursetypes');
      const data = await response.json();
      setCourseTypes(data);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao buscar tipos de curso:', error);
      setError(error);
    }
  }

  return { courseTypes, loading, error, fetchCourseTypes };
}

export default useCourseTypes;
