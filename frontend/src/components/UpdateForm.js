import React, {useEffect, useState} from "react";
import {DisplayMapFC} from "./Map"
import {useParams} from "react-router";

export default function UpdateForm() {

  const {locationId} = useParams();

  useEffect(() => {
    fetch('http://localhost:8080/location/' + locationId,
      {headers: {"Content-Type": "application/json"}})
      .then(response => response.json())
      .then((response) => {
        setLocation({
          id: locationId,
          title: response.title,
          message: response.message
        })
        setCoordinates({
          longitude: response.longitude,
          latitude: response.latitude
        })
        setImageUrl(response.imageData)
      })
  }, []);


  const [location, setLocation] = useState({
    id: 0,
    title: "",
    message: "",
  });

  const [coordinates, setCoordinates] = useState({
    longitude: 0,
    latitude: 0
  })

  const [imageUrl, setImageUrl] = useState("")


  const handleChange = event => {
    const {name, value} = event.target;
    setLocation({
      ...location,
      [name] : value
    });
    console.log(location);
  }

  const handleImageChange = e => {
    let reader = new FileReader();
    let dataURL = e.target.files[0]
    reader.readAsDataURL(dataURL)
    reader.onload = function (e) {
      setImageUrl(reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""))
    }
    setCoordinates({
      latitude: document.getElementById("locationLatitude").innerText,
      longitude: document.getElementById("locationLongitude").innerText
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    let locationToSend = {
      ...location,
      imageData: imageUrl,
      ...coordinates
    }
    console.log(locationToSend);
    fetch(
      "http://0.0.0.0:8080/edit-location",
      {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(locationToSend)
      })
      .then(response => response.json())
      .catch(function() {});
  }

  return (
    <main id="main">
      <section className="inner-page">
        <div className="container">
          <form onSubmit={handleSubmit} className="php-email-form" encType='multipart/form-data'>
            <DisplayMapFC/>
            <div className="form-group mt-3">
              <label htmlFor="locationLatitude">Location Latitude</label>
              <p id="locationLatitude">{coordinates.latitude}</p>
              <label htmlFor="locationLongitude">Location Longitude</label>
              <p id="locationLongitude">{coordinates.longitude}</p>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="locationName">Location Name</label>
              <input type="text" className="form-control" name="title" id="locationName" value={location.title} onChange={handleChange} required/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="message">Message</label>
              <textarea id="message" className="form-control" name="message" rows="10" value={location.message} onChange={handleChange} required/>
            </div>
            <div className="form-group mt-3">
              <p><label htmlFor="image">Image</label></p>
              <img style={{maxWidth: "300px"}} className="img-fluid rounded-start" src={`data:image/jpeg;base64,${imageUrl}`} alt='' />
              <input type="file" className="form-control" name="imageData" id="image" accept=".png,.jpg,.jpeg" value={imageUrl.imageData} onChange={handleImageChange} />
            </div>
            <div className="text-center">
              <button type="submit">Update Location</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}