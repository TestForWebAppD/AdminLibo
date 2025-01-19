import React, {useState, useEffect} from 'react';
import {AddRecipeForm} from "./AddRecipeForm/AddRecipeForm";
import RecipesById from "./RecipesById";
import QuitButton from "../../components/QuitButton";

export const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ username: string, description: string }>({
        username: '',
        description: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setErrorMessage(null);

            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setErrorMessage('No token found, please login.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://217.114.10.30:5000/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const data = await response.json();
                    setErrorMessage(data.message || 'Failed to fetch profile');
                } else {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                setErrorMessage('An error occurred while fetching the profile');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setErrorMessage('No token found, please login.');
            return;
        }

        try {
            const response = await fetch('http://217.114.10.30:5000/auth/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message || 'Failed to update profile');
            } else {
                const data = await response.json();
                setUserData(data);
                setIsEditing(false);
            }
        } catch (error) {
            setErrorMessage('An error occurred while updating the profile');
            console.error(error);
        }
    };

    if (loading) return <p>Loading...</p>;

    if (errorMessage) return <p>{errorMessage}</p>;

    return (
        <div className="p-8 flex flex-col justify-center items-center max-w-[1680px] w-full text-BlackOlive">
            {userData ? (
                <div className="space-y-4 w-full h-auto">
                    <div className="w-auto h-auto flex flex-col items-center">
                        <img
                            src="/none_user_photo.svg"
                            alt="user"
                            className="w-full h-full max-w-[400px] max-h-[400px]"
                            width="400px"
                            height="400px"
                        />
                        <div className="flex flex-col justify-start items-center">
                            <p className="text-[96px] lg:text-[72px] md:text-[52px]"><strong>{userData.username}</strong></p>
                            <p>{userData.description || 'No description available'}</p>
                            <QuitButton />
                        </div>
                    </div>
                    <AddRecipeForm />
                    <div className="w-full h-auto flex flex-col items-center">
                        <h2 className="text-[48px]"><strong>My recipes!</strong></h2>
                        <div className="grid grid-cols-5 gap-[50px] lg:grid-cols-3 md:grid-cols-2 md:gap-[80px] pt-[30px]">
                            {
                                userData.recipes.map((id: string) => (
                                    <RecipesById id={id}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
        </div>
    );
};
