import React, { useMemo } from 'react';
import { Link, useLocation } from "react-router-dom";

interface RecipeProps {
    data: Recipe;
}

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

export const Recipe: React.FC<RecipeProps> = ({ data }) => {
    const locate = useLocation();
    const uri = useMemo(() => decodeURIComponent(locate.pathname), [locate.pathname]);

    const renderInfo = (label: string, value: string) => (
        <div className="text-[12px] text-shadow">{label}: {value}</div>
    );

    return (
        <Link to={`${uri}/${data.slugName}`} title={`Recipe ${data.name}`}
              className="w-56 h-full relative overflow-hidden flex flex-col justify-between items-center rounded-xl border-likegray border-2 cursor-pointer">

            <div className="w-full h-56 relative">
                <img
                    src={data.img ? data.img : '/not_found.svg'}
                    alt={`recipe of ${data.name}`}
                     className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-125"
                     sizes="(max-width: 220px) 100vw, 220px" width="220" height="220"
                />
                <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-between items-center text-white h-[32px] z-20 px-[5px]">
                    {renderInfo("kcal", data.kcal)}
                    {renderInfo("time", data.time)}
                    {renderInfo("dif", data.difficult)}
                </div>
            </div>

            <div className="w-full h-48 relative z-2 p-[5px] bg-white">
                <div className="overflow-ellipsis overflow-hidden line-clamp-2 text-[20px] pb-[20px]">
                    {data.name}
                </div>
                <div className="line-clamp-4 overflow-ellipsis overflow-hidden text-[14px] text-lightblack">
                    {data.description}
                </div>
            </div>

            <button
                className="w-full h-[40px] border-t-2 border-likegray text-EIO hover:bg-EIO hover:text-white duration-500"
                aria-label={`View recipe for ${data.name}`}>
                Смотреть
            </button>
        </Link>
    );
};
