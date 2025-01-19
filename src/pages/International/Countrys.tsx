import React from 'react';
import {Helmet} from "react-helmet";

import Country from "./Country";

export const Countrys = () => {

    const Data = ['Russia', 'France', 'Italy', 'Afganistan'];

    return (
        <div>
            <Helmet>
                <meta property="og:title" content="World Recipes - Explore Culinary Delights from Every Country" />
                <meta property="og:description" content="Discover recipes from various countries around the world, perfect for every palate!" />
                <meta property="og:image" content="none" />
                <meta property="og:url" content="blub" />
                <meta property="og:type" content="website" />

                {/* Telegram Card meta tags */}
                <meta name="telegram:card" content="summary" />
                <meta name="telegram:title" content="World Recipes" />
                <meta name="telegram:description" content="Explore a diverse collection of recipes from around the globe!" />
                <meta name="telegram:image" content="none" />

                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="World Recipes" />
                <meta name="twitter:description" content="Browse through our collection of international recipes and find your favorites!" />
                <meta name="twitter:image" content="none" />
            </Helmet>

            <div className="flex justify-center items-center mt-[20px]">
                <div className="grid grid-cols-4 gap-12 lg:grid-cols-3 md:grid-cols-2">
                    {
                        Data.map((data, index) => (
                            <Country data={data} key={index}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
