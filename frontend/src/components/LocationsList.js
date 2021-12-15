import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function LocationsList() {

  const [locationList, setLocationList] = useState([]);

  useEffect(async () => {
    fetch('http://localhost:8080/location-list')
      .then(response => response.json())
      .then((response) => {
        setLocationList(response)
      })
    // const response = await fetch('http://localhost:8080/location-list');
    // const json = await response.json();
    // setLocationList(json);
  }, []);

  const getLocationsByTag = async event => {
    fetch('http://localhost:8080/locations-by-tag/' + event.target.id)
      .then(response => response.json())
      .then((response) => {
        setLocationList(response)
      })
  }

  const getLocations = async event => {
      fetch('http://localhost:8080/location-list/' + event.target.value)
          .then(response => response.json())
          .then((response) => {
              setLocationList(response)
          })
  }

  return [
    <div className="search-bar-container flex justify-center pb-8">
      <input className='bg-gray-100 border border-lime-600 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-800 focus:border-lime-800 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" placeholder="Search for a location" onChange={getLocations}/>
    </div>,
    <section className="inner-page flex justify-center">

      <div className="container columns-2 space-y-12">
        {locationList.map((location) => (
          <div class="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <img class="object-cover w-full h-64" src={`data:image/jpeg;base64,${location.imageData}`} alt="Article"/>

          <div class="p-6">
              <div>
              {location.tags.map(tag => <span key={tag.id} id={tag.id} className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400" onClick={getLocationsByTag}>#{tag.name} </span>)}
                  <a href="#" class="block mt-2 text-2xl font-semibold text-gray-800 dark:text-white hover:text-gray-600 hover:underline"><Link to={"/location/" + location.id}>{location.title}</Link></a>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{location.message}</p>
              </div>

              <div class="mt-4">
                  <div class="flex items-center">
                      <div class="flex items-center">
                          <img class="object-cover h-10 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="Avatar"/>
                          <a href="#" class="mx-2 font-semibold text-gray-700 dark:text-gray-200">Jone Doe</a>
                      </div>
                      <span class="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
                  </div>
              </div>
          </div>
      </div>
    // <div>
    // {locationList.map((location) => (
    //       <div key={location.id} className="card mb-3" style={{maxWidth: "800px"}}>
    //         <div className="row g-0">
    //           <div className="col-md-4">
    //             <img className="img-fluid rounded-start" src={`data:image/jpeg;base64,${location.imageData}`}
    //                  alt=""/>
    //           </div>
    //           <div className="col-md-8">
    //             <div className="card-body">
    //               <h5 className="card-title"><Link to={"/location/" + location.id}>{location.title}</Link></h5>
    //               <p className="card-text">{location.message}</p>
    //               <div>
    //                 {location.tags.map(tag => <span key={tag.id} id={tag.id} onClick={getLocationsByTag}>#{tag.name} </span>)}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
        ))}
      </div>
   </section>
  ];
}