// import React, { useRef, useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import {Button} from 'react-bootstrap';
// import ReactMapboxGl, {Image, Layer, Marker, Feature, geoJsonSource, GeoJSONLayer, MapContext} from "react-mapbox-gl";
// import  { withStore } from '../util/datastore'
// import 'mapbox-gl/dist/mapbox-gl.css';
// // import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

// // mapboxgl.workerClass = MapboxWorker;
// const Map = ReactMapboxGl({
//     accessToken: 'pk.eyJ1IjoiZGdyb2Nob3dpY3oiLCJhIjoiY2tjZDNhbnQ3MDhxejJ4cDNtcTdhb29zNCJ9.nBwzmcvP2BYFxkuWv2vJJA'
//   });
// window.movingTimeout = null
// const ListingMap = (props) => {
//   console.log(props)
//   const mapContainer = useRef();
//   const [lng, setLng] = useState(null);
//   const [lat, setLat] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [updating, setUpdating] = useState(false)
//   const [mapBounds, setMapBounds] = useState(null);
//   const [btnVisible, setBtnVisible] = useState(false);
//   const [zoom, setZoom] = useState((props.store.mapData.zoom)? props.store.mapData.zoom : 9);
  
    
// //   useEffect(() => {
// //     const map = new mapboxgl.Map({
// //       container: mapContainer.current,
// //       style: 'mapbox://styles/mapbox/streets-v11',
// //       center: [lng, lat],
// //       zoom: zoom
// //     });

//     const handleClick = (e)=>{
//         console.log(e)
//         console.log(mapContainer)
//         // console.log(mapContainer.current.state.map)
//         // setBtnVisible(false)
//         setUpdating(true)
//         props.handleMapUpdate(mapContainer.current.state.map)
//         .then(center=>{
//           // setLng(center.lng)
//           // setLng(props.store.mapData.lng);
//           // setLat(props.store.mapData.lat);
//           // setZoom(props.store.mapData.zoom);
//           // setLat(center.lat)
//           // mapContainer.current.state.map.fitBounds(props.store.mapData.fitBounds)
//           // clearTimeout(window.movingTimeout)

//           setBtnVisible(false)
//           setUpdating(false)
//         })
//     }

//     const handleExpandMap = (mc)=>{

//       props.toggleExpandMap(mc)
//     }
//     const handleMove = (e)=>{
//       // if (e.fitboundUpdate) {
//       //   console.log('Map bounds have been programmatically changed')
//       // } else {
//       //   // console.log('Map bounds have been changed by user interaction')
//       // }
//       // if(!e.dragPan.isActive())
//       // {
//       //   e.preventDefault()
//       // }
//       // setBtnVisible(false)
//       // console.log(e)
//       // console.log(e.dragPan.isActive())
//       // let b = e.getBounds()
//       //   let fitBounds = [[b._sw.lng, b._ne.lat],[b._ne.lng, b._sw.lat]]
//       //   console.log(fitBounds)
        
//     }
// //     function disableInteraction(map) {
// //       map.scrollZoom.disable()
// //       map.boxZoom.disable()
// //       // map.dragRotate.disable()
// //       map.dragPan.disable()
// //       // map.keyboard.disable()
// //       // map.doubleClickZoom.disable()
// //       // map.touchZoomRotate.disable()
// //   }
// //   function enableInteraction(map) {
// //     map.scrollZoom.enable()
// //     map.boxZoom.enable()
// //     map.dragRotate.enable()
// //     map.dragPan.enable()
// //     map.keyboard.enable()
// //     map.doubleClickZoom.enable()
// //     map.touchZoomRotate.enable()
// // }
// const createGeoJSON = (data) => {
//   let gj = {
//     type: "FeatureCollection",
//   };

//   let feat = data.map((l) => {
//     return {
//       type: "Feature",
//       properties: {
//         address: l.address,
//         type: l.type,
//         name: l.name,
//         city: l.city,
//         state: l.state,
//         zip_code: l.zip_code,
//         popup: `<ul class="list-unstyled"><li><h5>${l.properties.name}</h5></li><li><h6 style="text-transform:capitalize;">${l.properties.type}</h6></li><li>${(l.properties.address != null && l.properties.address != 'null') ?l.properties.address : ''}</li><li>${l.properties.city}, ${l.properties.state} ${l.properties.zip_code}<li><li>${l.properties.phone}</li><li><a href="${l.properties.url}">View Profile</a></li></ul>`
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [l.geo.lon, l.geo.lat],
//       },
//     };
//   });

//   gj.features = feat;

//   return gj;
// };
//     const handleMoveEnd = (e)=>{
//       // if (e.fitboundUpdate) {
//       //   console.log('Map bounds have been programmatically changed')
//       // } else {
//       //   console.log('Map bounds have been changed by user interaction')
//       // }
//       if(updating || loading){
//         return false
//       }
//       // clearTimeout(window.movingTimeout)
//       console.log(e)
//       // disableInteraction(e)
//       // console.log(e.dragPan.isActive())
//       // console.log(e.dragPan)
//       // console.log(e.getZoom())
      
//       // window.movingTimeout = setTimeout(() => {
//         // clearTimeout(movingTimeout)
//         // props.store.updateMapData({
//         //   zoom: e.getZoom().toFixed(2),
//         //   lat: e.getCenter().lat,
//         //   lng: e.getCenter().lng,
          
//         // })
//         let b = e.getBounds()
//         let fitBounds = [[b._sw.lng.toFixed(7), b._ne.lat.toFixed(7)],[b._ne.lng.toFixed(7), b._sw.lat.toFixed(7)]]
//         console.log(e.getBounds().toString())
//         console.log(fitBounds)
//         // e.fitBounds(fitBounds, {center:e.get})
//         if((props.store.mapData.fitBounds == undefined ) || fitBounds.toString() != props.store.mapData.fitBounds.toString()){
//           console.log('boundsChanged')
        
//         props.store.updateMapData({
//           zoom: e.getZoom(),
//           lat: e.getCenter().lat,
//           lng: e.getCenter().lng,
//           bounds: e.getBounds(),
//           fitBounds: fitBounds,
//           // mapObj: e
          
//         })
//         // setLng(props.store.mapData.lng);
//         // setLat(props.store.mapData.lat);
//         // setZoom(props.store.mapData.zoom);
//         e.fitBounds(props.store.mapData.fitBounds)
//         // console.log(mapContainer)
//         // console.log(Map)
        
        
//         // setLat(e.getCenter().lat.toFixed(4));
//         // setZoom(e.getZoom().toFixed(2));  
//         // setMapBounds(e.getBounds())
//         setBtnVisible(true)
//       }
//         // enableInteraction(e)
//       // }, 2000);
      

//     };

// //     return () => map.remove();
// //   }, []);
//     let geoj = createGeoJSON(props.listings)

// let disp = {type: "FeatureCollection", features: geoj.features.filter(d=>d.properties.type == 'dispensary')};
// // let disp = {type: "FeatureCollection", features: props.geojson.features.filter(d=>d.properties.type == 'dispensary')};
//     let del = {type: "FeatureCollection", features: geoj.features.filter(d=>d.properties.type == 'delivery')};
//     // let del = {type: "FeatureCollection", features: props.geojson.features.filter(d=>d.properties.type == 'delivery')};
//     console.log(props.geojson)
//   return (
//     <Map 
//     style='mapbox://styles/dgrochowicz/ckmhh0zwe0kyd17o4av0okzkp'
//     center={[(props.store.mapData.lng)? props.store.mapData.lng : props.center.lon, (props.store.mapData.lat)? props.store.mapData.lat : props.center.lat]}
//     id="map"
   
//     ref = {mapContainer}
//     // onMove={handleMove}
//     // onDragEnd={(e)=>handleMoveEnd(e)}
//     onMoveEnd={(e)=>handleMoveEnd(e)}
//     onStyleLoad={(m,e)=>{
//       console.log('onStyleLoad')
//       m.fitBounds(props.bounds)
//       setUpdating(true)
//       setBtnVisible(false)
//       setTimeout(() => {
//         setUpdating(false)
//         // setBtnVisible(false)
//         setLoading(false)
//       }, 300);
//     }}
    
//     >
//       {/* <div id="expand-arrow" onClick={()=>handleExpandMap(mapContainer)}>
//                 <KeyboardArrowLeftIcon/>
//             </div> */}
//       {btnVisible &&
//         <Button className={btnVisible ? "search-again-btn" : "search-again-btn hidden"} variant="light" onClick={(e)=> handleClick(e)}>Search This Area</Button> 
//       }
//       <MapContext.Consumer>
//       {(map) => {
//         // use `map` here

//         disp.features.forEach(function(marker) {
//           var el = document.createElement('div');
//           /* Assign a unique `id` to the marker. */
//           el.id = "marker-" + marker.properties.id;
//           /* Assign the `marker` class to each marker for styling. */
//           el.className = 'green-marker';
          
//           /**
//            * Create a marker using the div element
//            * defined above and add it to the map.
//           **/
//           new mapboxgl.Marker(el, { offset: [0, -23] })
//             .setLngLat(marker.geometry.coordinates)
//             .addTo(map);
//         })
//         del.features.forEach(function(marker) {
//           var el = document.createElement('div');
//           /* Assign a unique `id` to the marker. */
//           el.id = "marker-" + marker.properties.id;
//           /* Assign the `marker` class to each marker for styling. */
//           el.className = 'purple-marker';
          
//           /**
//            * Create a marker using the div element
//            * defined above and add it to the map.
//           **/
//           new Marker(el, { offset: [0, -23] })
//             .setLngLat(marker.geometry.coordinates)
//             .addTo(map);
//         })

//       }}
//     </MapContext.Consumer>
//         {/* <Image id={'green-mark'} url={'/images/greenpin.png'} />
//         <Image id={'purp-mark'} url={'/images/purppin.png'} />
//         <GeoJSONLayer
//   data={disp}
//   symbolLayout={{
//     // "text-field": "{name}",
//     // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//     // "text-offset": [0, 0.6],
//     // "text-anchor": "top",
//     'icon-image': 'green-mark',
//     'icon-size': 1,
//     'icon-ignore-placement': true
//   }}/>
//    <GeoJSONLayer
//   data={del}
//   symbolLayout={{
//     // "text-field": "{name}",
//     // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//     // "text-offset": [0, 0.6],
//     // "text-anchor": "top",
//     'icon-image': 'purp-mark',
//     'icon-size': 1
//   }}/> */}
//   </Map>
//   );
// };

// export default withStore(ListingMap)

// // ReactDOM.render(<Map />, document.getElementById('app'));
