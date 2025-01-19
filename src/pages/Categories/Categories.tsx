import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {slugify} from "../../utils/slugify";
import {Helmet} from "react-helmet";
import {gsap} from "gsap";

export const Categories = () => {

    const [data,] = useState([
        "Appetizers", "Baking and Pastries", "Drinks", "Dumplings and Noodles",
        "Grilled and Barbecued Dishes", "International Cuisine", "Main Dishes", "Salads",
        "Sauces and Condiments", "Seasons", "Side Dishes", "Soups",
        "Vegetarian and Vegan Dishes",
    ]);

    const recipesRef = useRef<HTMLDivElement | null>(null);
    const [loading, ] = useState<boolean>(true);

    useEffect(() => {
        if (!loading && recipesRef.current) {
            gsap.fromTo(
                recipesRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2 }
            );
        }
    }, [loading]);

    return (
        <div>
            <Helmet>
                <meta property="og:title" content="Categories: Explore Our Delicious Recipes"/>
                <meta property="og:description"
                      content="Browse through various categories to find the perfect recipe for any occasion."/>
                <meta property="og:image" content="none"/>
                <meta property="og:url" content="blub"/>
                <meta property="og:type" content="website"/>
            </Helmet>
            <div ref={recipesRef} className="grid grid-cols-3 gap-12 lg:grid-cols-2 sm:grid-cols-1">
                {data.map((item, index) => {
                    const itemSlug = slugify(item.split('/').pop()?.split('.')[0] || '');

                    return (
                        <Link
                            to={`/categories/${itemSlug}`}
                            key={index}
                            className="w-72 h-[100%] min-h-64 max-h-72 mx-12 perspective-1500 cursor-pointer bg-white
                                       flex flex-col justify-evenly content-center text-center text-black border-2 border-likegray rounded-xl
                                       hover:border-EIO hover:bg-EIO duration-500"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/Categories/${item}.jpg`}
                                alt={`Category ${item}`}
                                className="w-full h-full transition-transform duration-200 ease-out shadow-lg select-none rounded-t-xl"
                                sizes="(max-width: 284px) 100vw, 284px"
                                width="284"
                                height="226"
                            />
                            <div
                                className="bg-white border-t-2 border-likegray hover:bg-EIO hover:text-white duration-500 rounded-b-xl">
                                {itemSlug}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
