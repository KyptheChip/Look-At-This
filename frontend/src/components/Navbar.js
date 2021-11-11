import React from "react";
import {Link} from "react-router-dom";

export default function Navbar() {

  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container d-flex align-items-center">

        <h1 className="logo me-auto"><a href="/">Look at This</a></h1>

        <nav id="navbar" className="navbar">
          <ul>
            <li><Link className="nav-link scrollto active" to="/">Home</Link></li>
            <li><Link className="nav-link scrollto" to="#about">About</Link></li>
            <li><Link className="nav-link scrollto " to="#portfolio">Portfolio</Link></li>
            <li><Link className="nav-link scrollto" to="#team">Team</Link></li>
            <li><Link className="nav-link scrollto" to="#contact">Contact</Link></li>
            <li><Link className="nav-link scrollto" to="/location-list">All Locations</Link></li>
            <li><Link className="getstarted scrollto" to="/add-location">Get Started</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"/>
        </nav>

      </div>
    </header>
  );
}

