import React from 'react';
import {Link} from "react-router-dom";

interface CountryProps {
    data?: string;
}

export const Country: React.FC<CountryProps> = ({ data }) => {
    if (!data) return null;

    return (
        <Link
            to={`/categories/international-cuisine/${data.split('/').pop()?.split('.')[0]}`}
            className="w-70 h-auto flex flex-col justify-start rounded-lg border-likegray border-2 cursor-pointer"
        >
            <img
                src={`/Flags/${data}.png`}
                alt={`category ${data}`}
                className="transition-transform duration-200 ease-out select-none rounded-t-lg"
            />
            <button
                className="w-full h-[40px] border-t-2 border-likegray text-EIO hover:bg-EIO hover:text-white duration-500 rounded-b-lg"
            >
                {data.split('/').pop()?.split('.')[0]}
            </button>
        </Link>
    );
};
