import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        const { hash } = location;

        // get the current location pathname if contains a hash
        const hashIndex = hash.indexOf("#");

        // If there's a hash, scroll to the element with that ID
        if (hashIndex !== -1) {
            const elementId = hash.substring(hashIndex + 1);
            const element = document.getElementById(elementId);

            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                return;
            }
        }

        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [location]);

    return null;
};

export default ScrollToTop;