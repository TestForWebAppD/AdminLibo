import React from 'react';
import {Crumbs} from '../../../components/Crumbs/Crumbs';

interface RecipeCrumbsProps {
    recipeName: string;
}

export const RecipeCrumbs: React.FC<RecipeCrumbsProps> = ({ recipeName }) => {
    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-EIO to-red-500 rounded-t-xl p-4">
            <h1 className="text-[64px] text-white md:text-[48px] text-center">
                {recipeName || "Recipe"}
            </h1>
            <Crumbs recipeName={recipeName} />
        </div>
    );
};
