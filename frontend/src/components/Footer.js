import React from "react";
import {Link} from "react-router-dom";

export default function Footer() {
  return (
        <footer className="bg-white">
          <div className="max-w-screen-xl px-4 py-6 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
            <nav className="flex flex-wrap justify-center -mx-5 -my-2">
              <div className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-gray-500 hover:text-lime-600">
                  <Link to="/">Home</Link>
                </a>
              </div>
              <div className="px-5 py-2">
                <a href="#" className="text-base leading-6 text-gray-500 hover:text-lime-600">
                  <Link to="/location-list">All locations</Link>
                </a>
              </div>
              <div className="px-5 py-2">
                <a className="text-base leading-6 text-gray-500 hover:text-lime-600">
                  <Link to="/add-location">Add location</Link>
                </a>
              </div>
              <div className="px-5 py-2">
                <a className="text-base leading-6 text-gray-500 hover:text-lime-600">
                  Sign Up
                </a>
              </div>
              </nav>

            <div className="mt-6">
              <p className="text-base leading-4 text-white-800">
                2021 <span className="font-semibold">Look at This</span>
              </p>
              <div className="border-l border-white-800 pl-2 ml-2">
                <p className="text-base leading-4 text-white-800">Inc. All rights reserved</p>
              </div>
            </div>
          </div>
        </footer>
        
  )
}
