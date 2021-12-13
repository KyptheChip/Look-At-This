import React, {useEffect, useState} from "react";
import {DisplayMapFC} from "./Map"

export default function Form() {
  useEffect(() => {
    fetch("http://localhost:8080/tag-list")
      .then(response => response.json())
      .then(data => setAllTags(data))
  }, []);

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
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6" id="map-container">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <DisplayMapFC/>
          </div>
      </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="title"
                          id="locationName" value={location.title} onChange={handleChange} required
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Give your location a title"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        value={location.message} onChange={handleChange} required
                        id="message" 
                        name="message"
                        rows={3}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your description here"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label for="first_name" class="block text-sm font-medium text-gray-700">Location latitude</label>
                    <p className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="locationLatitude">{coordinates.latitude}</p>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label for="last_name" class="block text-sm font-medium text-gray-700">Location longitude</label>
                    <p className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="locationLongitude">{coordinates.longitude}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location photo</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input type="file" name="imageData" id="file-upload" accept=".png,.jpg,.jpeg" value={imageUrl.imageData} onChange={handleImageChange} className="sr-only"/>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    // <main id="main">
    // <section className="inner-page">
    //   <div className="container">
    //     <form onSubmit={handleSubmit} className="php-email-form" encType='multipart/form-data'>
    //       <DisplayMapFC/>
    //       <div className="form-group mt-3">
    //         <label htmlFor="locationLatitude">Location Latitude</label>
    //         <p id="locationLatitude">{coordinates.latitude}</p>
    //         <label htmlFor="locationLongitude">Location Longitude</label>
    //         <p id="locationLongitude">{coordinates.longitude}</p>
    //       </div>
    //       <div className="form-group mt-3">
    //         <label htmlFor="locationName">Location Name</label>
    //         <input type="text" className="form-control" name="title" id="locationName" value={location.title} onChange={handleChange} required/>
    //       </div>
    //       <div className="form-group mt-3">
    //         <label htmlFor="message">Message</label>
    //         <textarea id="message" className="form-control" name="message" rows="10" value={location.message} onChange={handleChange} required/>
    //       </div>
    //       <div className="form-group mt-3">
    //         <label htmlFor="image">Image</label>
    //         <input type="file" className="form-control" name="imageData" id="image" accept=".png,.jpg,.jpeg" value={imageUrl.imageData} onChange={handleImageChange} />
    //       </div>
    //       <div className="form-group mt-3">
    //         <p>Tags(Click to add a tag)</p>
    //         {allTags.map(tag => <p><button type="button" id={tag.id} onClick={handleTagAdd}>{tag.name}</button></p>)}
    //       </div>
    //       <div className="text-center">
    //         <button type="submit">Add Location</button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
    // </main>
  );
}