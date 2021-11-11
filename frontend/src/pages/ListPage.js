import React from "react";
import Navbar from "../components/Navbar";
import LocationsList from "../components/LocationsList";

export default function ListPage() {
  return [
    <Navbar/>,
    <LocationsList/>
  ]
}