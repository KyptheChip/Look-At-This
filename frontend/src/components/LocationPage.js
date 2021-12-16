import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {EmbedMap} from "./EmbedMap";

export default function LocationPage() {
  let navigate = useNavigate()

  const {locationId} = useParams();

  const [location, setLocation] = useState(
    {
      id: 0,
      title: "",
      message: "",
      imageData: "",
      latitude: 0,
      longitude: 0,
      tags: []
    }
  );

  useEffect(() => {
    fetch('http://localhost:8080/location/' + locationId,
      {headers: {"Content-Type": "application/json"}})
      .then(response => response.json())
      .then((response) => {
        setLocation(response)
      });
  }, []);

  const deleteLocation = (event) => {
    fetch(
      'http://localhost:8080/delete-location/' + event.target.id,
      {
        method: 'DELETE'
      });
      setTimeout(() => navigate('/location-list'), 500)
  }

  return (
    <section className="inner-page flex justify-center">
      <div className="container">
          <div key={location.id} className="card mb-3 space-y-8 max-w-5xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <img className="img-fluid rounded-start" src={`data:image/jpeg;base64,${location.imageData}`}
                 alt=""/>
            <div className="card-body space-y-8">
              <div>
                <h1 className="class=block mt-2 text-2xl font-semibold text-gray-800 dark:text-white">{location.title}</h1>
                <p className="card-text">{location.message}</p>
                <p>{location.tags.map(tag => <span key={tag.id} id={tag.id}>#{tag.name} </span>)}</p>
              </div>
              <div className="space-y-2">
                <p><button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-800" id={location.id} onClick={deleteLocation}>Delete location</button></p>
                <p><button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-800" id={location.id}><Link className='getstarted link' to={'/edit-location/' + locationId}>Update location</Link></button></p>
              </div>
            </div>
            <div className="card mb-3 space-y-8 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 h-full">
              <EmbedMap location={location}/>
            </div>
          </div>
      </div>
    </section>
  );
}