import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import {Button} from 'react-bootstrap';
import scrollIntoView from 'scroll-into-view-if-needed'
import distance from '@turf/distance';
import { Link, Route, Switch } from "react-router-dom";
import {point} from '@turf/helpers'
import CircularProgress from '@material-ui/core/CircularProgress';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.workerClass = MapboxWorker;
// mapboxgl.accessToken = 'pk.eyJ1Ijoid2VlZG9tY29tIiwiYSI6ImNrbWN6aG1wbDBmZnEycG1ubmNuNnZkc3kifQ.UNlhKjCFNY7-Kr6CgsLBnQ';
mapboxgl.accessToken = 'pk.eyJ1Ijoid2VlZG9tY29tIiwiYSI6ImNrbWN6aG1wbDBmZnEycG1ubmNuNnZkc3kifQ.UNlhKjCFNY7-Kr6CgsLBnQ';

const Map = (props) => {
  // console.log(props)
  const mapContainer = useRef();
//   window.mc = mapContainer
const [listings, setListings] = useState(props.listings)
    let markers = {}
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(props.bounds);

  const [btnVisible, setBtnVisible] = useState(false);
  const [updating, setUpdating] = useState(props.mapLoading);

  // const handleResearch = () => {
  //     setUpdating(true)
  //     removeMarkers()
  //   props.handleMapUpdate(map)
  //   .then(res=>{
  //       console.log(res)
  //       let mids = Object.keys(markers)
  //       let newlist = res.filteredListings.filter(fl=>mids.indexOf(fl.syncid) === -1)
  //       console.log(`res.filteredListings length : ${res.filteredListings.length}`)
  //       console.log(`newlist.length : ${newlist.length}`)
  //       addMarkers(map, newlist)
  //       setBtnVisible(false)
  //       setUpdating(false)

  //   })
  // }
  // const createGeoJSON = (data) => {
  //   let gj = {
  //     type: "FeatureCollection",
  //   };

  //   let feat = data.map((l) => {
  //     return {
  //       type: "Feature",
  //       properties: {
  //           id:l.syncid,
  //           classname: (l.type == 'delivery') ? 'purple-marker' : 'green-marker',

  //         address: l.address,
  //         type: l.type,
  //         name: l.name,
  //         city: l.city,
  //         state: l.state_code,
  //         zip_code: l.zip_code,

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
  // const removeMarkers = () => {
  //   console.log(markers)
  //   for (const m of Object.values(markers)) {
  //     console.log(m)
  //       m.remove()
  //   }
  //   markers = {}
  // }
  // const addMarkers = (m, listings) => {
  //   let geoj = createGeoJSON(listings)
  //   removeMarkers()
  //   // let disp = {type: "FeatureCollection", features: geoj.features.filter(d=>d.properties.type == 'dispensary')};
  //   // let disp = {type: "FeatureCollection", features: props.geojson.features.filter(d=>d.properties.type == 'dispensary')};
  //   // let del = {type: "FeatureCollection", features: geoj.features.filter(d=>d.properties.type == 'delivery')};
  //   geoj.features.forEach(function(marker) {
  //       var el = document.createElement('div');
  //       /* Assign a unique `id` to the marker. */
  //       el.id = "marker-" + marker.properties.id;
  //       /* Assign the `marker` class to each marker for styling. */
  //       el.className = marker.properties.classname;

  //       /**
  //        * Create a marker using the div element
  //        * defined above and add it to the map.
  //       **/
  //        markers[marker.properties.id] = new mapboxgl.Marker(el, { offset: [0, -23] })
  //         .setLngLat(marker.geometry.coordinates)
  //         .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  //       .setHTML('<h4>' + marker.properties.name + '</h4><h6 style="text-transform:capitalize;">' + marker.properties.type + '</h6>' + `<p>${(marker.properties.address != null && marker.properties.address != 'null') ? marker.properties.address : ''}</p><p>${marker.properties.city}, ${marker.properties.state} ${marker.properties.zip_code}</p>`))
  //         .addTo(m);
  //         // markers[marker.properties.syncid] = marker
  //     })

  // }
  const handleResearch = () => {
    setUpdating(true)
    // removeMarkers()
    console.log(map)
  props.handleMapUpdate(map)
  .then(res=>{
      // console.log(res)
      // let mids = Object.keys(markers)
      // let newlist = res.filteredListings.filter(fl=>mids.indexOf(fl.syncid) === -1)
      // console.log(`res.filteredListings length : ${res.filteredListings.length}`)
      // console.log(`newlist.length : ${newlist.length}`)
      // addMarkers(map, newlist)
      setListings(res.filteredListings)
      setBtnVisible(false)
      setUpdating(false)

  })
}

  useEffect(() => {
    let theCenter;
    const map = new mapboxgl.Map({
      container: mapContainer.current,

      style:'mapbox://styles/weedomcom/ckpk6dr1z4mw218pg0atvwmav',

      bounds: bounds
    });


    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
      setBounds(map.getBounds())
      if(theCenter){
        var from = point([theCenter.lng, theCenter.lat]);
        var to = point([map.getCenter().lng, map.getCenter().lat]);
        var dist = distance(from, to);

        // console.log(dist)
        if(dist > 15){
            setBtnVisible(true)
        }
    }
    });

      map.on('data', function() {
        // console.log('A data event occurred.');
        });
        function flyToStore(currentFeature) {
          map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
          });
        }

        function createPopUp(currentFeature) {
          var popUps = document.getElementsByClassName('mapboxgl-popup');
          /** Check if there is already a popup on the map and if so, remove it */
          if (popUps[0]) popUps[0].remove();

          var popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(currentFeature.properties.popup)
            .addTo(map);
		popup.on('close', function(){
			console.log('popup was closed');
			var activeItem = document.querySelectorAll('.disp-wrap.active');
               if (activeItem[0]) {
                 activeItem[0].classList.remove('active');
               }
			});
        }
        map.on('click', function(e) {
          /* Determine if a feature in the "locations" layer exists at that point. */
          console.log(e)
          var features = map.queryRenderedFeatures(e.point, {
            layers: ['points-sym']
          });

          /* If yes, then: */
          if (features.length) {
            var clickedPoint = features[0];

            /* Fly to the point */
            flyToStore(clickedPoint);

            /* Close all other popups and display popup for clicked store */
            createPopUp(clickedPoint);
            console.log(clickedPoint)

            /* Highlight listing in sidebar (and remove highlight for all other listings) */
            var activeItem = document.querySelectorAll('.disp-wrap.active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            // console.log(`disp-wrap[data-disp-id="${clickedPoint.properties.id}"]`)
            var listing = document.querySelector(`.disp-wrap[data-disp-id="${clickedPoint.properties.id}"]`)
            // getElementById('listing-' + clickedPoint.properties.id);
            listing.classList.add('active');
            scrollIntoView(listing, { behavior: 'smooth', scrollMode: 'if-needed' })
          }
        });
    map.on('load', function (e) {
        /* Add the data to your map as a layer */
        if(updating){
          return
        }
        theCenter = map.getCenter()
        // map.loadImage('https://landing-preview-p2vs7mz6ta-uc.a.run.app/images//greenpin.png', function (error, image) {
          // if (error) console.log(error)
          // map.addImage('green-marker', image, { 'sdf': true });
          // map.loadImage('https://landing-preview-p2vs7mz6ta-uc.a.run.app/images/purppin.png', function (err, img) {
            // if (err) console.log(err)
            // map.addImage('purple-marker', img, { 'sdf': true });

            let geoj = createGeoJSON(listings)
            console.log('geoj')
            console.log(geoj)
            console.log('geoj')
            // map.addLayer({
            //   "id": "dispensaries",
            //   "type": "symbol",
            //   /* Add a GeoJSON source containing place coordinates and information. */
            //   "source": {
            //     "type": "geojson",
            //     "data": geoj
            //   }
            // });
            map.addSource('points', {
              'type': 'geojson',
              'data': geoj
            })
            map.addLayer({
              'id': 'points-sym',
              'type': 'symbol',
              'source': 'points',
              "layout": {
                "icon-image": [
                    "match",
                    ["get", "marker-symbol"],
                    ["green-marker"],
                    "green-marker",
                    ["purple-marker"],
                    "purple-marker",
                    ""
                ],
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
                "icon-size": 0.35
            }})

            // addMarkers(map, props.listings)
            setBounds(props.bounds)
            map.fitBounds(bounds)
        // console.log(theCenter)
        setMap(map)
        window.map = map
          // })
        // })
        // console.log(props.bounds)


        // var myLayer = L.mapbox.featureLayer().addTo(mapOne);

        //   del.features.forEach(function(marker) {
        //     var el = document.createElement('div');
        //     /* Assign a unique `id` to the marker. */
        //     el.id = "marker-" + marker.properties.id;
        //     /* Assign the `marker` class to each marker for styling. */
        //     el.className = 'purple-marker';

        //     /**
        //      * Create a marker using the div element
        //      * defined above and add it to the map.
        //     **/
        //     new mapboxgl.Marker(el, { offset: [0, -23] })
        //       .setLngLat(marker.geometry.coordinates)
        //       .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        //     .setHTML('<h4>' + marker.properties.name + '</h4><h6 style="text-transform:capitalize;">' + marker.properties.type + '</h6>' + `<p>${(marker.properties.address != null && marker.properties.address != 'null') ? marker.properties.address : ''}</p><p>${marker.properties.city}, ${marker.properties.state} ${marker.properties.zip_code}</p>`))
        //       .addTo(map);
        //   })

      });


    const createGeoJSON = (data) => {
      let gj = {
        type: "FeatureCollection",
      };

      let feat = data.map((l) => {
        return {
          type: "Feature",
          properties: {
              id:l.syncid,
              "marker-symbol": (l.type == 'delivery') ? 'purple-marker' : 'green-marker',

            address: l.address,
            type: l.type,
            name: l.name,
            city: l.city,
            state: l.state_code,
            zip_code: l.zip_code,
            phone: l.phone_number,
            url: `${process.env.PUBLIC_URL}/dispensaries/${l.state_code}/${l.city}/${l.slug}`,
            popup: `<ul class="list-unstyled"><li><h5>${l.name}</h5></li><li><h6 style="text-transform:capitalize;">${l.type}</h6></li><li>${(l.address != null && l.address != 'null') ?l.address : ''}</li><li>${l.city}, ${l.state} ${l.zip_code}<li><li>${l.phone}</li><li><a href="${l.url}">View Profile</a></li></ul>`

          },
          geometry: {
            type: "Point",
            coordinates: [l.geo.lon, l.geo.lat],
          },
        };
      });

      gj.features = feat;

      return gj;
    };
    const removeMarkers = () => {
      console.log(markers)
      for (const m of Object.values(markers)) {
        // console.log(m)
          m.remove()
      }
      markers = {}
    }
    const addMarkers = (m, listings) => {
      console.log('addMarkers')

      let geoj = createGeoJSON(listings)
      // removeMarkers()
      // let disp = {type: "FeatureCollection", features: geoj.features.filter(d=>d.properties.type == 'dispensary')};
      // let disp = {type: "FeatureCollection", features: props.geojson.features.filter(d=>d.properties.type == 'dispensary')};
      // let del = {type: "FeatureCollection", features: geoj.features.filter(d=>d.properties.type == 'delivery')};
      geoj.features.forEach(function(marker) {
          var el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = "marker-" + marker.properties.id;
          /* Assign the `marker` class to each marker for styling. */
          el.className = marker.properties.classname;

          /**
           * Create a marker using the div element
           * defined above and add it to the map.
          **/
           markers[marker.properties.id] = new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<ul class="list-unstyled"><li><h5>${marker.properties.name}</h5></li><li><h6 style="text-transform:capitalize;">${marker.properties.type}</h6></li><li>${(marker.properties.address != null && marker.properties.address != 'null') ?marker.properties.address : ''}</li><li>${marker.properties.city}, ${marker.properties.state} ${marker.properties.zip_code}<li><li>${marker.properties.phone}</li><li><a href="${marker.properties.url}">View Profile</a></li></ul>`))
          // .setHTML('<h4>' + marker.properties.name + '</h4><h6 style="text-transform:capitalize;">' + marker.properties.type + '</h6>' + `<p>${(marker.properties.address != null && marker.properties.address != 'null') ? marker.properties.address : ''}</p><p>${marker.properties.city}, ${marker.properties.state} ${marker.properties.zip_code}</p><p>${marker.properties.phone}</a>`))
            .addTo(m);
            // markers[marker.properties.syncid] = marker
        })

    }
      map.on('error', function() {
        // console.log('A error event occurred.');
        });
        map.on('sourcedata', function() {
          // console.log('A sourcedata event occurred.');
          });
          map.on('remove', function() {
            // console.log('A remove event occurred.');
            });
            // console.log('check for differences')
            // console.log(`markers length: ${Object.keys(markers).length}`)
            // console.log(`listings length ${listings.length}`)
            // console.log(`props.listings length ${props.listings.length}`)
            if(listings != props.listings && !updating){
              // console.log('removing markers')
              setListings(props.listings)

              // removeMarkers()
              // setUpdating(false)
              // addMarkers(map, props.listings)
            }

    return () => map.remove();
  }, [props.listings, listings, updating]);
  // useEffect(() => {
  //   console.log('check for differences')
  //   console.log(`markers length: ${Object.keys(markers).length}`)
  //   console.log(`listings length ${listings.length}`)
  //   console.log(`props.listings length ${props.listings.length}`)
  //   if(listings != props.listings){
  //     console.log('removing markers')
  //     setListings(props.listings)

  //     // removeMarkers()
  //     addMarkers(map, props.listings)
  //   }
  //   // console.log()
  // }, [props.listings]);;
  return (
    <>
    {btnVisible &&
        <Button className="search-again-btn" variant="light" onClick={(e)=> handleResearch()}>{updating ? <CircularProgress /> : `Search This Area`}</Button>
      }
      <div id="map" className="map-container" ref={mapContainer}>

          </div>
    </>
  );
};

// ReactDOM.render(<Map />, document.getElementById('app'));
export default Map
