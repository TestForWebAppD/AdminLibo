import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { convertKebabToTitleCase } from "../../utils/kebab";
import { Helmet } from "react-helmet";
import Recipe from "../../components/Recipe";

export const Category = () => {
    const { category } = useParams<{ category: string }>();
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const query = convertKebabToTitleCase(category);
    console.log(query);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://217.114.10.30:5000/recipes/allRecipesByCategories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query })
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
    }, [category, query]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {
                category &&
                <Helmet>
                    <meta property="og:title" content={`${convertKebabToTitleCase(category.toLowerCase())} Recipes - Delicious Dishes for Every Taste`} />
                    <meta property="og:description" content={`Explore our collection of ${convertKebabToTitleCase(category.toLowerCase())} recipes, perfect for any occasion!`} />
                    <meta property="og:image" content="none" />
                    <meta property="og:url" content={`https://example.com/categories/${convertKebabToTitleCase(category.toLowerCase())}`} />
                    <meta property="og:type" content="website" />
                    <meta name="telegram:card" content="summary" />
                    <meta name="telegram:title" content={`${convertKebabToTitleCase(category.toLowerCase())} Recipes`} />
                    <meta name="telegram:description" content={`Discover the best ${convertKebabToTitleCase(category.toLowerCase())} recipes to delight your guests!`} />
                    <meta name="telegram:image" content="none" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:title" content={`${convertKebabToTitleCase(category.toLowerCase())} Recipes`} />
                    <meta name="twitter:description" content={`Browse through our tasty ${convertKebabToTitleCase(category.toLowerCase())} recipes and find your favorites!`} />
                    <meta name="twitter:image" content="none" />
                </Helmet>
            }

            <div className="flex justify-center items-center flex-col">
                <h1 className="text-[32px] text-EIO font-bold md:text-[30px] sm:text-[28px]">{convertKebabToTitleCase(category)}</h1>
                <div className="grid grid-cols-5 gap-[50px] lg:grid-cols-3 md:grid-cols-2 md:gap-[80px] pt-[30px]">
                    {recipes.map((item, index) => (
                        <Recipe data={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
