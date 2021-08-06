import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import Listing from '../Pages/Listing';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoid2VlZG9tY29tIiwiYSI6ImNrbWN6aG1wbDBmZnEycG1ubmNuNnZkc3kifQ.UNlhKjCFNY7-Kr6CgsLBnQ';

const MiniMap = (props) => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(props.listing.geo.lon);
  const [lat, setLat] = useState(props.listing.geo.lat);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/weedomcom/ckpk6dr1z4mw218pg0atvwmav',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('load', () => {
    //   setLng(map.getCenter().lng.toFixed(4));
    //   setLat(map.getCenter().lat.toFixed(4));
    //   setZoom(map.getZoom().toFixed(2));
        var el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
        el.id = "marker-" + props.listing.syncid;
          /* Assign the `marker` class to each marker for styling. */
        el.className = (props.listing.type == 'delivery') ? 'purple-marker' : 'green-marker';
        new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h4>' + props.listing.name + '</h4><h6 style="text-transform:capitalize;">' + props.listing.type + '</h6>' + `<p>${(props.listing.address != null && props.listing.address != 'null') ? props.listing.address : ''}</p><p>${props.listing.city}, ${props.listing.state} ${props.listing.zip_code}</p>`))
        .addTo(map);

    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="map-container small-map" ref={mapContainer} />
    </div>
  );
};

export default MiniMap
