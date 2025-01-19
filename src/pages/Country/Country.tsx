import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Recipe from '../../components/Recipe';

export const Country = () => {
    const { country } = useParams<{ country: string }>();
    const [recipes, setRecipes] = useState<any[]>([]); // Массив для хранения рецептов
    const [loading, setLoading] = useState<boolean>(true); // Статус загрузки
    const [error, setError] = useState<string | null>(null); // Ошибка загрузки

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://217.114.10.30:5000/recipes/allRecipesByCountry', {
                    method: 'POST',  // Используем POST вместо GET
                    headers: {
                        'Content-Type': 'application/json',  // Устанавливаем тип содержимого
                    },
                    body: JSON.stringify({ country })  // Передаем страну в теле запроса
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
    }, [country]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Helmet>
                <meta property="og:title" content={`${country} Recipes - Discover Delicious Dishes from ${country}`} />
                <meta property="og:description" content={`Explore our collection of ${country} recipes, perfect for every occasion!`} />
                <meta property="og:image" content="none" />
                <meta property="og:url" content={`https://example.com/countries/${country}`} />
                <meta property="og:type" content="website" />

                <meta name="telegram:card" content="summary" />
                <meta name="telegram:title" content={`${country} Recipes`} />
                <meta name="telegram:description" content={`Discover the best recipes from ${country} to enjoy with family and friends!`} />
                <meta name="telegram:image" content="none" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${country} Recipes`} />
                <meta name="twitter:description" content={`Browse our tasty ${country} recipes and find your favorites!`} />
                <meta name="twitter:image" content="none" />
            </Helmet>

            <div className="flex justify-center items-center flex-col">
                <h1 className="text-[32px] text-EIO font-bold md:text-[30px] sm:text-[28px]">{country}</h1>
                <div className="grid grid-cols-5 gap-[50px] lg:grid-cols-3 md:grid-cols-2 md:gap-[80px] pt-[30px]">
                    {recipes.map((item, index) => (
                        <Recipe data={item} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};
