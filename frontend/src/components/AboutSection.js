import React from 'react';
import {Link} from 'react-router-dom'

export default function AboutSection() {
    
    return (
        <div class="py-16">
            <div class="container m-auto px-6">
                <div class="lg:flex justify-center items-center">
                    <div class="lg:w-6/12 lg:p-0 p-7">
                        <h1 class="text-4xl font-bold leading-tight mb-5 capitalize">  Travelling companion for people looking for an interesting location  </h1>
                        <p class="text-xl">  Here you can share unique and beautiful locations encountered during your travels with people that are interested 
                            in visiting new places and are in search of inspiration!</p>

                        <div class="py-5">
                            <a href="#" class="text-white rounded-full py-2 px-5 text-lg font-semibold bg-lime-800 inline-block border border-lime-600 mr-3"><Link to="/add-location">Get started</Link></a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    );
}