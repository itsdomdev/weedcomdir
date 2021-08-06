import React, { createRef, useRef, useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ListIcon from '@material-ui/icons/List';
import {Chip,IconButton, Tooltip, Button} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import { render } from '@testing-library/react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {Alert} from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
// import { BackTop } from 'antd';
import { geocodeByAddress } from 'react-google-places-autocomplete';
// import 'antd/dist/antd.css';
import { green } from '@material-ui/core/colors';
import purple from '@material-ui/core/colors/purple';
import EmptyState from '@atlaskit/empty-state';

import  { withStore } from '../util/datastore'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Spinner} from "react-bootstrap-v5";
import ListingMap from '../Components/ListingMap';
import Map from '../Components/ListMap';
import Header from '../Components/Header';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import DispListing from '../Components/DispListing';
import {getListings, updateListings} from '../util/apilink';
import InfiniteScroll from "react-infinite-scroll-component";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Select from 'react-select';
// import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import DoneIcon from '@material-ui/icons/Done';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useForkRef, Divider } from '@material-ui/core';
import {Helmet} from "react-helmet";
import {  isMobile} from "react-device-detect";

import ResizePanel from "react-resize-panel";
import useResizeAware from 'react-resize-aware';

const MapCol = (props) => {
  const [resizeListener, sizes] = useResizeAware();
  const [height, setHeight] = useState();
  console.log(props)
  React.useEffect(() => {
    console.log('Do something with the new size values');
    console.log(`height: ${sizes.height}`)
    console.log(window.map)

    if(height && window.map && sizes.height != height){
        window.map.resize()
    }
    if(sizes.height != null) {
        setHeight(sizes.height)
    }
  }, [sizes.width, sizes.height]);
  return (
    <div id="map-col">
            {resizeListener}
        {/* { loadingListings ? <div id="map"> <Spinner animation="grow" /></div> : <Map geojson={geojson} center={center} bounds={bounds} handleMapUpdate={this.handleMapUpdate} listings={filteredListings} toggleExpandMap={this.toggleExpandMap}/>} */}
        <Map geojson={props.geojson} mapLoading={props.loadingMap} center={props.center} bounds={props.bounds} handleMapUpdate={props.handleMapUpdate} listings={props.filteredListings} toggleExpandMap={props.toggleExpandMap}/>
    </div>

  );
};

const filterOptions = [
    { value: 'open_now', label: 'Open Now' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'is_recreational', label: 'Recreational' },
    { value: 'medical', label: 'Medical' },
    { value: 'has_atm', label: 'ATM On Site' },
    { value: 'accepts_credit_cards', label: 'Accepts Credit Cards' },
    { value: 'has_curbside_pickup', label: 'Curbside Pickup' },
    { value: 'has_handicap_access', label: 'Handicap Access' }
]
const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'rgba(131, 131, 131, 0.5)', width:"100%", border:"none", fontFamily: `"Maven Pro", sans-serif !important` }),
  multiValue: (styles, { data }) => ({ ...styles, backgroundColor:"#8460a8", color:"#fff", borderRadius:"5px" }),
  multiValueLabel: (styles, { data }) => ({
       ...styles,
       color: "#fff",
     }),
     placeholder: styles => ({ ...styles, color:"#fff" }),

}
const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    left:0
  };
//    const accent = purple.A700;
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
class Listing extends React.Component {
    constructor(props){
        super(props);
            console.log(props)
            this.listingContainer = React.createRef();
        this.state ={
            loading: true,
            listings: [],
            extradata: '',
            pins: [],
            city: '',
            // path: window.location.pathname.split('/')[1],
            path: window.location.pathname.indexOf('delivery') > -1 ? 'delivery' : 'dispensaries',
            state: '',
            filteredListings: [],
            loadingListings: true,
            loadingMap: false,
            center: {},
            hasListings: false,
            level: props.level,
            mapbounds: props.store.mapData ? props.store.mapData.bounds : [],
            geojson: {},
            curpage: 1,
            map_expanded: false,
            filtersVisible: false,
            keywordSearch: props.store.searchData ? props.store.searchData.keyword : '',
            filters: props.store.getFilterArray(),
        }

    }
    componentDidMount(){
        console.log('component mounted Listing')
        // document.querySelector('#scroll-container').addEventListener('scroll',this.handleScroll)
        let urlq = window.location.search
        console.log(urlq.length)
        if(urlq.length < 1){
            let p = window.location.pathname.split('/'), city, state_code, add
        if(p.length == 5){
            city = p[4]
            state_code = p[3]
            add = `${city}, ${state_code}, USA`
        }
        else if(p.length == 4){
            // city = path[3]
            state_code = p[3]
            add = `${state_code}, USA`
        }
           geocodeByAddress(add)
           .then(res=>{
               console.log(res)
               window.location.search = `?lat=${res[0].geometry.location.lat()}&lng=${res[0].geometry.location.lng()}`
               this.handleGetListings()
           })
        }
        else {
            this.handleGetListings()
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('component updated Listing')
        console.log(prevProps)
        console.log(prevState)
        // console.log(snapshot)
    }
    handleGetListings = () => {
        console.log('handleGetListings')
        console.log(window.map)
        // console.log(window.map.getCenter())
        let p = window.location.pathname.split('/'), city, state_code
        if(p.length == 5){
            city = p[4]
            state_code = p[3]
        }
        else if(p.length == 4){
            // city = path[3]
            state_code = p[3]
        }

        let queryStrings = window.location.search.split('?')[1].split('&')
        console.log(queryStrings.length)
        let bounds;
        if(window.map){
            bounds = window.map.getBounds();
            console.log(bounds)
            // let center = map.getCenter();
        }
        let q = {}
        for (let fo of queryStrings) {
            let tmp = fo.split('=');
            q[tmp[0]] = tmp[1]

        }
        console.log(q)
        console.log(`city: ${city}`)
        console.log(`state: ${state_code}`)
        let data = {
            "state_code":state_code,
            "city":city,
            "top_left": (bounds) ? `${bounds._sw.lng},${bounds._ne.lat}` : undefined,
            "bottom_right": (bounds) ? `${bounds._ne.lng},${bounds._sw.lat}` : undefined,
            "lat": q.lat,
            "lng": q.lng,
            "pg": this.state.curpage,
            "path": this.state.path,
            "keyword": this.state.keywordSearch,
            "filters": this.state.filters
        }
        getListings(data)
        .then(res=>{
            console.log(res)
            if(res.has_listings){
            this.setState({
                loading:false,
                loadingListings: false,
                listings: res.listings,
                extradata: res.data,
                pins: res.pins,
                city: res.city,
                state: res.state,
                curpage: res.curpage,
                geojson: res.geojson,
                bounds: res.bounds,
                loadingMap: false,
                hasListings: res.has_listings,
                center: res.center,
                morePages: res.morePages,
                filteredListings: this.filterListings(res.listings)

            })
        }else {
            this.setState({
                hasListings: res.has_listings,
                loading: false
            })
        }
        })
    }
    handleMapUpdate = (map) => {
        // this.setState({loading: true})
        return new Promise(resolve=>{


        let thebounds = map.getBounds();
        let center = map.getCenter();
        console.log(thebounds)
        let data = {
            top_left: `${thebounds._sw.lng},${thebounds._ne.lat}`,
            bottom_right: `${thebounds._ne.lng},${thebounds._sw.lat}`,
            center_lat: center.lat,
            center_lng: center.lng,
            path: this.state.path,
            filters: this.state.filters
        }
        // this.setState({apiData: data})

        // console.log(JSON.stringify(data))
        updateListings(data)
        .then(res=>{
            console.log(res);
            if(res.has_listings){
            this.setState({
                listings:res.listings,
                geojson: res.geojson,
                center: center,
                morePages: res.morePages,
                hasListings: res.has_listings,
                // curpage: res.curpage,
                bounds: thebounds,
                apiData: data,
                filteredListings: this.filterListings(res.listings)
                // loading:false
            })
            return resolve({
                listings:res.listings,
                geojson: res.geojson,
                center: center,
                apiData: data,
                filteredListings: this.filterListings(res.listings)
                // loading:false
            })
        }
        else {
            this.setState({hasListings: res.has_listings})
        }
        })
    })
    }

    toggleExpandMap = (mc) => {
        console.log(mc)
        // console.log(mc.current)
        // setTimeout(() => {

        // }, timeout);

        this.setState({
            map_expanded: !this.state.map_expanded
        }, ()=>{
            mc.current.state.map.resize()

        })
    }
    fetchMoreData = () => {
        const {
            city,
            extradata,
            center,
            curpage,
            geojson,
            morePages
        } = this.state
        console.log(morePages)
        // if (this.state.listing.length >= 500) {
        //   this.setState({ hasMore: false });
        //   return;
        // }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        // setTimeout(() => {
            let data = {
                "state_code": extradata.state_code,
                "city":city,
                "lat": center.lat,
                "lng": center.lon,
                "pg": curpage + 1,
                "path": this.state.path,
                "filters": this.state.filters
            }

            getListings(data)
            .then(res => {
                console.log(res)
                if(res.has_listings){
                let gj = res.geojson
                let ft = gj.features.concat(geojson.features)
                gj.features = ft;
                this.setState({
                    listings: this.state.listings.concat(res.listings),
                    curpage: res.curpage,
                    morePages: res.morePages,
                    bounds: res.bounds,
                    hasListings: res.has_listings,
                    geojson: gj,
                    filteredListings: this.filterListings(this.state.listings.concat(res.listings))

                });
            }
            else {
                this.setState({hasListings: res.has_listings})
            }
            })

        // }, 500);
      };
      clearFilters = () => {
        this.props.store.clearFilters()
        this.setState({
            filters: [],
            loadingListings: true,
            loadingMap: true,
            loading:true
       },this.handleGetListings)
      }
      handleDelete = (e) => {
        console.log(e)
        // console.log(e.currentTarget.getAttribute('data-value'))
        // console.info('You clicked the delete icon.');
        const {
             filters
        } = this.state

        if(filters.map(f=>f.value).indexOf(e) > -1) {
             filters.splice(filters.map(f=>f.value).indexOf(e), 1)
        }
        // else if(additionalFilters.map(f=>f.value).indexOf(e) > -1){
        //      additionalFilters.splice(additionalFilters.map(f=>f.value).indexOf(e), 1)
        // }

        console.log(filters)
        this.props.store.updateFilters(filters)
        // console.log(additionalFilters)

        this.setState({
             filters: filters,
             loadingListings: true,
             loadingMap: true
        },this.handleGetListings)

      };
      handleChange = (e) => {
        const {listings} = this.state


        console.log(e)
        if(e.length > 0){
            this.props.store.updateFilters(e)
       }
       let filters = e;
       let filt = listings.filter(list=>{
        let matches = true;
        if(filters.length < 1) return true;
        for (const fi of filters) {
            let f = fi.value
            console.log(f)

            if (f == 'delivery'){
                matches = (list.type == 'delivery') ? true : false;

                if(!matches){
                    return false;
                }
            } else if (f == 'medical'){
                matches = (list.license_type == 'hybrid' || list.license_type == 'medical') ? true : false;
                if(!matches){return false;}

            } else if (f == 'is_recreational'){
                matches = (list.license_type == 'hybrid' || list.is_recreational == true) ? true : false;
                if(!matches){return false;}
            }
            else {
                matches = (list[f] == true);
                if(!matches){return false;}
            }

        }
        return true
    })

    console.log(listings.length)
    console.log(filt.length)

        this.setState({
            filters: e,
            filteredListings: filt,
            loadingMap: true
        },this.handleGetListings)


   }
      filterListings = (l) => {
        const {listings, filters} = this.state
        let thelistings = (l) ? l : listings
       let filt = thelistings.filter(list=>{
        let matches = true;
        if(filters.length < 1) return true;
        for (const fi of filters) {
            let f = fi.value
            console.log(f)

            if (f == 'delivery'){
                matches = (list.type == 'delivery') ? true : false;

                if(!matches){
                    return false;
                }
            } else if (f == 'medical'){
                matches = (list.license_type == 'hybrid' || list.license_type == 'medical') ? true : false;
                if(!matches){return false;}

            } else if (f == 'is_recreational'){
                matches = (list.license_type == 'hybrid' || list.is_recreational == true) ? true : false;
                if(!matches){return false;}
            }
            else {
                matches = (list[f] == true);
                if(!matches){return false;}
            }

        }
        return true
    })

    console.log(thelistings.length)
    console.log(filt.length)
        if(l){
            return filt
        }
        else {
        this.setState({
            filteredListings: filt
        })
    }


   }
      handleAddFilter = (filt) => {
           const {filters} = this.state;
           const fmap = {
             open_now: { value: 'open_now', label: 'Open Now' },
             delivery: { value: 'delivery', label: 'Delivery' },
             recreational: { value: 'recreational', label: 'Recreational' },
             medical: { value: 'medical', label: 'Medical' },
           }
           if(filters.map(f=>f.value).indexOf(filt) > -1){
                filters.splice(filters.map(f=>f.value).indexOf(filt), 1)

           }
           else {
             filters.push(fmap[filt])
           }

           console.log(filters)
           this.setState({filters:filters})
        // console.info('You clicked the delete icon.');
      };
    handleScroll = (e) => {
        // console.log(e)
        // console.log(e.currentTarget)
        let top = document.querySelector('#scrolling-container').getBoundingClientRect().top;
        if(top < 0){

        }
        // console.log(document.querySelector('#scrolling-container').getBoundingClientRect().top)
    }
   toggleShowFilter = () => {
        const {filters, filtersVisible} = this.state
        let allfilters = filters
        console.log(`filters ${filtersVisible}`)
        if(allfilters.length > 0 && this.state.filtersVisible){
             this.props.store.updateFilters(allfilters)
             this.setState({
                filtersVisible: !this.state.filtersVisible,
                loadingListings: true
           },this.handleGetListings)
        }
        else {
            this.setState({
                filtersVisible: !this.state.filtersVisible
           })
        }
        // console.log(this.props.store)

      };
    renderListings = () => {
        const {
            listings,
            extradata
        } = this.state

        let disps = listings.map(l=>{
            return (<DispListing data={l} ex={extradata}/>)
        })

        console.log(disps);
        return disps
    }

	render(){
        const {
            listings,
            loading,
            filtersVisible,
            map_expanded,
            filters,
            loadingListings,
            center,
            hasListings,
            extradata,
            city,
            path,
            state,

            loadingMap,
            bounds,
            morePages,
            filteredListings,
            level,
            geojson
        } = this.state;
        // alert(path)
        console.log(`isMobile: ${isMobile}`)
        console.log(path)
        console.log(path != 'dispensaries')
        console.log(path === 'dispensaries')
        let bcstart = (path == 'delivery') ? 'Delivery Services' : `${path}` ;
        if(loading){
            return (<div className="container" style={{minHeight:"90vh"}}>
                <div id="loading">
                    <Spinner animation="grow" />
                </div>
                </div>
            )
        }
        else if(hasListings == false){
            return(
                <div className="container">
                    {(city && extradata) &&
                    <div className={map_expanded ? "col-5 mt-lg-5" : "col mt-lg-5 col-lg-8 flex-fill"}>
			<h1 className="listing-h1 text-capitalize"><span className="txt-change text-capitalize">{path} </span> In
				{(city) ? ` ${city}, ${extradata.state}` : ` ${state}`}

				</h1>
                <div className="bread-crumbs mt-3">
                                   <Breadcrumbs className="text-capitalize" aria-label="breadcrumb">
                                        <Link to={`/${path}`}>
                                        {bcstart}
                                        </Link>
                                        <Link to={`/${path}/${extradata.state_code}`}>
                                        {extradata.state}
                                        </Link>
                                        {city !== null &&
                                        <Link to={`/${path}/${extradata.state_code}/${city.replace(/\s/g, '-')}`}>
                                        {extradata.city.replace(/-/g, ' ')}
                                        </Link>
        }
                                        </Breadcrumbs>

                                   </div>

                <div id="filters" className="align-items-center mt-3" >
                <ThemeProvider theme={theme}>
              <Button
               variant="contained"
               color={filtersVisible ? "primary" : "default"}

               className={filtersVisible ? "mr-2 show-filter-btn active" : "mr-2 show-filter-btn"}
               disableElevation
               onClick={()=>this.toggleShowFilter()}
               startIcon={filtersVisible ? <DoneIcon/>:<FilterListIcon /> }
      >
        {!filtersVisible ? <span>Filter</span> : <span>Done</span>}
      </Button>
      </ThemeProvider>
			{filtersVisible &&
        <>

                    <Select
                         closeMenuOnSelect={false}
                         isMulti
                         defaultValue={filters}
                         className="filter-select"
                         options={filterOptions}
                         styles={colourStyles}
                         onChange={this.handleChange}
                    />
                    </>
        }
        {!filtersVisible && filters.length > 0 &&
        <><ThemeProvider theme={theme}>
              {filters.filter(dd => dd != null).map(d=>(
                   <Chip label={d.label} onDelete={()=>this.handleDelete(d.value)} className="filter-chip" color={d.value == 'open_now' ? "primary" : "secondary"} />
              ))}
              </ThemeProvider>
                    </>
        }

        </div>
        </div>
                    }
                    <div className="row">
                        <div className="col">
                        <EmptyState
                header="No Listings Found..."
                description={`There Are No Results For Your Current Search ${(filters.length > 0) ? `With The Chosen Filters.` : `Try To Broaden Your Search.`} `}
                imageUrl="/images/search_empty.png"
                primaryAction={(filters.length > 0 ) ? <Button variant="contained" onClick={()=>this.clearFilters()}>Clear Filters</Button> : <Button variant="contained">Back To Search</Button>}


           />
                        </div>
                    </div>
                </div>

            )
        }
        else{
  return (
    <>
        {/* <Header/> */}
    <div className={"container-max-map " + level} key={level}>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Cannabis {(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in {(city) ? ` ${city}, ${extradata.state}` : ` ${state}`} | Weed.com</title>
                <meta property="og:site_name" content="Weed.com"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content={`${window.location.href}`}/>
                    <meta property="og:image" content="https://3d1o2p3n180u4am5sr3ske9v-wpengine.netdna-ssl.com/wp-content/uploads/2021/03/featured-delta-8.jpg"/>
                    <meta property="og:title" content={`Cannabis ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? ` ${city}, ${extradata.state}` : ` ${state}`} | Weed.com`} />
                    <meta property="twitter:title" content={`Cannabis ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? ` ${city}, ${extradata.state}` : ` ${state}`} | Weed.com`}/>
                    <meta property="og:description" content={`A directory of recreational and medical marijuana ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? `${city}, ${extradata.state}` : extradata.state}`}/>
                    <meta name="description" property="og:description" content={`A directory of recreational and medical marijuana ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? `${city}, ${extradata.state}` : extradata.state}`}/>
                    <link rel="canonical" href={`${window.location.href}`} />
            </Helmet>
	<div className="row max-100vh" onScroll={this.handleScroll}>
        <div className="resize-container w-100">
        {isMobile &&
        <ResizePanel direction="s" style={{height:"30vh"}}>
            <MapCol geojson={geojson} loadingMap={loadingMap} center={center} bounds={bounds} handleMapUpdate={this.handleMapUpdate} filteredListings={filteredListings} toggleExpandMap={this.toggleExpandMap}/>
        </ResizePanel>}
    {/* <ResizePanel direction="n" style={{ flexGrow: '1' }}> */}
		<div className="listing-col col mt-3 mt-lg-5 col-lg-8 flex-fill">
		{/* <div className="listing-col"> */}
			<h1 className="listing-h1 text-capitalize"><span className="txt-change text-capitalize">{path} </span> In
				{(city) ? ` ${city}, ${extradata.state}` : ` ${state}`}

				</h1>
                <div className="bread-crumbs mt-3">
                                   <Breadcrumbs className="text-capitalize" aria-label="breadcrumb">
                                        <Link to={`/${path}`}>
                                        {bcstart}
                                        </Link>
                                        <Link to={`/${path}/${extradata.state_code}`}>
                                        {extradata.state}
                                        </Link>
                                        {city !== null &&
                                        <Link to={`/${path}/${extradata.state_code}/${city.replace(/\s/g, '-')}`}>
                                        {extradata.city.replace(/-/g, ' ')}
                                        </Link>
        }
                                        </Breadcrumbs>

                                   </div>
				{/* <div className="bread-crumbs mt-3">
					<span className="txt-change">Delivery</span> / <a href={`/delivery/${extradata.state_code}`} className="no-style listing-link"><span>
                        {state}
                        </span></a> / <a href={`/delivery/${extradata.state_code}/${city}`} className="no-style listing-link"><span>
                        {city}
                        </span></a>
				</div> */}
                <div id="filters" className="align-items-center mt-3" >
                <ThemeProvider theme={theme}>
              <Button
               variant="contained"
               color={filtersVisible ? "primary" : "default"}
               // {...filtersVisible ? (color="primary") : (color="default")}
               className={filtersVisible ? "mr-2 show-filter-btn active" : "mr-2 show-filter-btn"}
               disableElevation
               onClick={()=>this.toggleShowFilter()}
               startIcon={filtersVisible ? <DoneIcon/>:<FilterListIcon /> }
      >
        {!filtersVisible ? <span>Filter</span> : <span>Done</span>}
      </Button>
      </ThemeProvider>
			{filtersVisible &&
        <>

                    <Select
                         closeMenuOnSelect={false}
                         isMulti
                         defaultValue={filters}
                         className="filter-select"
                         options={filterOptions}
                         styles={colourStyles}
                         onChange={this.handleChange}
                    />
                    </>
        }
        {!filtersVisible && filters.length > 0 &&
        <><ThemeProvider theme={theme}>
              {filters.filter(dd => dd != null).map(d=>(
                   <Chip label={d.label} onDelete={()=>this.handleDelete(d.value)} className="filter-chip" color={d.value == 'open_now' ? "primary" : "secondary"} />
              ))}
              </ThemeProvider>
                    </>
        }
        </div>
        <ThemeProvider theme={theme}>
        <div className="container-fluid m-0 pl-lg-0 pt-1 pb-1 pr-lg-5 d-none">
            <div className="row">
                <div className="col">
                    <h5 className="text-right fw-light fst-italic num-results"><Chip color="primary" icon={<ListIcon />} label={`${filteredListings.length} Results`}/></h5>

                </div>
            </div>
        </div>
        <Divider className="mb-4 mt-2"/>
        </ThemeProvider>
			<div id="scrolling-container" className="container-fluid p-lg-0 pr-lg-5 m-lg-0">
				{/* <div className={map_expanded ? "row justify-content-between pl-0 ml-0 listing-wrapper-cond" : "row justify-content-between pl-0 ml-0"}> */}
                {loadingListings ?
                <div className="listing-load"> <Spinner animation="grow" /></div>
            : (filteredListings.length > 0) ?
                <InfiniteScroll
          dataLength={listings.length}
          id="listings-wrapper"
          next={this.fetchMoreData}
          ref={this.listingContainer}
          hasMore={morePages}
          className={map_expanded ? "row justify-content-between pl-0 ml-0 mr-0 listing-wrapper-cond" : "row justify-content-between pl-0 mr-0 ml-0"}
          loader={ <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            open={true}

            message="Loading..."
            key="bottomcenter"
          />}
          endMessage={<Alert severity="info" className="w-100 m-5">No More Results...</Alert>



          }
        >
            {listings.filter(list=>{
                let matches = true;
                if(filters.length < 1) return true;
                for (const fi of filters) {
                    let f = fi.value
                    console.log(f)

                    if (f == 'delivery'){
                        matches = (list.type == 'delivery') ? true : false;

                        if(!matches){
                            return false;
                        }
                    } else if (f == 'medical'){
                        matches = (list.license_type == 'hybrid' || list.license_type == 'medical') ? true : false;
                        if(!matches){return false;}

                    } else if (f == 'is_recreational'){
                        matches = (list.license_type == 'hybrid' || list.is_recreational == true) ? true : false;
                        if(!matches){return false;}
                    }
                    else {
                        matches = (list[f] == true);
                        if(!matches){return false;}
                    }

                }
                return true
            }).map(l=>(
            <DispListing data={l} ex={extradata}/>
            ))}


          </InfiniteScroll>
          : <EmptyState
                header="No Listings Found..."
                description={`There Are No Results For Your Current Search ${(filters.length > 0) ? `With The Chosen Filters.` : `Try To Broaden Your Search.`} `}
                imageUrl="/images/search_empty.png"
                primaryAction={(filters.length > 0 ) ? <Button variant="contained" onClick={()=>this.clearFilters()}>Clear Filters</Button> : <Button variant="contained">Back To Search</Button>}


           />
        }

				</div>
			{/* </div> */}



		</div>
        {/* </ResizePanel> */}
        {/* {!map_expanded &&
		<div className="col-1"></div>
        } */}
		{/* <div className="col m-0 p-0 d-none d-lg-block" style={{position:"relative"}}> */}
        {!isMobile &&
		<div className="col flex-fill m-0 p-0 d-block d-lg-inline-block order-1 order-lg-2" id="map-col" style={{display:"inline-block",height: `calc(100vh - ${document.querySelector('#header-wrap').offsetHeight}px)`, top:`${document.querySelector('#header-wrap').offsetHeight}px`}}>

            {/* { loadingListings ? <div id="map"> <Spinner animation="grow" /></div> : <Map geojson={geojson} center={center} bounds={bounds} handleMapUpdate={this.handleMapUpdate} listings={filteredListings} toggleExpandMap={this.toggleExpandMap}/>} */}
            <Map geojson={geojson} mapLoading={loadingMap} center={center} bounds={bounds} handleMapUpdate={this.handleMapUpdate} listings={filteredListings} toggleExpandMap={this.toggleExpandMap}/>
		</div>
        }
        </div>
	</div>

</div>

    </>)

            }
  }
}

export default withStore(Listing);
