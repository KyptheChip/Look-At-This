import React from "react";
import {Link, useNavigate} from "react-router-dom";


export default function Navbar() {

  let navigate = useNavigate();

  const handleClickMenu = () => {
    document.querySelector('#menu').classList.toggle('hidden');
  }

  const handleClick = () => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    } else {
      navigate("/add-location");
    }
  }

  return (
    <header className="sticky top-0 z-50 divide-y
    divide-solid divide-lime-200">
    <nav
       className="
         flex flex-wrap
         items-center
         justify-between
         w-full
         py-4
         md:py-0
         px-4
         text-lg text-gray-700
         bg-white
         
       "
     >
      <div>
          <a class="flex items-center py-5 px-2 text-black hover:text-lime-800">
            <img className="h-12 w-15" src="https://img.icons8.com/cotton/64/000000/world-map.png"/>
            <span class="font-bold text-3xl"><Link to="/">Look at This</Link></span>
          </a>
        </div>
      
        <svg
           xmlns="http://www.w3.org/2000/svg"
           id="menu-button"
           class="h-6 w-6 cursor-pointer md:hidden block"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           onClick={handleClickMenu}
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             stroke-width="2"
             d="M4 6h16M4 12h16M4 18h16"
           />
         </svg>
      
      <div class="hidden w-full md:flex md:items-center md:w-auto" id="menu">
         <ul
           class="
             pt-4
             text-base text-gray-700
             md:flex
             md:justify-between 
             md:pt-0"
         >
           <li>
             <a class="md:p-4 py-2 block hover:text-lime-600 text-2xl" 
               ><Link to="/">Home</Link></a>
           </li>
           <li>
             <a class="md:p-4 py-2 block hover:text-lime-600 text-2xl" 
               ><Link to="/location-list">All locations</Link></a>
           </li>
           <li>
             <button onClick={handleClick} class="md:p-4 py-2 block hover:text-lime-600 text-2xl">Add location</button>
           </li>
           <li>
             <a
               class="md:p-4 py-2 block hover:text-lime-600 text-lime-800 text-2xl"
               >Sign Up</a>
           </li>
         </ul>
       </div>
   </nav>
 </header>
  );
}

