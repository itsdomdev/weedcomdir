import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PropTypes from 'prop-types';
import {Spinner} from "react-bootstrap-v5";
import cn from 'classnames';
import history from '../history';
import GoogleAuto from './GoogleAuto';
import Image from 'react-bootstrap/Image'
import SearchAppBar from './SearchAppBar';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import  { withStore } from '../util/datastore'
import {Link} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import WeedLogo from './WeedLogo';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import StoreIcon from '@material-ui/icons/Store';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


class Header extends React.Component {

	constructor(props){
		super(props)
		console.log(props)
		console.log(props.store.searchData)
		let location = (props.store.searchData && props.store.searchData.formatted) ? props.store.searchData.formatted :
		(props.level && props.level == "city") ? `${props.city.replace(/\-/g, ' ')}, California USA` :
		(props.level && props.level == "state") ? 'California, USA' :
		'';
		// if(props.store.searchData){
		// 	loca
		// }
		// window.location.pathname
		this.state ={
			landing_page: props.landing_page,
			// path: window.location.pathname.split('/')[1],
			path: window.location.pathname.indexOf('delivery') > -1 ? 'delivery' : 'dispensaries',
			existingLocation: location,
			keywordSearch: (props.store.searchData) ? props.store.searchData.keyword : '',
			isOpen: false

		}
	}
	handleKeywordChange = (e) =>{
		console.log(e.currentTarget.value)
		this.setState({
			 keywordSearch: e.currentTarget.value
		})
   }
	toggleDrawer = (val) =>{
		// console.log(e.currentTarget.value)
		this.setState({
			isOpen: val
		})
   }
	didSetLocation = (loc) =>{
		if(loc){
		console.log(loc)
		geocodeByPlaceId((loc.value)? loc.value.place_id : loc.place_id)
		.then(res=>{
			console.log(res)
			res = res[0]
			let link = '';
			const geo = {
				lat: res.geometry.location.lat(),
				lng: res.geometry.location.lng()

		   }
			// console.log(res)
			let city = res.address_components.filter(d => {
				return (d.types.indexOf('locality') > -1)
		   })
		   let state = res.address_components.filter(d => {
			return (d.types.indexOf("administrative_area_level_1") > -1)})[0].short_name.toLowerCase();

		   	if (city.length < 1) {
				link = `${process.env.PUBLIC_URL}/${this.state.path}/${state}`
				console.log(link)
	   		} else {
				city = city[0].long_name.toLowerCase().replace(/\s/g, '-');
				link = `${process.env.PUBLIC_URL}/${this.state.path}/${state}/${city}`
				console.log(link);

	   		}
			   this.props.store.clearMapData()
			   this.props.store.updateSearchData({
				city: city,
				state: state,
				keyword: this.state.keywordSearch,
				formatted: loc.label
		   })
		   		this.setState({existingLocation: loc.label})
			   var paramsString = `lat=${geo.lat}&lng=${geo.lng}`;
               var queryParams = new URLSearchParams(paramsString);
			   console.log(history)
               history.push( link + "?" + queryParams.toString())
			   history.go()
		})

		// if(loc.value.)
		// let link = `dispensaries/${loc.t}
	}
	else {
		console.log('cleared search')
	}
	}



  render(){
	  const {landing_page, isOpen, path, existingLocation, keywordSearch} = this.state;
	  if(landing_page){
		return (
		<header id="site-header-landing" className="bg-transparent top">
<div className="container-xxxl">
    <div className="row align-items-center justify-space-between" style={{margin:0, maxWidth:"100%"}}>
	 <div className="col col-md-4">
	   <div className="logo-wrap">
	   <Link to="/"><Image src="https://storage.googleapis.com/weedcomimgs/disp_images/appimgs/white_wordmark.png" fluid /></Link>

	   </div>
	 </div>
	 <div className="col-1 hide-top"></div>
	 <div className="col-6 hide-top">
	   <div id="main-search" className="input-group mb-3">
	     <div className="inputs-wrap">
		  <span className="input-group-text d-none"
		    ><svg
			 xmlns="http://www.w3.org/2000/svg"
			 width="16"
			 height="16"
			 fill="currentColor"
			 className="bi bi-search"
			 viewBox="0 0 16 16"
		    >
			 <path
			   d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
			 /></svg
		  ></span>
		  <input
		    type="text"
		    placeholder="Name Or Keyword"
		    className="form-control m-0 d-none"
		  />
		  <span className="input-group-text locpin d-none"
		    ><svg
			 xmlns="http://www.w3.org/2000/svg"
			 width="16"
			 height="16"
			 fill="currentColor"
			 className="bi bi-geo-fill"
			 viewBox="0 0 16 16"
		    >
			 <path
			   fill-rule="evenodd"
			   d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
			 /></svg> </span>

		<GoogleAuto didSetLocation={this.didSetLocation} existingLocation={existingLocation}/>
	     </div>
	     <button className="btn btn-success" type="button" id="button-addon2">
		  Search
	     </button>
	   </div>
	   <div className="text-center">
	     {/* <!-- <h5>Or</h5> --> */}
		 {path == 'delivery' &&
	     <button type="button" className="btn btn-custom d-none">
		  Enter Your Address To View Personalized Delivery Options
	     </button>
	  }
	   </div>
	 </div>
	 </div>
	 </div>

		</header>
		);
		}
	  else {
	return (
    <div id="header-wrap">
    <header id="site-header" className="black">
  	<div className="container-xxxl">
    <div className="row align-items-center justify-space-between">
	 <div className="col col-md-2 flex-fill">
	   <div className="logo-wrap justify-content-center mb-lg-0">
	   	<Link to="/"><svg xmlns="http://www.w3.org/2000/svg" className="fill-purple" viewBox="0 0 1602.68 237.09"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="_5IvDGl.tif" data-name="5IvDGl.tif"><path d="M1602.68,183.05c-19.49.15-39,.11-58.48.56-6.78.16-6.8-3.57-6.78-8.44q.15-40.48,0-81c0-2,1.22-5.37-1.07-5.83-2.72-.55-2.51,2.9-3.14,4.9-8.53,27.49-17.29,54.92-25.46,82.52-1.79,6-4.57,8.06-10.69,7.87-12.46-.39-25-.36-37.41,0-6,.16-8.93-1.54-10.74-7.72-7.85-26.73-16.36-53.27-24.65-79.86-.72-2.32-1.21-6.6-3-6.21-3.28.72-1.68,4.67-1.69,7.19-.13,25.4-.34,50.82.08,76.22.12,7.6-1.61,10.77-10,10.45-16.29-.61-32.61-.36-48.92-.09-5.75.1-7.71-1.71-7.69-7.59q.29-82.43,0-164.84c0-5.1,1.08-7.3,6.83-7.25,27.18.27,54.36.4,81.53-.07,6.84-.12,7.72,3.75,9.13,8.39Q1463,53.13,1475.47,94c.63,2.08.41,5.07,3.1,5.14.88,0,2.13-3.4,2.74-5.39,8.35-27.22,16.92-54.38,24.71-81.75,1.9-6.67,4.91-8.11,11.3-8,28.45.25,56.9,0,85.36-.1Z"/><path d="M1243.71,0c4.57,3.42,10.28,2.6,15.4,3.83,42.82,10.27,72.69,47.26,72.43,90.23-.27,44.09-30.76,81.79-74.35,90.46-34.66,6.9-67.63,2.82-95.41-21-29-24.82-37.38-57.2-28.65-93,8.61-35.38,33.19-56.61,68.16-66.52,5.78-1.64,12.1-.71,17.46-4Zm15.59,94.86c.16-18.43-11.4-31.79-27.83-32.14-16.66-.36-30,13.61-30,31.41,0,17.11,13.41,31.57,29.27,31.53C1246.28,125.62,1259.14,111.77,1259.3,94.86Z"/><path d="M1063.26,0c13.38,3.78,27.21,5.81,39.69,12.79,22.16,12.4,22.45,12.45,9.58,33.11-4.87,7.82-10,15.46-14.68,23.41-3,5.14-5.18,7.39-11.27,2.78a44.25,44.25,0,0,0-29.47-9.41c-18.87,1-30.57,15.65-28.69,36.29,1.5,16.44,17.94,29,34.85,26.38a56.5,56.5,0,0,0,25.34-10.51c3.3-2.44,5.21-2.36,7.49,1.32,8.18,13.24,16.46,26.43,25.09,39.39,3.67,5.53-.77,7.63-3.68,9.95-19.76,15.79-42.63,22.38-67.76,21.76-7.66-.19-15.32-.64-22.77-2.68-6.63-1.82-12.68-3.23-15.38-11.61-3.17-9.87-14.05-11.09-22.4-14.6-10.63-4.48-10.58-4.05-2.94-12.51,8.1-9,15.94-18.19,23.7-27.46,6.33-7.55,7.76-15.91,2.6-24.64-4.77-8.06-13.33-11-24.17-8.55-8.69,2-17.41,3.86-26,6.29-4.7,1.34-6.64,1.45-6.16-4.54C959.72,43.17,992,8.53,1035.8,1.87A45.42,45.42,0,0,0,1042.14,0Z"/><path d="M74.69,183.52c-10.23,0-20.46-.11-30.69,0-4.56.06-6.65-1.52-7.67-6.3q-17.7-83-35.91-166C-.71,6.08.19,3.84,6.22,3.94c18.54.31,37.09.23,55.64,0,4.68,0,6.42,1.16,7.07,6.22C72.46,37.52,76.54,64.76,80.45,92a22.45,22.45,0,0,0,.77,3.73c.45,1.36.47,3.18,2.35,3.42a15.13,15.13,0,0,0,1-3.42c5.08-25.44,10.26-50.87,15.17-76.34,3-15.33,2.76-15.37,18.72-15.37,11.84,0,23.68.35,35.49-.14,6.24-.26,8,2.09,9,7.9,4.81,26.76,10.2,53.43,15.41,80.13a23.45,23.45,0,0,0,1.13,3.63c.5,1.35.12,3.15,1.95,3.83a32.83,32.83,0,0,0,1.31-4.49C185.23,78.63,187.6,62.33,190,46c1.77-11.9,3.95-23.76,5.21-35.72.59-5.59,3.06-6.43,7.94-6.36q27.35.35,54.68,0c5.38-.06,7.19.89,5.85,7q-18.18,82.47-35.61,165.11c-1.26,6-3.93,7.64-9.7,7.56-19.5-.27-39-.39-58.51.06-6.59.16-8.85-2.53-10-8.31-5-24.48-10.26-48.9-15.44-73.34-.43-2,.42-5.4-2.45-5.42s-1.78,3.44-2.19,5.31c-5.12,23.49-10.43,47-14.92,70.57-1.55,8.14-4.15,12.16-13.32,11.23C92.67,182.82,83.64,183.53,74.69,183.52Z"/><path d="M637.16,94.39c0-27.32.21-54.65-.15-82-.09-6.65,1.87-8.28,8.51-8.67C672,2.17,698.6,1,725.1,2.32c29.64,1.45,56.45,10.24,75.36,35.13,7.54,9.93,12.27,20.62,11.19,33.44a76.64,76.64,0,0,0,.51,14.27c1.38,13.25,1.49,13.2-11.82,9.32a99.21,99.21,0,0,0-12.94-3.26c-9-1.34-16.3,1.57-21.08,9.71-4.59,7.81-3.49,15.35,1.49,22.3,6.11,8.54,12.4,17,19.2,25,4.27,5,6.5,8.2-2.28,10.09-5.25,1.13-9.64,4.67-11.15,9.65-2.07,6.81-7,9.09-12.89,11.1-20.61,7-41.93,7.91-63.4,7.35-16.62-.43-33.23-1.54-49.84-1.62-8.39,0-10.67-3-10.5-11.25C637.51,147.15,637.16,120.77,637.16,94.39Zm108.61-.52c-.08-24.55-12.33-37.31-34.88-36.82-5.08.11-7.56,1.21-7.49,6.85.23,20,.2,40,0,60,0,5,1.78,6.44,6.69,6.64C733.38,131.52,745.85,118.86,745.77,93.87Z"/><path d="M462.86,93.4c0-27,.22-54-.15-81-.09-6.7,1.89-8.54,8.59-8.5q61.4.45,122.79,0c6.95-.06,8.63,2.15,8.36,8.63-.5,11.74-.47,23.52,0,35.25.24,6-1.84,7.52-7.62,7.41-18.54-.33-37.09-.14-55.64-.1-4.87,0-10.19-1.64-10,7s5.82,6.63,10.48,6.67c16.31.13,32.62.28,48.92-.07,6-.12,8.55,1.29,8.28,7.82-.5,11.73-.41,23.51,0,35.25.18,5.81-1.77,7.76-7.62,7.66-17.27-.29-34.54,0-51.81-.16-5.22-.05-8.23.7-8.17,7.13s3.43,7,8.47,7c19.82-.12,39.67.43,59.47-.26,8.81-.3,11,2.68,10.47,10.82-.66,10.76-.36,21.6-.09,32.39.13,5.33-1.84,7.26-7.23,7.24q-65.24-.2-130.47,0c-6.49,0-7.1-3.11-7.07-8.26C463,148,462.86,120.71,462.86,93.4Z"/><path d="M289.7,93.72c0-27,.16-54-.12-81-.06-6.17.95-8.93,8.17-8.87,40.92.35,81.84.28,122.76.05,5.91,0,7.76,1.76,7.58,7.55q-.55,18.08,0,36.19c.18,5.84-1.71,7.64-7.63,7.52-17.89-.36-35.8-.22-53.7-.07-4.85.05-11.18-2.49-10.93,7s6.82,6.49,11.45,6.57c16,.28,32,.44,47.95,0,6.89-.21,8.77,2.08,8.46,8.64-.5,10.77-.55,21.61,0,32.38.38,7.35-1.74,10.07-9.54,9.81-16.61-.56-33.25-.08-49.87-.21-5,0-8.53.2-8.44,6.86.08,6.23,2.86,7.33,8.24,7.28,20.45-.19,40.92.14,61.37-.19,6.24-.11,8.35,1.75,8.11,8-.46,11.73-.38,23.5,0,35.24.16,5.48-1.85,7.11-7.17,7.09q-64.74-.21-129.47,0c-6.25,0-7.34-2.56-7.3-8C289.81,148.34,289.7,121,289.7,93.72Z"/><path d="M928.66,52.74c-.31,28.18-4.1,55.59-17.86,80.84-.82,1.51-2.93,3.2-.94,4.77.52.41,3.19-1.53,4.64-2.68,21.37-17,47-23.28,73-28.81,1.3-.27,3-1.83,4,0,.31.57-1,2.17-1.76,3.12-15.89,19.11-31.6,38.41-54.43,50.09-1.63.84-4.44,2.67-4.26,3.17.87,2.43,3.65,2.16,5.71,2.27,17.56.94,33.28,8.17,49.4,14a21.28,21.28,0,0,1,3.94,2.51,28.19,28.19,0,0,1-4.06,1.9c-20,5.7-40,11.12-61.16,8.61-1.79-.21-4.67-.29-5.29.67-1.31,2.07,1.57,2.92,2.71,4.22a204,204,0,0,1,19.32,26c.77,1.21,2.66,2.54,1.4,3.91-.56.61-2.87-.16-4.29-.6-20.12-6.16-38.88-14.62-52-31.93-4.83-6.38-6.38-4.39-8.37,1.92-3.79,12.06-8.62,23.8-12.24,35.9-1.69,5.64-4.37,4.67-8.41,3.5-4.35-1.26-5.21-3.21-3.66-7.44,4.47-12.19,8.44-24.56,12.82-36.78,2-5.63,1.75-8.73-5.46-6.5-21.35,6.59-41.6,1.5-61.6-5.88-1.34-.49-3.64-.09-3.74-2.11s2.23-1.77,3.58-2.28a169.61,169.61,0,0,1,32.11-9.08c1.37-.23,3.57.72,3.86-1.42.25-1.81-1.76-2.28-3.11-3.07-18.46-10.73-30.63-27.54-43-44.1-.87-1.15-2.06-3.41-1.62-3.94,1.11-1.33,2.85-.13,4.37.29,16.89,4.76,33.72,9.63,48.7,19.2,1.39.88,2.83,3.32,4.75,1.38,1.31-1.33-.36-2.93-1-4.25-11.82-23.5-11.45-49.09-13-74.35-.07-1.13-.82-2.8.71-3.16.75-.17,2.08,1.09,2.82,2,16.79,20,33.36,40.2,39.94,66.32a49.2,49.2,0,0,0,2.85,6.88c.84-2.26,2.09-4.47,2.45-6.8,5.11-33,24.19-58.83,44.11-84.18.74-.94,1.93-2.44,2.68-2.32,2.18.36,1.33,2.48,1.36,3.88C928.73,43.21,928.66,48,928.66,52.74Z"/></g></g></g></svg></Link>	
	   </div>
	 </div>
	 <div className="col-2"></div>
	 <div className="col col-md-4 flex-fill  d-none d-md-block">
	   <div id="main-search" className="input-group header">
	     <div className="inputs-wrap header align-items-center">
		  <span className="input-group-text d-none"
		    ><svg
			 xmlns="http://www.w3.org/2000/svg"
			 width="16"
			 height="16"
			 fill="currentColor"
			 className="bi bi-search"
			 viewBox="0 0 16 16"
		    >
			 <path
			   d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
			 /></svg>
		  	</span>
		  <input type="text" onInput={this.handleKeywordChange} value={keywordSearch} placeholder="Search..." className="form-control m-0 d-none" />

		  <LocationOnIcon/>
		<GoogleAuto didSetLocation={this.didSetLocation}  existingLocation={existingLocation}/>
		<button className="btn btn-success d-lg-none d-none" type="button" id="button-addon2">
		  Search
	     </button>
	     </div>
	     <button className="btn btn-success d-none d-none" type="button" id="button-addon2">
		  Search
	     </button>
	   </div>
	   <div className="text-center">
	     {/* <!-- <h5>Or</h5> --> */}
	     {path == 'delivery' &&
	     <button type="button" className="btn btn-custom d-none">
		  Enter Your Address To View Personalized Delivery Options
	     </button>
	  }
	   </div>
	 </div>

    </div>
  </div>
</header>

<section id="top-tabs">
	<div className="container-fluid p-0 d-md-none">
	  <SearchAppBar toggleDrawer={this.toggleDrawer} didSetLocation={this.didSetLocation}/>
	  <Drawer PaperProps={{style:{backgroundColor:"#3c4242", color:"#ffffff"}}} anchor="left" open={isOpen} onClose={()=>this.toggleDrawer(false)}>
            <div>
				<div className="drawer-logo-wrap">
					<svg xmlns="http://www.w3.org/2000/svg" className="fill-purple" viewBox="0 0 1602.68 237.09"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="_5IvDGl.tif" data-name="5IvDGl.tif"><path d="M1602.68,183.05c-19.49.15-39,.11-58.48.56-6.78.16-6.8-3.57-6.78-8.44q.15-40.48,0-81c0-2,1.22-5.37-1.07-5.83-2.72-.55-2.51,2.9-3.14,4.9-8.53,27.49-17.29,54.92-25.46,82.52-1.79,6-4.57,8.06-10.69,7.87-12.46-.39-25-.36-37.41,0-6,.16-8.93-1.54-10.74-7.72-7.85-26.73-16.36-53.27-24.65-79.86-.72-2.32-1.21-6.6-3-6.21-3.28.72-1.68,4.67-1.69,7.19-.13,25.4-.34,50.82.08,76.22.12,7.6-1.61,10.77-10,10.45-16.29-.61-32.61-.36-48.92-.09-5.75.1-7.71-1.71-7.69-7.59q.29-82.43,0-164.84c0-5.1,1.08-7.3,6.83-7.25,27.18.27,54.36.4,81.53-.07,6.84-.12,7.72,3.75,9.13,8.39Q1463,53.13,1475.47,94c.63,2.08.41,5.07,3.1,5.14.88,0,2.13-3.4,2.74-5.39,8.35-27.22,16.92-54.38,24.71-81.75,1.9-6.67,4.91-8.11,11.3-8,28.45.25,56.9,0,85.36-.1Z"/><path d="M1243.71,0c4.57,3.42,10.28,2.6,15.4,3.83,42.82,10.27,72.69,47.26,72.43,90.23-.27,44.09-30.76,81.79-74.35,90.46-34.66,6.9-67.63,2.82-95.41-21-29-24.82-37.38-57.2-28.65-93,8.61-35.38,33.19-56.61,68.16-66.52,5.78-1.64,12.1-.71,17.46-4Zm15.59,94.86c.16-18.43-11.4-31.79-27.83-32.14-16.66-.36-30,13.61-30,31.41,0,17.11,13.41,31.57,29.27,31.53C1246.28,125.62,1259.14,111.77,1259.3,94.86Z"/><path d="M1063.26,0c13.38,3.78,27.21,5.81,39.69,12.79,22.16,12.4,22.45,12.45,9.58,33.11-4.87,7.82-10,15.46-14.68,23.41-3,5.14-5.18,7.39-11.27,2.78a44.25,44.25,0,0,0-29.47-9.41c-18.87,1-30.57,15.65-28.69,36.29,1.5,16.44,17.94,29,34.85,26.38a56.5,56.5,0,0,0,25.34-10.51c3.3-2.44,5.21-2.36,7.49,1.32,8.18,13.24,16.46,26.43,25.09,39.39,3.67,5.53-.77,7.63-3.68,9.95-19.76,15.79-42.63,22.38-67.76,21.76-7.66-.19-15.32-.64-22.77-2.68-6.63-1.82-12.68-3.23-15.38-11.61-3.17-9.87-14.05-11.09-22.4-14.6-10.63-4.48-10.58-4.05-2.94-12.51,8.1-9,15.94-18.19,23.7-27.46,6.33-7.55,7.76-15.91,2.6-24.64-4.77-8.06-13.33-11-24.17-8.55-8.69,2-17.41,3.86-26,6.29-4.7,1.34-6.64,1.45-6.16-4.54C959.72,43.17,992,8.53,1035.8,1.87A45.42,45.42,0,0,0,1042.14,0Z"/><path d="M74.69,183.52c-10.23,0-20.46-.11-30.69,0-4.56.06-6.65-1.52-7.67-6.3q-17.7-83-35.91-166C-.71,6.08.19,3.84,6.22,3.94c18.54.31,37.09.23,55.64,0,4.68,0,6.42,1.16,7.07,6.22C72.46,37.52,76.54,64.76,80.45,92a22.45,22.45,0,0,0,.77,3.73c.45,1.36.47,3.18,2.35,3.42a15.13,15.13,0,0,0,1-3.42c5.08-25.44,10.26-50.87,15.17-76.34,3-15.33,2.76-15.37,18.72-15.37,11.84,0,23.68.35,35.49-.14,6.24-.26,8,2.09,9,7.9,4.81,26.76,10.2,53.43,15.41,80.13a23.45,23.45,0,0,0,1.13,3.63c.5,1.35.12,3.15,1.95,3.83a32.83,32.83,0,0,0,1.31-4.49C185.23,78.63,187.6,62.33,190,46c1.77-11.9,3.95-23.76,5.21-35.72.59-5.59,3.06-6.43,7.94-6.36q27.35.35,54.68,0c5.38-.06,7.19.89,5.85,7q-18.18,82.47-35.61,165.11c-1.26,6-3.93,7.64-9.7,7.56-19.5-.27-39-.39-58.51.06-6.59.16-8.85-2.53-10-8.31-5-24.48-10.26-48.9-15.44-73.34-.43-2,.42-5.4-2.45-5.42s-1.78,3.44-2.19,5.31c-5.12,23.49-10.43,47-14.92,70.57-1.55,8.14-4.15,12.16-13.32,11.23C92.67,182.82,83.64,183.53,74.69,183.52Z"/><path d="M637.16,94.39c0-27.32.21-54.65-.15-82-.09-6.65,1.87-8.28,8.51-8.67C672,2.17,698.6,1,725.1,2.32c29.64,1.45,56.45,10.24,75.36,35.13,7.54,9.93,12.27,20.62,11.19,33.44a76.64,76.64,0,0,0,.51,14.27c1.38,13.25,1.49,13.2-11.82,9.32a99.21,99.21,0,0,0-12.94-3.26c-9-1.34-16.3,1.57-21.08,9.71-4.59,7.81-3.49,15.35,1.49,22.3,6.11,8.54,12.4,17,19.2,25,4.27,5,6.5,8.2-2.28,10.09-5.25,1.13-9.64,4.67-11.15,9.65-2.07,6.81-7,9.09-12.89,11.1-20.61,7-41.93,7.91-63.4,7.35-16.62-.43-33.23-1.54-49.84-1.62-8.39,0-10.67-3-10.5-11.25C637.51,147.15,637.16,120.77,637.16,94.39Zm108.61-.52c-.08-24.55-12.33-37.31-34.88-36.82-5.08.11-7.56,1.21-7.49,6.85.23,20,.2,40,0,60,0,5,1.78,6.44,6.69,6.64C733.38,131.52,745.85,118.86,745.77,93.87Z"/><path d="M462.86,93.4c0-27,.22-54-.15-81-.09-6.7,1.89-8.54,8.59-8.5q61.4.45,122.79,0c6.95-.06,8.63,2.15,8.36,8.63-.5,11.74-.47,23.52,0,35.25.24,6-1.84,7.52-7.62,7.41-18.54-.33-37.09-.14-55.64-.1-4.87,0-10.19-1.64-10,7s5.82,6.63,10.48,6.67c16.31.13,32.62.28,48.92-.07,6-.12,8.55,1.29,8.28,7.82-.5,11.73-.41,23.51,0,35.25.18,5.81-1.77,7.76-7.62,7.66-17.27-.29-34.54,0-51.81-.16-5.22-.05-8.23.7-8.17,7.13s3.43,7,8.47,7c19.82-.12,39.67.43,59.47-.26,8.81-.3,11,2.68,10.47,10.82-.66,10.76-.36,21.6-.09,32.39.13,5.33-1.84,7.26-7.23,7.24q-65.24-.2-130.47,0c-6.49,0-7.1-3.11-7.07-8.26C463,148,462.86,120.71,462.86,93.4Z"/><path d="M289.7,93.72c0-27,.16-54-.12-81-.06-6.17.95-8.93,8.17-8.87,40.92.35,81.84.28,122.76.05,5.91,0,7.76,1.76,7.58,7.55q-.55,18.08,0,36.19c.18,5.84-1.71,7.64-7.63,7.52-17.89-.36-35.8-.22-53.7-.07-4.85.05-11.18-2.49-10.93,7s6.82,6.49,11.45,6.57c16,.28,32,.44,47.95,0,6.89-.21,8.77,2.08,8.46,8.64-.5,10.77-.55,21.61,0,32.38.38,7.35-1.74,10.07-9.54,9.81-16.61-.56-33.25-.08-49.87-.21-5,0-8.53.2-8.44,6.86.08,6.23,2.86,7.33,8.24,7.28,20.45-.19,40.92.14,61.37-.19,6.24-.11,8.35,1.75,8.11,8-.46,11.73-.38,23.5,0,35.24.16,5.48-1.85,7.11-7.17,7.09q-64.74-.21-129.47,0c-6.25,0-7.34-2.56-7.3-8C289.81,148.34,289.7,121,289.7,93.72Z"/><path d="M928.66,52.74c-.31,28.18-4.1,55.59-17.86,80.84-.82,1.51-2.93,3.2-.94,4.77.52.41,3.19-1.53,4.64-2.68,21.37-17,47-23.28,73-28.81,1.3-.27,3-1.83,4,0,.31.57-1,2.17-1.76,3.12-15.89,19.11-31.6,38.41-54.43,50.09-1.63.84-4.44,2.67-4.26,3.17.87,2.43,3.65,2.16,5.71,2.27,17.56.94,33.28,8.17,49.4,14a21.28,21.28,0,0,1,3.94,2.51,28.19,28.19,0,0,1-4.06,1.9c-20,5.7-40,11.12-61.16,8.61-1.79-.21-4.67-.29-5.29.67-1.31,2.07,1.57,2.92,2.71,4.22a204,204,0,0,1,19.32,26c.77,1.21,2.66,2.54,1.4,3.91-.56.61-2.87-.16-4.29-.6-20.12-6.16-38.88-14.62-52-31.93-4.83-6.38-6.38-4.39-8.37,1.92-3.79,12.06-8.62,23.8-12.24,35.9-1.69,5.64-4.37,4.67-8.41,3.5-4.35-1.26-5.21-3.21-3.66-7.44,4.47-12.19,8.44-24.56,12.82-36.78,2-5.63,1.75-8.73-5.46-6.5-21.35,6.59-41.6,1.5-61.6-5.88-1.34-.49-3.64-.09-3.74-2.11s2.23-1.77,3.58-2.28a169.61,169.61,0,0,1,32.11-9.08c1.37-.23,3.57.72,3.86-1.42.25-1.81-1.76-2.28-3.11-3.07-18.46-10.73-30.63-27.54-43-44.1-.87-1.15-2.06-3.41-1.62-3.94,1.11-1.33,2.85-.13,4.37.29,16.89,4.76,33.72,9.63,48.7,19.2,1.39.88,2.83,3.32,4.75,1.38,1.31-1.33-.36-2.93-1-4.25-11.82-23.5-11.45-49.09-13-74.35-.07-1.13-.82-2.8.71-3.16.75-.17,2.08,1.09,2.82,2,16.79,20,33.36,40.2,39.94,66.32a49.2,49.2,0,0,0,2.85,6.88c.84-2.26,2.09-4.47,2.45-6.8,5.11-33,24.19-58.83,44.11-84.18.74-.94,1.93-2.44,2.68-2.32,2.18.36,1.33,2.48,1.36,3.88C928.73,43.21,928.66,48,928.66,52.74Z"/></g></g></g></svg>
				</div>
		 <Divider />
          <List>
      {['Dispensaries', 'Delivery', 'CBD Shop'].map((text, index) => (
		  <Link className="unstyled-link" to={`/${text.toLowerCase()}`}>
        <ListItem button key={text}>
          <ListItemIcon>{index === 0 ? <StoreIcon/> :
		  				index === 1 ? <LocalShippingIcon /> : <ShoppingCartIcon/>}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
		</Link>
      ))}
    </List>
    <Divider />
    </div>
          </Drawer>
	</div>
  <div className="container-max">
    <div>
	 <div className="col">
	   <ul className="nav-tabs d-none d-md-flex">
	   	<li id="nav-tab1" className={path == "dispensaries" ? "tab active" : "tab"}><Link to={`${window.location.pathname.replace('delivery','dispensaries').replace('/all', '')}${window.location.search}`} className="unstyled-link stretched-link"><span>Dispensaries</span></Link></li>
	     <li id="nav-tab1" className={path == "delivery" ? "tab active" : "tab"}><Link to={`${window.location.pathname.replace('dispensaries','delivery').replace('/all', '')}${window.location.search}`} className="unstyled-link stretched-link"><span>Delivery</span></Link></li>
	     {/* <li id="nav-tab2" className="tab">
		  <span>Dispensaries</span>
	     </li> */}
	     {/* <li id="nav-tab3" className="tab">
		  <span>Doctors</span>
	     </li> */}
	   </ul>
	 </div>
    </div>
  </div>
</section>

    </div>)
	}
	}
  }



export default withStore(Header);
