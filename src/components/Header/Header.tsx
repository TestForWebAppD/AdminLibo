import React, {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Searcher from "../Searcher";
import {Link} from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const Header: React.FC = () => {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);
    const searcherRef = useRef<HTMLDivElement | null>(null);
    const navigationRef = useRef<HTMLUListElement | null>(null);
    const mobNavRef = useRef<HTMLUListElement | null>(null);


    useEffect(() => {
        const animations = [
            {target: headerRef.current, heightStart: "120px", heightEnd: "75px"},
            {target: logoRef.current, scaleStart: 1, scaleEnd: 0.6},
            {target: navigationRef.current, scaleStart: 1, scaleEnd: 0.9},
            {target: searcherRef.current, scaleStart: 1, scaleEnd: 0.7},
        ];

        animations.forEach(({target, heightStart, heightEnd, scaleStart, scaleEnd}) => {
            // @ts-ignore
            gsap.fromTo(target,
                {height: heightStart, scale: scaleStart || 1},
                {
                    height: heightEnd,
                    scale: scaleEnd,
                    ease: "power2.out",
                    transformOrigin: "center center",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    }
                });
        });
    }, []);

    const handleMenuToggle = (isAnimating: boolean, menu: Element, nav: Element, burger: Element) => {
        if (isAnimating) return;
        isAnimating = true;
        const isHidden = menu.classList.contains("hidden");

        burger.classList.toggle("active");
        if (isHidden) {
            menu.classList.remove("hidden");
            nav.classList.add("flex");
            gsap.fromTo(menu, {x: "200%"}, {
                x: "0%",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating = false
                },
            });
        } else {
            gsap.to(menu, {
                x: "200%",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    menu.classList.add("hidden");
                    nav.classList.remove("flex");
                    isAnimating = false;
                },
            });
        }
    };

    useEffect(() => {
        const menu: Element | null = document.querySelector("#menu");
        const nav: Element | null = document.querySelector("#nav");
        const burger: Element | null = document.querySelector(".burger-container");

        if (!menu || !burger) return;

        let isAnimating = false;

        const handleClick = () => {
            if (nav) {
                handleMenuToggle(isAnimating, menu, nav, burger);
            }
        };

        burger.addEventListener("click", handleClick);

        return () => {
            burger.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <header
            className="w-full h-[100%] max-h-[120px] flex flex-row justify-between items-center top-0 bg-white bg-opacity-80 hover:bg-opacity-90 fixed z-50 duration-1000"
            ref={headerRef}>
            <div className="container flex flex-row justify-between items-center">
                <Link to="/recipes" className="z-[100]">
                    <img src="/logo.svg" alt="GustoLiboRB3"
                         className="w-[160px] h-auto cursor-pointer select-none max-w-none" ref={logoRef} width={160}
                         height="auto"
                    />
                </Link>
                <div ref={searcherRef}>
                    <Searcher/>
                </div>

                <nav>
                    <ul className="flex gap-12 md:hidden" ref={navigationRef}>
                        {["Recipes", "Categories", "Users", "Profile"].map((item) => (
                            <li key={item}>
                                <Link to={`/${item.toLowerCase()}`}
                                      className="font-bold text-xl text-lightblack hover:text-darkred transition-colors duration-300 lg:text-base">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav id="menu" className="hidden w-full absolute top-[0]">
                    <ul id="nav" className={`w-[100%] absolute top-[0] bg-darkred flex-col items-center`}
                        ref={mobNavRef}>
                        <li className="py-3 cursor-pointer">
                            <div
                                className="size-[60px] rounded-full bg-EIO border-2 border-black flex flex-col justify-center items-center">
                                <div className="size-[30px] rounded-full bg-black"></div>
                                <div className="w-[50px] h-[30px] bg-black rounded-b-3xl rounded-t-md"></div>
                            </div>
                        </li>
                        {["Recipes", "Categories", "Profile"].map((item) => (
                            <li key={item} className="text-white py-3 w-[100%] text-center transition-all hover:bg-EIO">
                                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button className="burger-container hidden md:block content-center">
                    <div className="burger-item top-line"></div>
                    <div className="burger-item mid-line"></div>
                    <div className="burger-item bot-line"></div>
                </button>
            </div>
        </header>
    );
};
