import React, {useEffect, useState} from "react";

export default function LocationsList() {

  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/location-list')
      .then(response => response.json())
      .then((response) => {
        setLocationList(response)
      })
  }, []);

  const deleteLocation = (event) => {
    fetch(
      'http://localhost:8080/delete-location/' + event.target.id,
      {
        method: 'DELETE'
      })
      .then(response => console.log(response.json()));
  }

  return (
    <section className="inner-page">
      <div className="container">
        {locationList.map((location) => (
          <div key={location.id} className="card mb-3" style={{maxWidth: "800px"}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img className="img-fluid rounded-start" src={`data:image/jpeg;base64,${location.imageData}`}
                     alt=""/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{location.title}</h5>
                  <p className="card-text">{location.message}</p>
                  <button id={location.id} onClick={deleteLocation}>Delete Location</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}