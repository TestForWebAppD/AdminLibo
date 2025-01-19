import React, {forwardRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const Searcher: React.FC = forwardRef((props, ref) => {

    const [clickFlag, setClickFlag] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            inputValue.length < 1 ? <div>Input cant be empty</div> : navigate(`/search`, {
                state: {
                    type: clickFlag,
                    query: inputValue
                }
            });
        }
    };
    const handleFocus = () => {
        setIsActive(true);
    };
    const handleBlur = () => {
        setTimeout(() => setIsActive(false), 200);
    };

    return (
        <div className="flex flex-col justify-center items-center py-2 usm:hidden">
            <input
                type="text"
                name="txt"
                className={`h-16 border-4 border-darkred rounded-full ml-[15px]
                               text-lightblack text-xl outline-none pl-1
                               transition-all duration-500
                               bg-[rgba(255,255,255,0.5)]
                               ${isActive ? 'w-[500px] lg:w-[300px] bg-[rgba(255,255,255,0.7)] rounded-full'
                    : 'w-20 hover:w-[500px] hover:lg:w-[300px] hover:bg-[rgba(255,255,255,0.7)] hover:rounded-full'}`
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={clickFlag ? "Search by name" : "Search by compounds"}
                aria-label="Search text box. put ur text in here"
            />

            <div className="flex flex-row justify-center items-center md:scale-75 text-[14px] pb-[10px]">
                <button
                    className={`w-auto h-auto border-2 rounded-xl mr-[10px] ml-[5px] 
                    duration-200  p-1 hover:bg-EIO hover:text-white
                                   ${clickFlag ? 'border-EIO bg-EIO text-white' : 'border-gray-300'}`}
                    aria-label="click hear for search by name"
                    onClick={() => setClickFlag(true)}
                >
                    by name
                </button>


                <button
                    className={`w-auto h-auto border-2 rounded-xl mr-[10px] ml-[5px] 
                    duration-200  p-1 hover:bg-EIO hover:text-white
                                   ${!clickFlag ? 'border-EIO bg-EIO text-white' : 'border-gray-30'}`}
                    aria-label="click hear for search by name"
                    onClick={() => setClickFlag(false)}
                >
                    by compound
                </button>
            </div>
        </div>
    );
});
