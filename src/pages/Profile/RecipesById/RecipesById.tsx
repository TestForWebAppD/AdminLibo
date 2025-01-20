import React, {useEffect, useMemo, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

interface Id {
    id: string;
}

export const RecipesById: React.FC<Id> = ({ id }) => {
    const locate = useLocation();
    const uri = useMemo(() => decodeURIComponent(locate.pathname), [locate.pathname]);

    const [recipe, setRecipe] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchRecipes = async (recipeId: string) => {
        try {
            const response = await fetch(`http://217.114.8.68:5000/recipes/recipesById`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: recipeId }),
            });

            if (!response.ok) {
                throw new Error('Error fetching recipe');
            }

            const recipeData = await response.json();
            setRecipe(recipeData);
        } catch (error) {
            setError("Failed to fetch recipe.");
            console.error('Error:', error);
        }
    };

    const deleteRecipe = async () => {
        try {
            const response = await fetch(`http://217.114.8.68:5000/auth/deleteRecipe`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Error deleting recipe');
            }
            alert("Recipe was deleted successfully.");
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderInfo = (label: string, value: string) => (
        <div className="text-[12px] text-shadow">{label}: {value}</div>
    );

    useEffect(() => {
        if (id) {
            fetchRecipes(id);
        }
    }, [id]);

    if (error) return <div>{error}</div>

    if (!recipe) return <div>Loading...</div>

    return (
        <div>
            <button
                onClick={deleteRecipe}
                className="w-56 mt-2 py-1 px-4 text-EIO hover:bg-EIO hover:text-white duration-500 border-2 border-likegray border-b-0 rounded-t-xl"
            >
                Delete Recipe
            </button>
            <Link to={`${uri}/${recipe.slugName}`} title={`Recipe ${recipe.name}`}
                  className="w-56 h-full relative overflow-hidden flex flex-col justify-between items-center rounded-b-xl border-likegray border-2 cursor-pointer">

                <div className="w-full h-56 relative">
                    <img
                        src={recipe.img ? recipe.img : '/not_found.svg'}
                        alt={`recipe of ${recipe.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-125"
                        sizes="(max-width: 220px) 100vw, 220px" width="220" height="220"
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 flex flex-row justify-between items-center text-white h-[32px] z-20 px-[5px]">
                        {renderInfo("kcal", recipe.kcal)}
                        {renderInfo("time", recipe.time)}
                        {renderInfo("dif", recipe.difficult)}
                    </div>
                </div>

                <div className="w-full h-48 relative z-2 p-[5px] bg-white">
                    <div className="overflow-ellipsis overflow-hidden line-clamp-2 text-[20px] pb-[20px]">
                        {recipe.name}
                    </div>
                    <div className="line-clamp-4 overflow-ellipsis overflow-hidden text-[14px] text-lightblack">
                        {recipe.description}
                    </div>
                </div>

                <button
                    className="w-full h-[40px] border-t-2 border-likegray text-EIO hover:bg-EIO hover:text-white duration-500"
                    aria-label={`View recipe for ${recipe.name}`}>
                    Смотреть
                </button>
            </Link>
        </div>
    );
};
