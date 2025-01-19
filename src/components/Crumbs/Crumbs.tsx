import React from 'react';
import { Link } from 'react-router-dom';
import useCrumbs from "../../hooks/useCrumbs";

interface CrumbsProps {
    recipeName: string;
}

export const Crumbs: React.FC<CrumbsProps> = ({ recipeName }) => {
    const crumbs = useCrumbs();
    const fullCrumbs = [...crumbs, recipeName];

    return (
        <nav aria-label="Breadcrumb" className="w-full h-[30px]">
            <div className="container crumbs pt-[3px] pl-[5px] font-[700] flex flex-row justify-center">
                {fullCrumbs.map((crumb, index) => {
                    const isLast = index === fullCrumbs.length - 1;
                    const path = `/${fullCrumbs.slice(0, index + 1).join('/')}`;

                    return (
                        <div key={index} className="flex items-center">
                            {isLast ? (
                                <span className="text-white text-[18px] md:text-[16px]">{crumb}</span>
                            ) : (
                                <Link to={path} className="cursor-pointer text-white underline underline-offset-4 text-[18px] md:text-[14px] duration-200">
                                    {crumb}
                                </Link>
                            )}
                            {!isLast && <span className="mx-2 text-likegray">{`>`}</span>}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};
