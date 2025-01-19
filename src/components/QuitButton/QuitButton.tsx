import React from 'react';

export const QuitButton = () => {
    const handleClearStorage = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <button
            onClick={handleClearStorage}
            className="w-full p-2 text-EIO rounded hover:bg-EIO hover:text-white hover:rounded-3xl transition duration-500 border-2 border-EIO font-bold text-[20px]"
        >
            Log out
        </button>
    );
};
