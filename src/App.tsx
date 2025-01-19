import React, {useEffect} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {useNavigate} from "react-router-dom";
import AppRouter from "./approuter/approuter";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://217.114.10.30:5000/auth/validate-token', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Token is invalid");
                }

                const data = await response.json();
                if (!data.valid) {
                    throw new Error("Token is invalid");
                }
            } catch (error) {
                console.error("Token validation error:", error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        validateToken();
    }, [navigate]);

    return (
        <div className="flex flex-col items-center">
            <Header/>
            <main
                className="container w-full h-auto min-h-space-screen relative top-[130px] z-1 mb-[220px] flex justify-center flex-col">
                <AppRouter/>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
