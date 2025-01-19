import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Recipe from "../components/Recipe";

const Searched = () => {
    const location = useLocation();
    const { type, query } = location.state || {};
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = type
                    ? `http://217.114.10.30:5000/recipes/allRecipesByName`
                    : `http://217.114.10.30:5000/recipes/allRecipesByCompound`;

                const body = type
                    ? { name: query }
                    : { compound: query.split(",").map((item: any) => item.trim()) };

                const response = await fetch(url, {
                    method: 'POST',  // Изменен на POST
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }

                const data = await response.json();
                setRecipes(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [type, query]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex justify-start items-center flex-col">
            <div className="text-EIO text-[20px]">
                Sampling by: {query}
            </div>
            {
                recipes.length < 1
                    ? <div className="w-full text-[32px] text-EIO mt-[200px]">No results were found for your request D:</div>
                    : <div className="grid grid-cols-5 gap-[50px] lg:grid-cols-3 md:grid-cols-2 md:gap-[80px] pt-[30px]">
                        {recipes.map((item, index) => (
                            <Recipe data={item} key={index} />
                        ))}
                    </div>
            }
        </div>
    );
};

export default Searched;
