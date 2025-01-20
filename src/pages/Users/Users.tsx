import React, {useEffect, useState} from 'react';

interface User {
    _id: string;
    username: string;
    roles: string[];
    description?: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const normalSpace = '\u0020';

    // Функция для получения всех пользователей с сервера
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://217.114.8.68:5000/auth/admin/getAllUsers');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);  // Сохраняем данные о пользователях в состояние
            } else {
                setError('Failed to fetch users');
            }
        } catch (error) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            const response = await fetch(`http://217.114.10.30:5000/auth/admin/deleteUser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userId })
            });

            if (response.ok) {
                console.log('Пользователь успешно удален');
                alert('Пользователь успешно удален');
                window.location.reload();
            } else {
                console.error('Ошибка при удалении пользователя');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className="text-[48px] text-black font-bold mb-4">Users List</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul className="list-none">
                    {users.map((user: User) => (
                        <li key={user._id} className="text-black mb-2 rounded-md border-[1px] border-EIO hover:border-darkred">
                            <div>
                                <h3 className="text-xl p-2">Username: {user.username}</h3>
                                <p className="p-2">Description: {user.description || 'No description'}</p>
                                <div className="flex flex-row p-2">
                                    Roles: {user.roles.map((role) => (<p>{role}, </p>))}
                                </div>
                                <button
                                    className="w-full h-full duration-200 border-t-[1px] border-EIO hover:bg-EIO hover:text-white"
                                    onClick={() => deleteUser(user.username)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;
