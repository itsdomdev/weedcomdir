import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Divider from '@material-ui/core/Divider';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import SecurityIcon from '@material-ui/icons/Security';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import {Container,Accordion,  Row,Badge, Col, Card, Nav, Tabs, Tab} from 'react-bootstrap';
import {Spinner} from "react-bootstrap-v5";
import {Accordion as Accord} from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from '../Components/Header';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Rating from '@material-ui/lab/Rating';
import {Breadcrumb as BC} from 'react-bootstrap'
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import EmailIcon from '@material-ui/icons/Email';
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
// import testdata from '../util/testdata'
// import ReactMapboxGl, {Image, Marker, Layer, Feature} from "react-mapbox-gl";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {dispBySlug} from '../util/apilink'
import GridList from '@material-ui/core/GridList';
import {ListSubheader, GridListTileBar } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import GridListTile from '@material-ui/core/GridListTile';
import { Link} from "react-router-dom";
import history from '../history';
import MiniMap from '../Components/MiniMap'
import { makeStyles } from '@material-ui/core/styles';
import ReactBnbGallery from 'react-bnb-gallery';
import AccessibleIcon from '@material-ui/icons/Accessible';
import 'react-bnb-gallery/dist/style.css'
import { LocalHospital, PinDrop } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Icon from '@material-ui/core/Icon';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// mapboxgl.workerClass = MapboxWorker;
// mapboxgl.accessToken = 'pk.eyJ1IjoiZGdyb2Nob3dpY3oiLCJhIjoiY2tjZDNhbnQ3MDhxejJ4cDNtcTdhb29zNCJ9.nBwzmcvP2BYFxkuWv2vJJA';

// import { faPhone, faMapPin, faStar } from '@fortawesome/free-solid-svg-icons'
// import { farStar } from '@fortawesome/fontawesome-svg-core'
const useStyles = makeStyles((theme) => ({
     root: {
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-around',
       overflow: 'hidden',
       isOpen: false,
       backgroundColor: theme.palette.background.paper,
     },
     root2: {
          width: '100%',
        },
     heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
        },
     gridList: {
       width: 500,
       height: 450,
     },
   }));

function GalleryGrid(props) {
     // const classes = useStyles();
     const gridstyle = {
       width: "100%",
       height: "auto",
     }
     return (
          <GridList cellHeight={400} style={gridstyle} cols={3}>
          {props.imagelist.map((tile,ind) => (
               <GridListTile key={`img${ind}`} onClick={()=>props.setIsOpen(true,ind)} style={{flexGrow: 1}} cols={(Math.floor(Math.random() * 2) + 1)}>
               <img src={tile} style={{objectFit:"cover", height:"100%", width: "100%"}} alt="" />
               </GridListTile>
          ))}
          </GridList>
     )

}

// const Map = ReactMapboxGl({accessToken: 'pk.eyJ1IjoiZGdyb2Nob3dpY3oiLCJhIjoiY2tjZDNhbnQ3MDhxejJ4cDNtcTdhb29zNCJ9.nBwzmcvP2BYFxkuWv2vJJA'});
class DispProfile extends React.Component {
     constructor(props) {
          super(props)

          console.log(props)
          this.state = {
               listing: {},
               loading: true,
               menu: {},
               activePhoto: 0,
               // path: window.location.pathname.split('/')[1],
               path: window.location.pathname.indexOf('delivery') > -1 ? 'delivery' : 'dispensaries',
               exdata: {
                    state: "California",
                    state_code: "CA",
                    city: ""
               }

          }
     }
     setIsOpen = (val, ind=0) =>{
          this.setState({
               isOpen: val,
               activePhoto: ind
          })
     }
     formatPhoneNumber = (phoneNumberString) => {
          var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
          var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
          if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
          }
          return null;
        }
     componentDidMount() {
          // let location = useLocation();
          // console.log(window.location.pathname.split('/').pop())
          let slug = window.location.pathname.split('/').pop()
          dispBySlug(slug)
          .then(res=> {

               console.log(res)
               this.setState({listing: res.listing, menu: res.ms, exdata: res.data, loading: false})
          })

     }
     render() {

          const {listing, menu, isOpen, exdata,activePhoto, loading, path} = this.state;
          let bcstart = (path == 'delivery') ? 'Delivery Services' : `${path}`;
          const missing_options = ["https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image1.webp",
          "https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image2.webp",
          "https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image3.webp",
          "https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image4.webp",
          "https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image5.webp",
          "https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image6.webp",
          "https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image7.webp",
          "https://storage.googleapis.com/weedcomimgs/disp_images/missing/missing_image8.webp"];
          let mark = (listing.type === "delivery")
               ? '/images/purppin.png'
               : '/images/greenpin.png';
          if (loading) {
               return (<div className="container" style={{minHeight:"90vh"}}>
                <div id="loading">
                    <Spinner animation="grow" />
                </div>
                </div>
            )
          }
          else {
          return (<div className="pb-100px">
               {/* <Header/> */}
               <section id="disp-body" className="mt-lg-5">
                    <Helmet>
                    <title>{`${listing.name} - ${listing.city}, ${listing.state} Cannabis ${path} | Weed.com`}</title>
                    <meta property="og:site_name" content="Weed.com"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content={`https://weed.com/dispensaries/ca/${listing.slug}`}/>
                    <meta property="og:image" content={listing.avatar_image.original_url}/>
                    <meta property="og:title" content={`${listing.name} - ${listing.city}, ${listing.state} Cannabis ${path} | Weed.com`} />
                    <meta property="twitter:title" content={`${listing.name} - ${listing.city}, ${listing.state} Cannabis ${path} | Weed.com`}/>
                    <meta property="og:description" content="A directory of recreational and medical marijuana stores in San Francisco"/>
                    <meta name="description" property="og:description" content={`${listing.name} is a cannabis ${(path == 'delivery') ? "Delivery Service" : "Dispensary"} located in ${listing.city}, ${listing.state}. See their menu, reviews, contact details, and more`}/>
                    </Helmet>
                    <Container>
                         <div className="row mt-2 mt-lg-2 mb-lg-5">
                              <div className="col align-items-start" style={{position:"relative"}}>
                              <Button
                              // style={{position:"absolute", left: "-100px"}}
                              // variant="contained"
                              // color="secondary"
                              className="text-muted d-inline-flex"
                              // onClick={()=>history.goBack()}
                              startIcon={<ArrowBackIosIcon />}
                              >
                              <Link className="text-muted" to={`/${path}/${exdata.state_code}/${exdata.city.replace(/\s/g, '-')}?lat=${listing.geo.lat}&lng=${listing.geo.lon}`}>
                                        Back
                                        </Link>
                              </Button>
                                   <div className="bread-crumbs">
                                   <Breadcrumbs aria-label="breadcrumb">
                                        <Link to={`/${path}`} className="text-muted text-capitalize">
                                        {bcstart}
                                        </Link>
                                        <Link to={`/${path}/${exdata.state_code}?lat=${listing.geo.lat}&lng=${listing.geo.lon}`} className="text-muted ">
                                        {exdata.state}
                                        </Link>
                                        <Link to={`/${path}/${exdata.state_code}/${exdata.city.replace(/\s/g, '-')}?lat=${listing.geo.lat}&lng=${listing.geo.lon}`} className="text-muted ">
                                        {exdata.city}
                                        </Link>
                                        <span className="highlight-bc">{listing.name} </span>
                                        </Breadcrumbs>

                                   </div>
                              </div>
                         </div>
                         <div className="row mt-2 mt-lg-5 align-content-stretch">
                              {
                                   listing.images && listing.images.length > 0
                                        ? <> < div className = "col flex-fill col-md-8 order-2 order-md-1" > <div className="top-img-one tp-img" style={{
                                                       backgroundImage: `url(${listing.images[exdata.random[0]]})`
                                                  }}></div>
                                             {/* <!-- <img src="https://storage.googleapis.com/weedcomimgs/disp_images/48880_gallery_1.jpg" alt=""> --> */
                                        }
                                        </div>
                                        <div className="col flex-fill col-lg-3">
                                             <div className="top-img-two tp-img" style={{
                                                       backgroundImage: `url(${listing.avatar_image.original_url})`
                                                  }}></div>
                                        </div>
                                   </>
                                        : <> < div className = "col-7 p-0 p-lg-2 flex-fill col-lg-8 order-2 order-md-1" > <div className="top-img-one tp-img" style={{
                                                       backgroundImage: `url(${missing_options[Math.floor(Math.random() * missing_options.length)]})`
                                                  }}></div>
                                             {/* <!-- <img src="https://storage.googleapis.com/weedcomimgs/disp_images/48880_gallery_1.jpg" alt=""> --> */
                                        }
                                        </div>
                                   <div className="col-5 p-0 p-lg-2 flex-fill col-lg-4">
                                        <div className="top-img-two tp-img" style={{
                                                  backgroundImage: `url(${listing.avatar_image.original_url})`
                                             }}></div>
                                   </div>
                              </>
                              }

                         </div>
                         <div className="row">
                              <div className="col col-md-8">
                                   <div className="row mt-4">
                                        <div className="col-12">
                                             <Card className="bg-transparent">
                                                  <Card.Body>
                                                       <h2>{listing.name}</h2>
                                                       <h6 className="card-subtitle mb-4 mt-3 text-secondary fw-light d-flex align-items-end">
                                                            {/* <FontAwesomeIcon icon={faMapPin} className=" fa-sm ml-1 mr-3"/> */}
                                                            <PinDrop className="mr-3"/>
                                                            {(listing.address != null && listing.address != 'null') && listing.address}
                                                            {listing.city}, {listing.state}{' '}
                                                            {listing.zip_code}
                                                       </h6>
                                                       <p>
                                                       {/* <FontAwesomeIcon icon={faPhone} className="fa-sm mr-3"/> */}
                                                       <PhoneIcon className="mr-3 mb-2"/>
                                                            {this.formatPhoneNumber(listing.phone_number)}<br/>
                                                            <EmailIcon  className="mr-3 mt-0"/>
                                                                                {listing.email}</p>
                                                       <div className="row mt-4 align-items-stretch">
                                                            <div className="col col-md-6">
                                                                 <button disabled="disabled" type="button" className="btn btn-secondary w-100 text-uppercase fs-6 listing-verification">Unverified Listing
                                                                      <p className="text-center text-white fs-xs m-0">
                                                                           <a className="text-white text-decoration-none" href="#">Do You Own This Business? Claim Here.</a>
                                                                      </p>
                                                                 </button>
                                                            </div>
                                                            <div className="col col-md-6 mt-3 mt-md-0">
                                                                 <div className="card bg-transparent d-flex">
                                                                      <div className="card-body p-2 text-center">
                                                                           {/* <h5>Rating</h5> */}
                                                                           <div className="rating-wrap d-flex justify-content-around align-items-center">
                                                                                <Rating
                                                                                     name="customized-empty"
                                                                                     defaultValue={listing.rating}
                                                                                     precision={0.5}
                                                                                     readOnly
                                                                                     size="large"

                                                                                     />
                                                                                <h4 className="m-0"><Badge className="fw-boldd px-3 py-2 text-semi-dark" variant="warning" >{parseFloat(listing.rating).toFixed(1)} / 5</Badge></h4>
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div className="row mt-3 mt-md-5">
                                                            <div className="col-12">
                                                                 <Divider className="my-3"/>
                                                            <div className="d-flex prof-info-col-wrap">
                                                            {
                                                                 listing.is_recreational && <p className="info-cols">
                                                                           <EmojiEmotionsIcon className="is-4"/>Recreational
                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_security_guard && <p className="info-cols">
                                                                           <SecurityIcon className="is-4"/>Security Guard
                                                                      </p>
                                                            }
                                                            {
                                                                 (listing.license_type == 'medical' || listing.license_type == 'hybrid') && <p className="info-cols">
                                                                           <LocalHospitalIcon className="is-4"/>Medical

                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_handicap_access && <p className="info-cols">
                                                                           <AccessibleIcon className="is-4"/>Handicap Access

                                                                      </p>
                                                            }
                                                            {
                                                                 listing.type == 'delivery' && <p className="info-cols">
                                                                           <LocalShippingIcon className="is-4"/>
                                                                           Delivery

                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_atm && <p className="info-cols">
                                                                           <LocalAtmIcon className="is-4"/>
                                                                           ATM on Site
                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_curbside_pickup && <p className="info-cols">
                                                                           <EmojiTransportationIcon className="is-4"/>Curbside Pickup
                                                                      </p>
                                                            }
                                                            {
                                                                 listing.accepts_credit_cards && <p className="info-cols">
                                                                          <CreditCardIcon className="is-4"/>Accepts Debit Cards
                                                                      </p>
                                                            }
                                                       </div>
                                                            </div>
                                                       </div>
                                                  </Card.Body>
                                             </Card>
                                        </div>
                                   </div>
                                   <div className="row mt-3 mt-md-5 d-none">
                                        <div className="col-12">
                                             <div className="card bg-transparent">
                                                  <div className="card-body">
                                                       <div className="d-flex prof-info-col-wrap">
                                                            {
                                                                 listing.is_recreational && <p className="info-cols">
                                                                           <EmojiEmotionsIcon className="is-4"/><br/>Recreational
                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_security_guard && <p className="info-cols">
                                                                           <SecurityIcon className="is-4"/><br/>Security Guard
                                                                      </p>
                                                            }
                                                            {
                                                                 (listing.license_type == 'medical' || listing.license_type == 'hybrid') && <p className="info-cols">
                                                                           <LocalHospitalIcon className="is-4"/><br/>Medical

                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_handicap_access && <p className="info-cols">
                                                                           <AccessibleIcon className="is-4"/><br/>Handicap Access

                                                                      </p>
                                                            }
                                                            {
                                                                 listing.type == 'delivery' && <p className="info-cols">
                                                                           <LocalShippingIcon className="is-4"/><br/>Delivery

                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_atm && <p className="info-cols">
                                                                           <LocalAtmIcon className="is-4"/><br/>ATM on Site
                                                                      </p>
                                                            }
                                                            {
                                                                 listing.has_curbside_pickup && <p className="info-cols">
                                                                           <EmojiTransportationIcon className="is-4"/><br/>Curbside Pickup
                                                                      </p>
                                                            }
                                                            {
                                                                 listing.accepts_credit_cards && <p className="info-cols">
                                                                          <CreditCardIcon className="is-4"/><br/>Accepts Debit Cards
                                                                      </p>
                                                            }
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="col col-md-4 mt-4 flex-fill">
                                   <div className="card">
                                        <MiniMap listing={listing}/>
                                        {/* <Map style='mapbox://styles/dgrochowicz/ckmhh0zwe0kyd17o4av0okzkp' center={[listing.geo.lon, listing.geo.lat]} className="small-map" id="map">
                                             <Marker coordinates={[listing.geo.lon, listing.geo.lat]} anchor="bottom">
                                                  <img src={mark}/>
                                             </Marker>

                                        </Map> */}

                                   </div>
                              </div>
                              {/* <div className="row mt-3 mt-md-5"> */}
                                        <div className="col-12 mt-4">
                                             <div className="card bg-transparent">
                                                  <div className="card-body">
                                                       <h2 className="text-center">Brands</h2>
                                                       <div className="d-flex flex-wrap justify-content-between" id="brand-wrap">
                                                            {listing.brands.map(b=>(

                                                                 <div className="brand-avatar-wrap">
                                                                      <img src={b.avatarImage.originalUrl} alt="" className="brand-img" />
                                                                      <h6>{b.name}</h6>
                                                                 </div>
                                                            ))}


                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                              {/* </div> */}
                              <div className="col-12">
                                   <div className="row mt-5">
                                        <div className="col-12">
                                             <div className="card bg-transparent">
                                                  <div className="card-body">
                                                       <Tabs defaultActiveKey="menu" id="uncontrolled-tab-example">
                                                            {menu && menu.length > 0 &&
                                                            <Tab eventKey="menu" title="Menu">
                                                                 {/* <div className="menu-wrap row row-cols-4 g-4 mt-5"> */}
                                                                      {/* {
                                                                           menu.map(p => (<div className="col mb-5 prod-col">
                                                                                <div className="card border-0 rounded-1 bg-dark text-dark shadow">
                                                                                     <img src={p.avatarImage.largeUrl} className="card-img rounded-0" alt="..."/>
                                                                                     <div className="card-img-overlay d-flex align-items-end">
                                                                                          <h5 className="prod-title">{p.name}</h5>

                                                                                     </div>
                                                                                </div>
                                                                           </div>))
                                                                      } */}

<GridList cols={3} cellHeight={280}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
          <ListSubheader component="div">Featured</ListSubheader>
        </GridListTile>
        {menu.map((p) => (
          <GridListTile key={p.id} class="menu-tile">
            <img src={p.avatarImage.largeUrl} />
            <GridListTileBar
              title={p.name}
              subtitle={`${p.category.name} | ${p.edgeCategory.name}`}
               d

            />
          </GridListTile>
        ))}
      </GridList>
                                                                 {/* </div> */}

                                                            </Tab>
          }
                                                            <Tab eventKey="profile" title="Profile">
                                                                 <div className="row mt-5">
                                                                      <div className="col col-md-7">
                                                                      <Accord>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Introduction</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <span dangerouslySetInnerHTML={{__html: listing.intro_body}}></span>
          </Typography>
        </AccordionDetails>
      </Accord>
      <Accord>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>About</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <span dangerouslySetInnerHTML={{__html: listing.description}}></span>
          </Typography>
        </AccordionDetails>
      </Accord>
      <Accord>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>More Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{width:"100%"}}>
          <h5 className="mt-2">Amenities</h5>
                                                                            <Divider className="mt-2 mb-2"/>
                                                                                               <div className="d-flex w-100 text-center amen-wrap justify-content-between">
                                                                                                    {
                                                                                                         listing.has_handicap_access && <div>
                                                                                                                   <AccessibleIcon className="is-2"/><br/>Handicap Access</div>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.accepts_credit_cards && <div>
                                                                                                                   <CreditCardIcon className="is-2"/><br/>Accepts Credit Cards</div>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.is_recreational && <div>
                                                                                                                   <EmojiEmotionsIcon className="is-2"/><br/>Recreational</div>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.has_atm && <div>
                                                                                                                   <LocalAtmIcon className="is-2"/><br/>ATM</div>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.has_security_guard && <div>
                                                                                                                   <SecurityIcon className="is-2"/><br/>Security Guard</div>
                                                                                                    }

                                                                                               </div>
          </Typography>
        </AccordionDetails>
      </Accord>
                                                                      <Accordion className="d-none" defaultActiveKey="0">
                                                                          <Card>
                                                                          <Accordion.Toggle as={Card.Header} eventKey="0">
                                                                          <h3>Introduction</h3>
                                                                            </Accordion.Toggle>
                                                                            <Accordion.Collapse eventKey="0">
                                                                            <Card.Body>

                                                                            <h3>Introduction</h3>
                                                                                               <span dangerouslySetInnerHTML={{__html: listing.intro_body}}></span>
                                                                            </Card.Body>
                                                                            </Accordion.Collapse>
                                                                        </Card>
                                                                              <Card>
                                                                          <Accordion.Toggle as={Card.Header} eventKey="1">
                                                                          <h3>About</h3>
                                                                            </Accordion.Toggle>
                                                                            <Accordion.Collapse eventKey="1">
                                                                            <Card.Body>

                                                                            <h3>About</h3>
                                                                                               <span dangerouslySetInnerHTML={{__html: listing.description}}></span>
                                                                            </Card.Body>
                                                                            </Accordion.Collapse>
                                                                        </Card>
                                                                        <Card>
                                                                          <Accordion.Toggle as={Card.Header} eventKey="2">
                                                                          <h3>More Info</h3>
                                                                            </Accordion.Toggle>
                                                                            <Accordion.Collapse eventKey="2">
                                                                            <Card.Body>

                                                                            <h5 className="mt-2">Amenities</h5>
                                                                            <Divider className="mt-2 mb-2"/>
                                                                                               <div className="d-flex text-center amen-wrap justify-space-between">
                                                                                                    {
                                                                                                         listing.has_handicap_access && <p>
                                                                                                                   <AccessibleIcon className="is-2"/><br/>Handicap Access</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.accepts_credit_cards && <p>
                                                                                                                   <CreditCardIcon className="is-2"/><br/>Accepts Credit Cards</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.is_recreational && <p>
                                                                                                                   <EmojiEmotionsIcon className="is-2"/><br/>Recreational</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.has_atm && <p>
                                                                                                                   <LocalAtmIcon className="is-2"/><br/>ATM</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.has_security_guard && <p>
                                                                                                                   <SecurityIcon className="is-2"/><br/>Security Guard</p>
                                                                                                    }

                                                                                               </div>
                                                                            </Card.Body>
                                                                            </Accordion.Collapse>
                                                                        </Card>
                                                                        </Accordion>


                                                                                     {/* <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                                          <div className="accordion-body">
                                                                                               <h3>Introduction</h3>
                                                                                               <span dangerouslySetInnerHTML={{__html: listing.intro_body}}></span>
                                                                                          </div>
                                                                                     </div>
                                                                                </div> */}
                                                                                {/* <div className="accordion-item">
                                                                                     <h2 className="accordion-header" id="headingTwo">
                                                                                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                                               About
                                                                                          </button>
                                                                                     </h2>
                                                                                     <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                                          <div className="accordion-body">
                                                                                               <h3>About</h3>
                                                                                               <span dangerouslySetInnerHTML={{__html: listing.description}}></span>

                                                                                          </div>
                                                                                     </div>
                                                                                </div>
                                                                                <div className="accordion-item">
                                                                                     <h2 className="accordion-header" id="headingThree">
                                                                                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                                               More Info
                                                                                          </button>
                                                                                     </h2>
                                                                                     <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                                                          <div className="accordion-body">
                                                                                               <h5 className="mt-5">Amenities</h5>
                                                                                               <div className="d-flex text-center amen-wrap">
                                                                                                    {
                                                                                                         listing.has_handicap_access && <p>
                                                                                                                   <i className="fas fa-3x fa-wheelchair"></i><br/>Handicap Access</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.accepts_credit_cards && <p>
                                                                                                                   <i className="far fa-3x fa-credit-card"></i><br/>Accepts Credit Cards</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.is_recreational && <p>
                                                                                                                   <i className="fas fa-3x fa-joint"></i><br/>Recreational</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.has_atm && <p>
                                                                                                                   <i className="fas fa-3x fa-money-bill"></i><br/>ATM</p>
                                                                                                    }
                                                                                                    {
                                                                                                         listing.has_security_guard && <p>
                                                                                                                   <i className="fas fa-3x fa-shield-alt"></i><br/>Security Guard</p>
                                                                                                    }

                                                                                               </div>

                                                                                          </div>
                                                                                     </div>
                                                                                </div>
                                                                           </div>

                                                                      </div> */}

                                                                      </div>
                                                                      <div className="col-1 d-none d-md-block"></div>
                                                                      <div className="col col-md-4 profile-right">
                                                                           <h4>Contact Info</h4>
                                                                           <Divider className="mt-3 mb-3"/>
                                                                                <h5>{listing.name}</h5>
                                                                                < p >
                                                                                {listing.address} {listing.address.length > 0 && <br/>} {listing.city},{' '}
                                                                                {listing.state_code} {listing.zip_code}
                                                                                </p>

                                                                                <p><PhoneIcon  className="mr-3"/>
                                                                                {this.formatPhoneNumber(listing.phone_number)}</p>

                                                                                {/* <i className="fas fa-envelope"></i> */}
                                                                                <p><EmailIcon  className="mr-3"/>
                                                                                {listing.email}</p>
                                                                           <Divider/>
                                                                           <h5 className='mt-3'><WatchLaterIcon  className="mr-3"/> Hours</h5>
                                                                           <div className="hours">
                                                                                <p>
                                                                                     <strong>Sunday:
                                                                                     </strong>
                                                                                     {listing.business_hours.sunday.open}
                                                                                     - {listing.business_hours.sunday.close}
                                                                                </p>
                                                                                <p>
                                                                                     <strong>Monday:
                                                                                     </strong>
                                                                                     {listing.business_hours.monday.open}
                                                                                     - {listing.business_hours.monday.close}
                                                                                </p>
                                                                                <p>
                                                                                     <strong>Tuesday:
                                                                                     </strong>
                                                                                     {listing.business_hours.tuesday.open}
                                                                                     - {listing.business_hours.tuesday.close}
                                                                                </p>
                                                                                <p>
                                                                                     <strong>Wednesday:
                                                                                     </strong>
                                                                                     {listing.business_hours.wednesday.open}
                                                                                     - {listing.business_hours.wednesday.close}
                                                                                </p>
                                                                                <p>
                                                                                     <strong>Thursday:
                                                                                     </strong>
                                                                                     {listing.business_hours.thursday.open}
                                                                                     - {listing.business_hours.thursday.close}
                                                                                </p>
                                                                                <p>
                                                                                     <strong>Friday:
                                                                                     </strong>
                                                                                     {listing.business_hours.friday.open}
                                                                                     - {listing.business_hours.friday.close}
                                                                                </p>
                                                                                <p>
                                                                                     <strong>Saturday:
                                                                                     </strong>
                                                                                     {listing.business_hours.saturday.open}
                                                                                     - {listing.business_hours.saturday.close}
                                                                                </p>

                                                                           </div>
                                                                      </div>
                                                                    </div>


                                        </Tab>
                                        {/* <Tab eventKey="reviews" title="Review">

                                        </Tab> */}
                                        {(listing.images && listing.images.length > 0) && <Tab eventKey="gallery" title="Gallery">
                                              <GalleryGrid setIsOpen={this.setIsOpen} imagelist={listing.images}/>
                                              <ReactBnbGallery
          show={isOpen}
          photos={listing.images}
          onClose={() => this.setIsOpen(false)}
          activePhotoIndex={activePhoto}
        />
                                                  </Tab>}



                                   </Tabs>

                              </div>
                         </div>
                    </div>
                    </div>
                    </div>
                    </div>



</Container>
</section>
</div>)
     }
}
}

export default DispProfile;
