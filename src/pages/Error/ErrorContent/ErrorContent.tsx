import React from 'react';

export const ErrorContent = () => {
    return (
        <div className="flex flex-col justify-center text-center">
            <p className="text-darkred text-[60px] pb-4">Error 404</p>
            <p className="text-EIO text-[20px] pb-4">This page does not exist</p>
            <p className="text-darkred text-[32px]">Looks like you got here by accident!</p>
        </div>
    );
};
