import * as React from 'react';

export const DisplayMapFC = () => {
    // Create a reference to the HTML element we want to put the map on
    const mapRef = React.useRef(null);

    /**
     * Create the map instance
     * While `useEffect` could also be used here, `useLayoutEffect` will render
     * the map sooner
     */

    React.useLayoutEffect(() => {
        // `mapRef.current` will be `undefined` when this hook first runs; edge case that
        if (!mapRef.current) return;
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "1sAoW8xIFuR8nJtk4ViLLSIbhKMJOJmrJkGoQdHhEhA"
        });
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
                center: {lat: 44.4268, lng: 26.1025},
                zoom: 8,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        const provider = hMap.getBaseLayer().getProvider();
        const style = new H.map.Style('https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml');
        provider.setStyle(style);

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

        const ui = H.ui.UI.createDefault(hMap, defaultLayers);

        hMap.addEventListener("tap", async event => {
            const position = hMap.screenToGeo(
                event.currentPointer.viewportX,
                event.currentPointer.viewportY
            )

            hMap.removeObjects(hMap.getObjects());

            const marker = new H.map.Marker(position);
            hMap.addObject(marker);

            document.getElementById("locationLatitude").value = position.lat;
            document.getElementById("locationLongitude").value = position.lng;
        })

        // This will act as a cleanup to run once this hook runs again.
        // This includes when the component un-mounts
        return () => {
            hMap.dispose();
        };
    }, [mapRef]); // This will run this hook every time this ref is updated

    return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};