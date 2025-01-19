import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Recipe from "../../components/Recipe";

export const Season = () => {
    const { season } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://217.114.10.30:5000/recipes/allRecipesBySeason`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ season })
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
    }, [season]);  // При изменении сезона делаем новый запрос

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Helmet>
                <meta property="og:title" content={`${season} Recipes - Celebrate the Season with Delicious Dishes`} />
                <meta property="og:description" content={`Explore our collection of ${season} recipes, perfect for any festive occasion!`} />
                <meta property="og:image" content="none" />
                <meta property="og:url" content={`https://example.com/season/${season}`} />
                <meta property="og:type" content="website" />
                <meta name="telegram:card" content="summary" />
                <meta name="telegram:title" content={`${season} Recipes`} />
                <meta name="telegram:description" content={`Discover the best ${season} recipes to enjoy with family and friends!`} />
                <meta name="telegram:image" content="none" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${season} Recipes`} />
                <meta name="twitter:description" content={`Browse our tasty ${season} recipes and find your favorites!`} />
                <meta name="twitter:image" content="none" />
            </Helmet>

            <div className="flex justify-center items-center">
                <div className="grid grid-cols-5 gap-[50px] lg:grid-cols-3 md:grid-cols-2 md:gap-[80px] pt-[30px]">
                    {recipes.map((item, index) => (
                        <Recipe data={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
