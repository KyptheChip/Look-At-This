import * as React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const API_TOKEN='pk.eyJ1Ijoic2llYmVsIiwiYSI6ImNrdnU1ejV0bDB5ZzcydWx5ZDU0c2Vxa2sifQ.MIC6kFfc4VYuz-H6awJ4IQ';

export function DisplayMapFC() {
    const [viewport, setViewport] = React.useState({
        latitude: 44.4361414,
        longitude: 26.1027202,
        width: "70vw",
        height: "80vh",
        zoom: 10
    });

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
    }

    return (
      <div>
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
                  <p>HEY</p>
              </Marker>
          </ReactMapGL>
      </div>
    );
}