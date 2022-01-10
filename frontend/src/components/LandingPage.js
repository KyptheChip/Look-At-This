import React from 'react';
import AboutSection from "./AboutSection";
import LandingPageMap from "./LandingPageMap"

export default function LandingPage() {
    
    return(
        <div className="w-screen">
            <AboutSection/>
            <div className="h-3/4 w-full">
                <LandingPageMap/>
            </div>
        </div>
    );
}