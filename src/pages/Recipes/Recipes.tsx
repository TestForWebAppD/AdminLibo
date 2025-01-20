import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Helmet } from "react-helmet";
import Recipe from "../../components/Recipe";

interface Recipe {
    name: string;
    description: string;
    category: string;
    season: string;
    compound: { name: string; weight: string }[];
    cooking: { step: number; stepDescription: string }[];
    img: string;
    difficult: string;
    time: string;
    portion: number;
    country: string;
    kcal: string;
    veget: boolean;
    lightness: string;
    meal: string;
    story: { year: string; history: string }[];
    slugName: string;
    cook: string;
}

export const Recipes = () => {
    const recipesRef = useRef<HTMLDivElement | null>(null);
    const [visibleRecipes, setVisibleRecipes] = useState<number>(15);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllRecipes = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://217.114.8.68:5000/recipes/allRecipes', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data: Recipe[] = await response.json();
                    console.log(data);
                    setRecipes(data);
                } else {
                    console.error('Ошибка при получении данных');
                }
            } catch (e) {
                console.error('Ошибка при получении всех рецептов:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchAllRecipes();
    }, []);

    useEffect(() => {
        if (!loading && recipesRef.current) {
            gsap.fromTo(
                recipesRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2 }
            );
        }
    }, [loading]);

    const loadMore = () => {
        setVisibleRecipes((prev) => prev + 15);
    };

    return (
        <div>
            <Helmet>
                <meta property="og:title" content="Recipe Collection: Delicious Dishes for Everyone" />
                <meta property="og:description" content="Explore our diverse range of recipes, from simple to complex, to delight your loved ones with tasty meals." />
                <meta property="og:image" content="none" />
                <meta property="og:url" content="https://gustolibo.com/recipes" />
                <meta property="og:type" content="website" />

                {/* Telegram Card meta tags */}
                <meta name="telegram:card" content="summary" />
                <meta name="telegram:title" content="Recipe Collection" />
                <meta name="telegram:description" content="Discover the best recipes for every occasion!" />
                <meta name="telegram:image" content="none" />

                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Recipe Collection" />
                <meta name="twitter:description" content="Explore a multitude of recipes and impress your friends with culinary masterpieces!" />
                <meta name="twitter:image" content="none" />
            </Helmet>
            <div ref={recipesRef} className="flex justify-center items-center flex-col">
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-5 gap-[50px] lg:grid-cols-3 md:grid-cols-2 md:gap-[80px] pt-[30px]">
                            {recipes.slice(0, visibleRecipes).map((item, index) => (
                                <Recipe data={item} key={index} />
                            ))}
                        </div>

                        {visibleRecipes < recipes.length && (
                            <button
                                onClick={loadMore}
                                className="mt-4 text-EIO border-2 border-EIO p-2 rounded hover:bg-EIO hover:text-white duration-200"
                            >
                                Load more
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
