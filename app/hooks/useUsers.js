'use client';
import { useState, useEffect } from 'react';

function useUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
            setLoading(false);

        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            setError(error);
        }
    }

    async function addUser(userData) {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error('Erro ao criar usuário');

            const newUser = await response.json();
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            setError(error);
        }
    }

    async function updateUser(id, userData) {
        try {
            const response = await fetch(`/api/users?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error('Erro ao atualizar usuário');

            const updatedClass = await response.json();
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === id ? updatedClass : user))
            );
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            setError(error);
        }
    }

    async function deleteUser(id) {
        try {
            const response = await fetch(`/api/users?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erro ao deletar usuário');

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            setError(error);
        }
    }

    return { users, loading, error, fetchUsers, addUser, updateUser, deleteUser };
}

export default useUsers;
