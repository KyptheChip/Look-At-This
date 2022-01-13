import React, {useEffect, useState} from "react";
import {DisplayMapFC} from "./Map"
import {useParams} from "react-router";
import {useNavigate} from 'react-router-dom'


export default function UpdateForm() {
  let navigate = useNavigate()

  const {locationId} = useParams();

  const [allTags, setAllTags] = useState([])

  const [locationTags, setLocationTags] = useState([]);

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

  useEffect(() => {
    fetch('http://localhost:8080/location/get/' + locationId,
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
        // setLocationTags(response.tags)
        // console.log(location)
      })
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/tag/list")
      .then(response => response.json())
      .then(data => setAllTags(data))
  }, []);


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

  const handleTagClick = (event) => {
    
    event.target.classList.toggle("bg-lime-600")
    if(event.target.classList.contains("text-black")) {
      event.target.classList.replace("text-black", "text-white")

      setLocationTags(
        [...locationTags, {
          id: parseInt(event.target.id),
          name: event.target.innerText
        }]
      );

    } else {
      event.target.classList.replace("text-white", "text-black")

      setLocationTags(locationTags.filter(tag => tag.name !== event.target.innerText))
    }
    // console.log(allTags)
    console.log(locationTags);
  }

  const handleSubmit = event => {
    event.preventDefault();
    let locationToSend = {
      ...location,
      imageData: imageUrl,
      ...coordinates,
      tags: locationTags,
      username: localStorage.getItem("username")
    }
    // console.log(locationToSend);
    fetch(
      "http://0.0.0.0:8080/location/edit",
      {
        method : "PUT",
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(locationToSend)
      })
      .then(response => response.json())
      .catch(function() {});
      setTimeout(() => navigate('/location-list'), 500)
  }

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6" id="map-container">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-1">
            <DisplayMapFC/>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2 border border-lime-600">
          <form action="#" onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-xl font-medium text-gray-700 ">
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="locationName" value={location.title} onChange={handleChange} required
                        className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-xs rounded-lg focus:ring-lime-800 focus:border-lime-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Give your location a title"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="about" className="block text-xl font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      value={location.message} onChange={handleChange} required
                      id="message" 
                      name="message"
                      rows={3}
                      className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-800 focus:border-lime-800 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your description here"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="first_name" class="block text-xl font-medium text-gray-700">Location latitude</label>
                  <p className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="locationLatitude">{coordinates.latitude}</p>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label for="last_name" class="block text-xl font-medium text-gray-700">Location longitude</label>
                  <p className="bg-gray-100 border border-lime-800 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="locationLongitude">{coordinates.longitude}</p>
                </div>
                <div>
                  <label for="formFile" className="form-label block text-xl font-medium text-gray-700">Location photo</label>
                  <input type="file" name="imageData" id="formFile" accept=".png,.jpg,.jpeg" value={imageUrl.imageData} onChange={handleImageChange} required
                    className="border-lime-800 focus:ring-lime-800 block w-full overflow-hidden cursor-pointer border text-gray-900 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent p-2.5"/>
                </div>
                <div className="col-span-6 sm:col-span-3 h-3/5 w-3/5">
                  <img src={`data:image/jpeg;base64,${imageUrl}`} className="img-responsive " alt='' />
                </div>
                <div className="container h-20 w-full  space-x-4">
                  <label for="formFile" className="form-label block text-xl font-medium text-gray-700">Location tags</label>
                  <br/>
                  {allTags.map((tag) =>
                        // !locationTags.includes(tag) ?
                        // console.log("da")
                          (<span key={tag.id} id={tag.id} className="inline-flex items-center justify-center px-5 py-2 text-l font-bold leading-none text-black rounded-full border border-lime-600" onClick={handleTagClick}>{tag.name}</span>)
                      // :
                        // console.log("nu")
                        //   (<span key={tag.id} id={tag.id} className="inline-flex items-center justify-center px-5 py-2 text-l font-bold leading-none text-white rounded-full border border-lime-600 bg-lime-600" onClick={handleTagClick}>{tag.name}</span>)

                  )}
                  </div>
              </div>
              <br/>
                <div className="px-4 py-3 bg-gray-100 text-center sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-800"
                  >
                    Save location
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
  );
}