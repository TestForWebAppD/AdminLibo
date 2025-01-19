import React from 'react';
import { Helmet } from "react-helmet";
import ErrorContent from "./ErrorContent";

export const Error: React.FC = () => {
    return (
        <div>
            <Helmet>
                <meta property="og:title" content="404 Error - Page Not Found"/>
                <meta property="og:description"
                      content="Oops! The page you are looking for does not exist. Please check the URL or return to the homepage."/>
                <meta property="og:image" content="none"/>
                <meta property="og:url" content="https://example.com/404"/>
                <meta property="og:type" content="website"/>

                {/* Telegram Card meta tags */}
                <meta name="telegram:card" content="summary"/>
                <meta name="telegram:title" content="404 Error"/>
                <meta name="telegram:description" content="The page you are looking for does not exist."/>
                <meta name="telegram:image" content="none"/>

                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title" content="404 Error - Page Not Found"/>
                <meta name="twitter:description" content="Sorry, we couldn't find the page you're looking for."/>
                <meta name="twitter:image" content="none"/>
            </Helmet>

            <ErrorContent/>
        </div>
    );
};
