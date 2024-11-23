'use client';

import { useEffect } from "react";

export default function ClientScrollHandler() {
    useEffect(() => {
        const navbar = document.querySelector(".navbar");
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.1) {
                navbar.classList.add("bg-white",);
                navbar.classList.remove("bg-transparent", "text-white");
            } else {
                navbar.classList.add("bg-transparent", "text-white");
                navbar.classList.remove("bg-white", "text-gray-950", "shadow-md");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return null;
}
