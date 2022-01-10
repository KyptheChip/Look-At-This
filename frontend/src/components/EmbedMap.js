import * as React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const API_TOKEN='pk.eyJ1Ijoic2llYmVsIiwiYSI6ImNrdnU1ejV0bDB5ZzcydWx5ZDU0c2Vxa2sifQ.MIC6kFfc4VYuz-H6awJ4IQ';

export function EmbedMap(props) {

    const [viewport, setViewport] = React.useState({
        latitude: props.location.latitude,
        longitude: props.location.longitude,
        width: "100%",
        height: "400px",
        zoom: 5
    });

    console.log(viewport)

    const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
        c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
        C20.1,15.8,20.2,15.8,20.2,15.7z`;

    const pinStyle = {
        cursor: 'pointer',
        fill: '#d00',
        stroke: 'none'
    };

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={API_TOKEN}
                mapStyle={'mapbox://styles/siebel/ckvu9qik01j7l14paano3z43q'}
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                <Marker longitude={props.location.longitude} latitude={props.location.latitude}>
                    <svg
                        height={20}
                        viewBox="0 0 24 24"
                        style={{...pinStyle, transform: `translate(-10px,-23px)`}}
                    >
                        <path d={ICON}/>
                    </svg>
                </Marker>
            </ReactMapGL>
        </div>
    );
}