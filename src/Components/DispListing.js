import React, { useRef, useEffect, useState } from 'react';
// import { LinkContainer } from 'react-router-bootstrap'
import { Link, Route, Switch } from "react-router-dom";
import { green } from '@material-ui/core/colors';
import purple from '@material-ui/core/colors/purple';
import {  PinDrop } from '@material-ui/icons';
// import {Chip} from 'react-bootstrap';
import {Chip,IconButton, Tooltip, Button} from '@material-ui/core';
// import ReactDOM from 'react-dom';
import Rating from '@material-ui/lab/Rating';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import Typography from '@material-ui/core/Typography';
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
function DispListing(props) {
    let data = props.data, ex = props.ex
    let bgimg = '';
	// console.log(data)
	if(data.cover_photo){

		bgimg = data.cover_photo
	}
	else if(data.images && data.images.length > 0){
		bgimg = data.images[Math.floor(Math.random() * data.images.length)]
	}

	else {
		// bgimg = "https://storage.googleapis.com/weedcomimgs/disp_images/missing_avatar.jpg"
		bgimg = data.avatar_image.original_url
	}

	let rating = [], fill=(<i className="bi bi-star-fill"></i>), nf = (<i className="bi bi-star"></i>);

	for (var i = 1; i <= 4; i++) {
		let tr = (data.rating >= i) ? fill : nf
        rating.push(tr)
	}

	let tmp = (data.rating >= 4.5) ? fill : nf
    rating.push(tmp)
    let rating_val = Math.round(data.rating * 10) / 10;
    rating.push((<span className="fw-bolder ml-2 fs-sm text-white">{parseFloat(data.rating).toFixed(1)}/5</span>))
    return(
        <div className="col flex-fill col-lg-6  col-xl-4 disp-col m-0 p-0 pr-md-3 pb-3 mb-3">
            <Link to={`/${props.path}/${ex.state_code}/${data.city}/${data.slug}`}>
    <div className="dlisting" data-disp-id={data.id} style={{backgroundImage:`url(${bgimg})`}}>
        <div className="inner-listing">
            <div className="info-wrap-one">
                {/* <div className="rating-wrap"><Rating name="read-only" value={rating_val} precision={0.5} name="size-small" readOnly emptyIcon={<StarBorderIcon fontSize="inherit" color="white"/>} /></div> */}
                <Box component="fieldset" borderColor="white" className="d-flex align-items-center">
                    <Rating
                    name="customized-empty"
                    defaultValue={rating_val}
                    precision={0.5}
                    readOnly

                    />
                    <span className="fw-bold ml-2 fs-sm text-white align-center">{parseFloat(data.rating).toFixed(1)}/5</span>
                </Box>
                <h4 className="listing-name text-white">{ data.name }</h4>
                <p className="address text-white">{ (data.address != null && data.address != 'null') ? data.address : '' } { data.city } { data.state } { data.zip_code }</p>
                {/* <p><span className="green"><i className="bi bi-clock-fill"></i> Open</span> Until 9:00pm</p> */}
                <ThemeProvider theme={theme}>
                <div class="tags mt-3">
                {data.open_now && <Chip color="primary" className="mr-2 fw-bold" size='small' label="Open Now"/>}
                {data.type === 'delivery' && <Chip color="secondary" className="mr-2 fw-bold" size='small' label="Delivery"/>}

                    {[["is_recreational", "Recreational"],["accepts_credit_cards", "Accepts Credit Cards"],["has_atm", "ATM On-Site"],["has_handicap_access", "Handicap Accessible"],["has_curbside_pickup", "Curbside Pickup"]].filter(d=>data[d[0]]).map(doc=>(
                        <Chip color="light" className="mr-2"  size='small' label={doc[1]}/>
                    ))}

                    {/* <Badge variant="success">Open Now</Badge>{' '} <Badge variant="light">Recreational</Badge> */}
                </div>
                </ThemeProvider>
            </div>

        </div>
    </div>
    </Link>
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
    )
}
export default DispListing
