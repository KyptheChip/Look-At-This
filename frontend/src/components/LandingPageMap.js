import * as React from 'react';
import {useState, useEffect} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const API_TOKEN='pk.eyJ1Ijoic2llYmVsIiwiYSI6ImNrdnU1ejV0bDB5ZzcydWx5ZDU0c2Vxa2sifQ.MIC6kFfc4VYuz-H6awJ4IQ';

export default function LandingPageMap() {
    
    const [locationList, setLocationList] = useState([]);

    useEffect(async () => {
        fetch('http://localhost:8080/location/list')
        .then(response => response.json())
        .then((response) => {
            setLocationList(response)
        })
    }, []);
    
    const [viewport, setViewport] = React.useState({
        latitude: 44.4361414,
        longitude: 26.1027202,
        width: "100%",
        height: "700px",
        zoom: 1.7,
    });

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setViewport(
        {
          latitude: viewport.latitude,
          longitude: viewport.longitude,
          width: "100%",
          height: viewport.height,
          zoom: viewport.zoom,
        }
      )
    }, 0)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)

    }
  })

    const popups = document.getElementsByClassName("popup")

    const handleClick = event => {
        for(let i = 0; i < popups.length; i++) {
            if(popups[i].id === event.target.id && popups[i].classList.contains("hidden")) {
                popups[i].classList.replace("hidden", "block")
            } else {
                popups[i].classList.replace("block", "hidden")
            }
        }
    }
    


    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
        c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
        C20.1,15.8,20.2,15.8,20.2,15.7z`;

    const pinStyle = {
        cursor: 'pointer',
        fill: '#d00',
        stroke: 'none'
    };

    return (
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={API_TOKEN}
            mapStyle={'mapbox://styles/siebel/ckvu9qik01j7l14paano3z43q'}
            scrollZoom={false}
            className="z-0"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
          >
              {locationList.map(location => (
                <Marker longitude={location.longitude} latitude={location.latitude} id={location.id}>
                    <svg
                        height={20}
                        viewBox="0 0 24 24"
                        style={{...pinStyle, transform: `translate(-10px,-23px)`}}
                        id={location.id}
                        className="z-10"
                        onClick={handleClick}
                    >
                        <path d={ICON}/>
                    </svg>
                    {/* <div class="hidden max-w-l mx-auto popup z-20" id={location.id}>
                        <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt=""/>
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                                </a>
                                <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                        </div>
                        <p class="mt-5">This card component is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a class="text-blue-600 hover:underline" href="https://flowbite.com/docs/getting-started/introduction/" target="_blank">Flowbite Documentation</a>.</p>
                    </div> */}
                </Marker>
              ))}
          </ReactMapGL>
    );
}

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}