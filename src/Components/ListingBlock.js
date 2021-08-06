import Container from "react-bootstrap/Container";
import React from "react";
import { useForkRef, Divider } from "@material-ui/core";
import Row from "react-bootstrap/Row";
import Rating from '@material-ui/lab/Rating';
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { green } from '@material-ui/core/colors';
import purple from '@material-ui/core/colors/purple';
import {  PinDrop } from '@material-ui/icons';
// import {Chip} from 'react-bootstrap';
import {Chip,IconButton, Tooltip, Button} from '@material-ui/core';
// import ReactDOM from 'react-dom';
// import Rating from '@material-ui/lab/Rating';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import Typography from '@material-ui/core/Typography';
import { isMobile } from "react-device-detect";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
const theme = createMuiTheme({
    palette: {

      primary: {
           main: "#4caf50",
           contrastText: "#fff"
      },
      secondary: {
         // Purple and green play nicely together.
         main: "#8561c5",
       }
    //   secondary: accent
    },
  });

const ListingBlock = (props) => {
	let l = props.data, ex = props.ex
	let rating_val = Math.round(l.rating * 10) / 10;
	if(isMobile){
	return (

		<div className='disp-wrap' data-disp-id={l.syncid}>
		<div className="disp-listing">
			<div className="logo-wrap">
				<img src={l.avatar_image.original_url} class="disp-logo"/>
			</div>
			<div className="info-wrap">
				<div className="inner-info">
				 				 <div className="rating-wrap"><Rating name="read-only" value={rating_val} readOnly /><span className="rating-txt">{rating_val}/5</span></div>
				 <h5 className="disp-name">{l.name}</h5>
				 <p>{ l.city } { l.state }, { l.zip_code }</p>

		</div>
		<div className="tags">
		{l.open_now && <span className="tag">Open Now</span>}
                {l.type === 'delivery' && <span className="tag">Delivery</span>}
				{/* {[["is_recreational", "Recreational"],["accepts_credit_cards", "Accepts Credit Cards"],["has_atm", "ATM On-Site"],["has_handicap_access", "Handicap Accessible"],["has_curbside_pickup", "Curbside Pickup"]].filter(d=>l[d[0]]).map(doc=>(
                       <span className="tag">{doc[1]}</span>
                    ))} */}

		</div>
		</div>
		<Link to={`/${props.path}/${ex.state_code}/${l.city}/${l.slug}`} className="stretched-link"/>
		<ThemeProvider theme={theme}>
			
		<Button variant="contained" color="primary" className="view-button" disableElevation>
			
  View Profile
</Button>
</ThemeProvider>
		</div>

		</div>

	);
				}
	else {
		return (

			// <Col xs={6} md={4} className="displisting-padding">
				<div className='disp-wrap' data-disp-id={l.syncid}>
	<div className="disp-listing2">
		<div className="logo-wrap2">
			<img src={l.avatar_image.original_url} class="disp-logo"/>
		</div>
		<div className="info-wrap2">
			<div className="inner-info">
			 <div className="rating-wrap"><Rating name="read-only" value={rating_val} readOnly /><span className="rating-txt">{rating_val}/5</span></div>
			 <h5 className="disp-name">{l.name}</h5>
			 <p>{ l.city } { l.state }, { l.zip_code }</p>

	</div>
	<div className="tags">
	{l.open_now && <span className="tag green">Open Now</span>}
			{l.type === 'delivery' && <span className="tag">Delivery</span>}
			{[["accepts_credit_cards", "Accepts Credit Cards"],["has_atm", "ATM On-Site"],["has_curbside_pickup", "Curbside Pickup"]].filter(d=>l[d[0]]).map(doc=>(
				   <span className="tag">{doc[1]}</span>
				))}

	</div>
	</div>
	</div>
	<Link to={`/${props.path}/${ex.state_code}/${l.city}/${l.slug}`} className="stretched-link"/>
	<ThemeProvider theme={theme}>
<Tooltip title="Show On Map" className="">
<IconButton variant="contained" color="primary"  className="show-on-map-btn d-none d-lg-block" onClick={()=>{
	// window.map.flyTo(data.geo)
	window.map.flyTo({
		center: [l.geo.lon, l.geo.lat],
		zoom: 15
	  });

	//   document.querySelector(`#marker-${l.syncid}`).click()
}}> <PinDrop className="" /></IconButton>
</Tooltip>
</ThemeProvider>
	</div>
	// </Col>

);
	}
};
const ListingBlock2 = (props) => {
	let l = props.data, ex = props.ex
	let rating_val = Math.round(l.rating * 10) / 10;
	return (

				// <Col xs={6} md={4} className="displisting-padding">
					<div className='disp-wrap'  data-disp-id={l.syncid}>
		<div className="disp-listing2">
			<div className="logo-wrap2">
				<img src={l.avatar_image.original_url} class="disp-logo"/>
			</div>
			<div className="info-wrap2">
				<div className="inner-info">
				 <div className="rating-wrap"><Rating name="read-only" value={rating_val} readOnly /><span className="rating-txt">{rating_val}/5</span></div>
				 <h5 className="disp-name">{l.name}</h5>
				 <p>{ l.city } { l.state }, { l.zip_code }</p>

		</div>
		<div className="tags">
		{l.open_now && <span className="tag green">Open Now</span>}
                {l.type === 'delivery' && <span className="tag">Delivery</span>}
				{[["accepts_credit_cards", "Accepts Credit Cards"],["has_atm", "ATM On-Site"],["has_curbside_pickup", "Curbside Pickup"]].filter(d=>l[d[0]]).map(doc=>(
                       <span className="tag">{doc[1]}</span>
                    ))}

		</div>
		</div>
		</div>
		<Link to={`/${props.path}/${ex.state_code}/${l.city}/${l.slug}`} className="stretched-link"/>
		<ThemeProvider theme={theme}>
    <Tooltip title="Show On Map" className="">
    <IconButton variant="contained" color="primary"  className="show-on-map-btn d-none d-lg-block" onClick={()=>{
        // window.map.flyTo(data.geo)
        window.map.flyTo({
            center: [data.geo.lon, data.geo.lat],
            zoom: 15
          });

          document.querySelector(`#marker-${data.syncid}`).click()
    }}> <PinDrop className="" /></IconButton>
    </Tooltip>
    </ThemeProvider>
		</div>
		// </Col>

	);
};

export default ListingBlock;
