import React from 'react';
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { Helmet } from "react-helmet";

export const Seasons = () => {
    const Data = ['All Year', 'Autumn', 'Spring', 'Summer', 'Winter'];

    return (
        <div>
            <Helmet>
                <meta property="og:title" content="Seasonal Recipes - Celebrate Every Season with Delicious Dishes" />
                <meta property="og:description" content="Explore a variety of recipes tailored for each season, perfect for every occasion!" />
                <meta property="og:image" content="none" />
                <meta property="og:url" content="seasons" />
                <meta property="og:type" content="website" />

                <meta name="telegram:card" content="summary" />
                <meta name="telegram:title" content="Seasonal Recipes" />
                <meta name="telegram:description" content="Discover the best recipes for each season and enjoy seasonal delights!" />
                <meta name="telegram:image" content="none" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Seasonal Recipes" />
                <meta name="twitter:description" content="Browse our collection of seasonal recipes and find inspiration for every time of year!" />
                <meta name="twitter:image" content="none" />
            </Helmet>

            <div className="grid grid-cols-3 gap-12">
                {Data.map((data, index) => (
                    <Link
                        key={index}
                        to={`/categories/seasons/${slugify(data)}`}
                        className="cursor-pointer bg-likegray flex flex-col justify-evenly content-center text-center text-black hover:bg-EIO hover:text-white duration-500 border border-gray-300 rounded-lg"
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/Seasons/${data}.jpg`}
                            alt={`season ${data}`}
                            className="w-full h-full transition-transform duration-200 ease-out shadow-lg select-none rounded-t-lg"
                        />
                        <div className="text-[20px]">{data}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
