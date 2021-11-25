import React, {useEffect, useState} from "react";
import {DisplayMapFC} from "./Map"
import {Link} from "react-router-dom";

export default function Form() {
  useEffect(() => {
    fetch("http://localhost:8080/tag-list")
      .then(response => response.json())
      .then(data => setAllTags(data))
  });

  const [location, setLocation] = useState({
    id: 0,
    title: "",
    message: ""
  });

  const [coordinates, setCoordinates] = useState({
    longitude: 0,
    latitude: 0
  })

  const [imageUrl, setImageUrl] = useState("")

  const [allTags, setAllTags] = useState([])
  const [tags, setTags] = useState([]);

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

  const handleTagAdd = (event) => {
    setTags(
      [...tags, {
        id: event.target.id,
        name: event.target.innerText
      }]
    );
  }

  const handleSubmit = event => {
    event.preventDefault();
    let locationToSend = {
      ...location,
      imageData: imageUrl,
      ...coordinates,
      tags : tags
    }
    console.log(locationToSend);
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
            {/*<input type="number" className="form-control" name="location_lat" id="locationLatitude" step="any" value={coordinates.latitude} required/>*/}
            <p id="locationLatitude">{coordinates.latitude}</p>
            <label htmlFor="locationLongitude">Location Longitude</label>
            {/*<input type="number" className="form-control" name="location_lng" id="locationLongitude" step="any" value={coordinates.longitude} required/>*/}
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
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control" name="imageData" id="image" accept=".png,.jpg,.jpeg" value={imageUrl.imageData} onChange={handleImageChange} />
          </div>
          <div className="form-group mt-3">
            <p>Tags(Click to add a tag)</p>
            {allTags.map(tag => <p><button type="button" id={tag.id} onClick={handleTagAdd}>{tag.name}</button></p>)}
          </div>
          <div className="text-center">
            <button type="submit"><Link className='link' to={'/location-list'}>Add Location</Link></button>
          </div>
        </form>
      </div>
    </section>
    </main>
  );
}