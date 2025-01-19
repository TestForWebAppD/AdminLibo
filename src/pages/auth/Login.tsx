import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const name = urlParams.get('name');

        if (token && name) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', name);

            navigate('/recipes');
        } else {
            console.error('No token or username found in URL');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch('http://217.114.10.30:5000/auth/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message || 'Login failed');
            } else {
                const data = await response.json();

                if (data.token) {
                    localStorage.setItem('token', data.token);
                    console.log('Token saved:', data.token);
                }

                console.log('Login successful:', data);
                navigate('/recipes');
            }
        } catch (error) {
            setErrorMessage('An error occurred during login');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGitHubLogin = () => {
        window.location.href = 'http://217.114.10.30:5000/auth/admin/github';
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username..."
                            value={username}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-darkred rounded-md hover:bg-EIO duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button
                        onClick={handleGitHubLogin}
                        className="w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 duration-200"
                    >
                        Login with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
