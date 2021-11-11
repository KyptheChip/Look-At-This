import React, {useState} from "react";
import {DisplayMapFC} from "./Map"
import {Link} from "react-router-dom";

export default function Form() {
  const [location, setLocation] = useState({
    "id": "0",
    "title": "",
    "message": ""
  });

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
  }

  const handleSubmit = event => {
    event.preventDefault();
    let locationToSend = {
      ...location,
      "imageData": imageUrl
    }
    fetch(
      "http://0.0.0.0:8080/add-location",
      {
        method : "POST",
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
            <input type="number" className="form-control" name="location_lat" id="locationLatitude" step="any" required/>
            <label htmlFor="locationLongitude">Location Longitude</label>
              <input type="number" className="form-control" name="location_lng" id="locationLongitude" step="any" required/>
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
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control" name="imageData" id="image" accept=".png,.jpg,.jpeg" value={imageUrl.imageData} onChange={handleImageChange} />
          </div>
          <div className="text-center">
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </section>
    </main>
  );
}