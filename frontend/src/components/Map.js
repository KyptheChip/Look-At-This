import * as React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const API_TOKEN='pk.eyJ1Ijoic2llYmVsIiwiYSI6ImNrdnU1ejV0bDB5ZzcydWx5ZDU0c2Vxa2sifQ.MIC6kFfc4VYuz-H6awJ4IQ';

export function DisplayMapFC() {
    const [viewport, setViewport] = React.useState({
        latitude: 44.4361414,
        longitude: 26.1027202,
        width: "100%",
        height: "500px",
        zoom: 10,
        container: 'map-container'
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
          container: viewport.container
        }
      )
    }, 0)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)

    }
  })

    const [marker, setMarker] = React.useState({
        latitude: 44.4361414,
        longitude: 26.1027202
    });

    const addMarker = (e) => {
        const [lng, lat] = e.lngLat
        setMarker({
            latitude : lat,
            longitude : lng,
        });

        document.getElementById("locationLatitude").innerText = marker.latitude
        document.getElementById("locationLongitude").innerText = marker.longitude
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
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            onClick={addMarker}
          >
              <Marker longitude={marker.longitude} latitude={marker.latitude}>
                  <svg
                      height={20}
                      viewBox="0 0 24 24"
                      style={{...pinStyle, transform: `translate(-10px,-23px)`}}
                  >
                      <path d={ICON}/>
                  </svg>
              </Marker>
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