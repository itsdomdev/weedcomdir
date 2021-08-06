import React, { createRef, useRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import history from '../history';
import { ScrollTop } from 'primereact/scrolltop';
import PropTypes from 'prop-types';
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import Container from 'react-bootstrap/Container';
import ListIcon from '@material-ui/icons/List';
import { Chip, IconButton, Tooltip, Button } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import { render } from '@testing-library/react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import { ScrollPanel } from 'primereact/scrollpanel';

// import { BackTop } from 'antd';
import ExploreIcon from '@material-ui/icons/Explore';
import { geocodeByAddress } from 'react-google-places-autocomplete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import 'antd/dist/antd.css';
import { green } from '@material-ui/core/colors';
import purple from '@material-ui/core/colors/purple';
import EmptyState from '@atlaskit/empty-state';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStore } from '../util/datastore'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Spinner } from "react-bootstrap-v5";
import ListingMap from '../Components/ListingMap';
import Map from '../Components/ListMap';
import Header from '../Components/Header';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import DispListing from '../Components/DispListing';
import ListingBlock from '../Components/ListingBlock';
import { getListings, updateListings } from '../util/apilink';
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
import { Helmet } from "react-helmet";
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { isMobile } from "react-device-detect";
import ResizePanel from "react-resize-panel";
import useResizeAware from 'react-resize-aware';
import 'primereact/resources/primereact.min.css';

const ListingCol = (props) => {
    const [showCities, setShowCities] = useState(false);
    const [showMap, setShowMap] = useState(true);
    const {
        listings,
        loading,
        filtersVisible,
        map_expanded,
        filters,
        loadingListings,
        nearbyListings,
        center,
        hasListings,
        extradata,
        listing_type,
        city,
        related_cities,
        path,
        state,
        loadingMap,
        bounds,
        morePages,
        filteredListings,
        level,
        geojson
    } = props.state;

    const toggleMap = () => {
        try{
        document.querySelector('.ResizePanel-module_ContainerVertical__1_kb6.hide').classList.remove('hide')
        }
        catch(e){
            document.querySelector('.ResizePanel-module_ContainerVertical__1_kb6').classList.add('hide')
        }
        setShowMap(!showMap)
    }
    const handleGetMore = () => {
        console.log('handleGetMore')
        props.fetchMoreData()
    }

    
    let bcstart = (path == 'delivery') ? 'Delivery Services' : `${path}`;
    return (
        // <div className="listing-col col mt-3 mt-lg-5 col-lg-8 flex-fill">
        <div className="hide-over2 mt-3">
            {/* <div className="listing-col"> */}
            <div className="container-fluid">
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


                            {/* <Panel header={listing_type == 'city' ? "Nearby Cities" : `Top Cities in ${extradata.state_code.toUpperCase()}` } toggleable>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</Panel> */}
 {/* <IconButton id="hide-map-btn" onClick={toggleMap}>
          {!showMap ? <ExploreIcon fontSize="large" /> : <ExploreOffIcon fontSize="large" />}
</IconButton> */}
{/* <Button id="hide-map-btn" variant="contained" color="primary" onClick={()=>setShowCities(!showCities)}>Hide Map</Button> */}
<Button id="nearby-city-btn" variant="outlined" onClick={()=>setShowCities(!showCities)}>View Nearby Cities</Button>
<div id="nearby-city-dropdown" className={showCities ? 'expanded' : ''}>
<div className="row">
                                <div className="col">
                                    <h4>{listing_type == 'city' ? "Nearby Cities" : `Top Cities in ${extradata.state_code.toUpperCase()}` }</h4>
                                    <div className="city-wrap">
                                        {related_cities.map(c=>(
                                            <Link className="text-dark mt-2" to={`/${path}/${extradata.state_code}/${c.replace(/\s/g, '-')}`}>{c}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
</div>

            <div id="filters" className="align-items-center mt-3" >
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color={filtersVisible ? "primary" : "default"}
                        className={filtersVisible ? "mr-2 show-filter-btn active" : "mr-2 show-filter-btn"}
                        disableElevation
                        onClick={() => props.toggleShowFilter()}
                        startIcon={filtersVisible ? <DoneIcon /> : <FilterListIcon />}
                    >
                        {!filtersVisible ? <span>Filter</span> : <span>Done</span>}
                    </Button>
                    <Button id="hide-map-btn" variant="contained" size="small" disableElevation onClick={toggleMap}>{showMap? 'Hide Map' : 'Show Map'}</Button>
                </ThemeProvider>
                {filtersVisible &&
                    <>

                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            defaultValue={filters}
                            className="filter-select mw-50"
                            options={filterOptions}
                            // menuIsOpen={true}
                            styles={colourStyles}
                            onChange={props.handleChange}
                        />
                    </>
                }
                {!filtersVisible && filters.length > 0 &&
                    <><ThemeProvider theme={theme}>
                        {filters.filter(dd => dd != null).map(d => (
                            <Chip label={d.label} onDelete={() => props.handleDelete(d.value)} className="filter-chip" color={d.value == 'open_now' ? "primary" : "secondary"} />
                        ))}
                    </ThemeProvider>
                    </>
                }
            </div>
            <ThemeProvider theme={theme}>
                <div className="container-fluid m-0 pl-lg-0 pt-1 pb-1 pr-lg-5">
                    <div className="row">
                        <div className="col">
                            <h5 className="text-right fw-light fst-italic num-results"><Chip color="primary" icon={<ListIcon />} label={`${filteredListings.length} Results`} /></h5>

                        </div>
                    </div>
                </div>
                <Divider className="mb-4 mt-2" />
            </ThemeProvider>
            </div>

            <ScrollPanel style={{width: '100%'}} className="custom p-1">

            {loadingListings ?
                    <div className="listing-load"> <Spinner animation="grow" /></div>
                    : (filteredListings.length > 0) ?
                        <InfiniteScroll
                            dataLength={listings.length}
                            id="listings-wrapper"
                            next={handleGetMore}
                            ref={props.listingContainer}
                            hasMore={morePages}
                            height="70vh"
                            style={{ height: "70vh", justifyContent: "space-evenly" }}
                            //   scrollableTarget="#scrolling-container"
                            scrollThreshold={0.9}
                            className="row pl-0 mr-0 ml-0 pb-5"
                            loader={<Alert severity="success" className="w-100 mn-2 mb-5">Loading...</Alert>}
                            //   loader={ <Snackbar
                            //     anchorOrigin={{
                            //         vertical: 'bottom',
                            //         horizontal: 'center',
                            //       }}
                            //     open={true}

                            //     message="Loading..."
                            //     key="bottomcenter"
                            //   />}
                            endMessage={
                                <>
                            <Alert severity="info" className="w-100 mn-2 mb-5" style={{alignSelf: "self-start"}}>No More Results...</Alert>
                            <Container fluid className="mb-5 d-sm-none">
                                <div className="row">
                                <div className="col">
                                    <h6>{listing_type == 'city' ? "Nearby Cities" : `Top Cities in ${extradata.state_code.toUpperCase()}` }</h6>
                                    <div className="city-wrap">
                                        {related_cities.map(c=>(
                                            <Link className="text-dark mt-2" to={`/${path}/${extradata.state_code}/${c.replace(/\s/g, '-')}`}>{c}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            </Container>
                                        </>


                            }
                        >
                            {listings.filter(list => {
                                let matches = true;
                                if (filters.length < 1) return true;
                                for (const fi of filters) {
                                    let f = fi.value
                                    console.log(f)

                                    if (f == 'delivery') {
                                        matches = (list.type == 'delivery') ? true : false;

                                        if (!matches) {
                                            return false;
                                        }
                                    } else if (f == 'medical') {
                                        matches = (list.license_type == 'hybrid' || list.license_type == 'medical') ? true : false;
                                        if (!matches) { return false; }

                                    } else if (f == 'is_recreational') {
                                        matches = (list.license_type == 'hybrid' || list.is_recreational == true) ? true : false;
                                        if (!matches) { return false; }
                                    }
                                    else {
                                        matches = (list[f] == true);
                                        if (!matches) { return false; }
                                    }

                                }
                                return true
                            }).map(l => (
                                <ListingBlock data={l} path={path} ex={extradata} />
                            ))}

<ScrollTop target="parent"/>
                        </InfiniteScroll>
                        : <EmptyState
                            header="No Listings Found..."
                            description={`There Are No Results For Your Current Search ${(filters.length > 0) ? `With The Chosen Filters.` : `Try To Broaden Your Search.`} `}
                            imageUrl="/images/search_empty.png"
                            primaryAction={(filters.length > 0) ? <Button variant="contained" onClick={() => props.clearFilters()}>Clear Filters</Button> : <Button variant="contained">Back To Search</Button>}


                        />
                }
                                        <ScrollPanel>
                                            <h3>Nearby Listings </h3>
                                            {nearbyListings.listings.map(l => (
                                                <ListingBlock data={l} path={path} ex={extradata} />
                                            ))}
                                            </ScrollPanel>
                                            
            </ScrollPanel>

            <div id="scrolling-container" className="d-none container-fluid p-lg-0 pr-lg-5 m-lg-0">
                {/* <div className={map_expanded ? "row justify-content-between pl-0 ml-0 listing-wrapper-cond" : "row justify-content-between pl-0 ml-0"}> */}
                {loadingListings ?
                    <div className="listing-load"> <Spinner animation="grow" /></div>
                    : (filteredListings.length > 0) ?
                        <InfiniteScroll
                            dataLength={listings.length}
                            id="listings-wrapper"
                            next={handleGetMore}
                            ref={props.listingContainer}
                            hasMore={morePages}
                            height="70vh"
                            style={{ height: "70vh", alignContent: "start" }}
                            //   scrollableTarget="#scrolling-container"
                            scrollThreshold={0.9}
                            className="row justify-content-between pl-0 mr-0 ml-0 pb-5"
                            loader={<Alert severity="success" className="w-100 mn-2 mb-5">Loading...</Alert>}
                            //   loader={ <Snackbar
                            //     anchorOrigin={{
                            //         vertical: 'bottom',
                            //         horizontal: 'center',
                            //       }}
                            //     open={true}

                            //     message="Loading..."
                            //     key="bottomcenter"
                            //   />}
                            endMessage={
                                <>
                            <Alert severity="info" className="w-100 mn-2 mb-5">No More Results...</Alert>
                            <Container fluid className="mb-5 d-sm-none">
                                <div className="row">
                                <div className="col">
                                    <h6>{listing_type == 'city' ? "Nearby Cities" : `Top Cities in ${extradata.state_code.toUpperCase()}` }</h6>
                                    <div className="city-wrap">
                                        {related_cities.map(c=>(
                                            <Link className="text-light mt-2" to={`/${path}/${extradata.state_code}/${c.replace(/\s/g, '-')}`}>{c}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            </Container>
                                        </>


                            }
                        >
                            {listings.filter(list => {
                                let matches = true;
                                if (filters.length < 1) return true;
                                for (const fi of filters) {
                                    let f = fi.value
                                    console.log(f)

                                    if (f == 'delivery') {
                                        matches = (list.type == 'delivery') ? true : false;

                                        if (!matches) {
                                            return false;
                                        }
                                    } else if (f == 'medical') {
                                        matches = (list.license_type == 'hybrid' || list.license_type == 'medical') ? true : false;
                                        if (!matches) { return false; }

                                    } else if (f == 'is_recreational') {
                                        matches = (list.license_type == 'hybrid' || list.is_recreational == true) ? true : false;
                                        if (!matches) { return false; }
                                    }
                                    else {
                                        matches = (list[f] == true);
                                        if (!matches) { return false; }
                                    }

                                }
                                return true
                            }).map(l => (
                                <ListingBlock data={l} path={path} ex={extradata} />
                            ))}


                        </InfiniteScroll>
                        : <EmptyState
                            header="No Listings Found..."
                            description={`There Are No Results For Your Current Search ${(filters.length > 0) ? `With The Chosen Filters.` : `Try To Broaden Your Search.`} `}
                            imageUrl="/images/search_empty.png"
                            primaryAction={(filters.length > 0) ? <Button variant="contained" onClick={() => props.clearFilters()}>Clear Filters</Button> : <Button variant="contained">Back To Search</Button>}


                        />
                }

            </div>
            {/* </div> */}



        </div>

    )
}

const MapCol = (props) => {
    const [resizeListener, sizes] = useResizeAware();
    const [height, setHeight] = useState();
    console.log(props)
    React.useEffect(() => {
        console.log('Do something with the new size values');
        console.log(`height: ${sizes.height}`)
        console.log(window.map)

        if (height && window.map && sizes.height != height) {
            window.map.resize()
        }
        if (sizes.height != null) {
            setHeight(sizes.height)
        }
    }, [sizes.width, sizes.height]);
    return (
        <div id="map-col">
            {resizeListener}
            {/* { loadingListings ? <div id="map"> <Spinner animation="grow" /></div> : <Map geojson={geojson} center={center} bounds={bounds} handleMapUpdate={this.handleMapUpdate} listings={filteredListings} toggleExpandMap={this.toggleExpandMap}/>} */}
            <Map geojson={props.geojson} mapLoading={props.loadingMap} center={props.center} bounds={props.bounds} handleMapUpdate={props.handleMapUpdate} listings={props.filteredListings} toggleExpandMap={props.toggleExpandMap} />
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
    control: styles => ({ ...styles, backgroundColor: '#EDEEED', width: "100%", border: "none", fontFamily: `"Maven Pro", sans-serif !important` }),
    multiValue: (styles, { data }) => ({ ...styles, backgroundColor: "#8460a8", color: "#fff", borderRadius: "5px" }),
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: "#fff",
    }),
    menu: base => ({ ...base, zIndex:999 }),

    placeholder: styles => ({ ...styles, color: "#495057" }),

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
    left: 0
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
    constructor(props) {
        super(props);
        console.log(props)
        this.listingContainer = React.createRef();
        this.state = {
            loading: true,
            listings: [],
            nearbyListings:[],
            listing_type: props.level,
            extradata: '',
            pins: [],
            city: props.city,
            // path: window.location.pathname.split('/')[1],
            path: window.location.pathname.indexOf('delivery') > -1 ? 'delivery' : 'dispensaries',
            state: props.state,
            filteredListings: [],
            loadingListings: true,
            related_cities: [],
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
    componentWillUnmount() {
        console.log('componentWillUnmount')
        // window.removeEventListener('mousemove', () => {})
        this.props.store.updateSearchData({})
      }
    componentDidMount() {
        console.log('component mounted Listing')
        console.log(this)
        // document.querySelector('#scroll-container').addEventListener('scroll',this.handleScroll)
        let urlq = window.location.search
        console.log(urlq.length)
        if (urlq.length < 1) {
            let p = window.location.pathname.split('/'), city, state_code, add
            p.shift()
            if (p.length == 4) {
                city = p[3]
                state_code = p[2]
                add = `${city}, ${state_code}, USA`
            }
            else if (p.length == 3) {
                // city = path[3]
                state_code = p[2]
                add = `${state_code}, USA`
            }
            geocodeByAddress(add)
                .then(res => {
                    console.log(res)
                    window.location.search = `?lat=${res[0].geometry.location.lat()}&lng=${res[0].geometry.location.lng()}`
                    this.handleGetListings()
                })
        }
        else {
            this.handleGetListings()
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('component updated Listing')
        console.log(prevProps)
        console.log(prevState)
        if(prevProps.city != this.props.city){
           console.log('changed props')
           let urlq = window.location.search
        console.log(urlq.length)
        if (urlq.length < 1) {
            let p = window.location.pathname.split('/'), city, state_code, add
            p.shift()
            if (p.length == 4) {
                city = p[3]
                state_code = p[2]
                add = `${city}, ${state_code}, USA`
            }
            else if (p.length == 3) {
                // city = path[3]
                state_code = p[2]
                add = `${state_code}, USA`
            }
            geocodeByAddress(add)
                .then(res => {
                    console.log(res)
                    window.location.search = `?lat=${res[0].geometry.location.lat()}&lng=${res[0].geometry.location.lng()}`
                    this.handleGetListings()
                })
        }
        else {
            this.handleGetListings()
        }
        }
        // console.log(snapshot)
    }
    handleGetListings = () => {
        console.log('handleGetListings')
        console.log(window.map)
        // console.log(window.map.getCenter())
        let p = window.location.pathname.split('/'), city, state_code
        p.shift()
        if (p.length == 4) {
            city = p[3]
            state_code = p[2]
        }
        else if (p.length == 3) {
            // city = path[3]
            state_code = p[2]
        }

        let queryStrings = window.location.search.split('?')[1].split('&')
        console.log(queryStrings.length)
        let bounds;
        if (window.map) {
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
            "state_code": state_code,
            "city": city,
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
            .then(res => {
                console.log(res)
                if (res.has_listings) {
                    this.setState({
                        loading: false,
                        loadingListings: false,
                        listings: res.listings,
                        extradata: res.data,
                        pins: res.pins,
                        city: res.city,
                        state: res.state,
                        curpage: res.curpage,
                        geojson: res.geojson,
                        bounds: res.bounds,
                        nearbyListings: res.nearbyListings,
                        loadingMap: false,
                        hasListings: res.has_listings,
                        related_cities: res.city_list,
                        center: res.center,
                        morePages: res.morePages,
                        filteredListings: this.filterListings(res.listings)

                    })
                } else {
                    this.setState({
                        hasListings: res.has_listings,
                        loading: false
                    })
                }
            })
    }

    handleMapUpdate = (map) => {
        // this.setState({loading: true})
        return new Promise(resolve => {


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
                .then(res => {
                    console.log(res);
                    if (res.has_listings) {
                        this.setState({
                            listings: res.listings,
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
                            listings: res.listings,
                            geojson: res.geojson,
                            center: center,
                            apiData: data,
                            filteredListings: this.filterListings(res.listings)
                            // loading:false
                        })
                    }
                    else {
                        this.setState({ hasListings: res.has_listings })
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
        }, () => {
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
            "city": city,
            "lat": center.lat,
            "lng": center.lon,
            "pg": curpage + 1,
            "path": this.state.path,
            "filters": this.state.filters
        }

        getListings(data)
            .then(res => {
                console.log(res)
                if (res.has_listings) {
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
                    this.setState({ hasListings: res.has_listings })
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
            loading: true
        }, this.handleGetListings)
    }
    handleDelete = (e) => {
        console.log(e)
        // console.log(e.currentTarget.getAttribute('data-value'))
        // console.info('You clicked the delete icon.');
        const {
            filters
        } = this.state

        if (filters.map(f => f.value).indexOf(e) > -1) {
            filters.splice(filters.map(f => f.value).indexOf(e), 1)
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
        }, this.handleGetListings)

    };
    handleChange = (e) => {
        const { listings } = this.state


        console.log(e)
        if (e.length > 0) {
            this.props.store.updateFilters(e)
        }
        let filters = e;
        let filt = listings.filter(list => {
            let matches = true;
            if (filters.length < 1) return true;
            for (const fi of filters) {
                let f = fi.value
                console.log(f)

                if (f == 'delivery') {
                    matches = (list.type == 'delivery') ? true : false;

                    if (!matches) {
                        return false;
                    }
                } else if (f == 'medical') {
                    matches = (list.license_type == 'hybrid' || list.license_type == 'medical') ? true : false;
                    if (!matches) { return false; }

                } else if (f == 'is_recreational') {
                    matches = (list.license_type == 'hybrid' || list.is_recreational == true) ? true : false;
                    if (!matches) { return false; }
                }
                else {
                    matches = (list[f] == true);
                    if (!matches) { return false; }
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
        }, this.handleGetListings)


    }
    filterListings = (l) => {
        const { listings, filters } = this.state
        let thelistings = (l) ? l : listings
        let filt = thelistings.filter(list => {
            let matches = true;
            if (filters.length < 1) return true;
            for (const fi of filters) {
                let f = fi.value
                console.log(f)

                if (f == 'delivery') {
                    matches = (list.type == 'delivery') ? true : false;

                    if (!matches) {
                        return false;
                    }
                } else if (f == 'medical') {
                    matches = (list.license_type == 'hybrid' || list.license_type == 'medical') ? true : false;
                    if (!matches) { return false; }

                } else if (f == 'is_recreational') {
                    matches = (list.license_type == 'hybrid' || list.is_recreational == true) ? true : false;
                    if (!matches) { return false; }
                }
                else {
                    matches = (list[f] == true);
                    if (!matches) { return false; }
                }

            }
            return true
        })

        console.log(thelistings.length)
        console.log(filt.length)
        if (l) {
            return filt
        }
        else {
            this.setState({
                filteredListings: filt
            })
        }


    }
    handleAddFilter = (filt) => {
        const { filters } = this.state;
        const fmap = {
            open_now: { value: 'open_now', label: 'Open Now' },
            delivery: { value: 'delivery', label: 'Delivery' },
            recreational: { value: 'recreational', label: 'Recreational' },
            medical: { value: 'medical', label: 'Medical' },
        }
        if (filters.map(f => f.value).indexOf(filt) > -1) {
            filters.splice(filters.map(f => f.value).indexOf(filt), 1)

        }
        else {
            filters.push(fmap[filt])
        }

        console.log(filters)
        this.setState({ filters: filters })
        // console.info('You clicked the delete icon.');
    };
    handleScroll = (e) => {
        // console.log(e)
        // console.log(e.currentTarget)
        let top = document.querySelector('#scrolling-container').getBoundingClientRect().top;
        if (top < 0) {

        }
        // console.log(document.querySelector('#scrolling-container').getBoundingClientRect().top)
    }
    toggleShowFilter = () => {
        const { filters, filtersVisible } = this.state
        let allfilters = filters
        console.log(`filters ${filtersVisible}`)
        if (allfilters.length > 0 && this.state.filtersVisible) {
            this.props.store.updateFilters(allfilters)
            this.setState({
                filtersVisible: !this.state.filtersVisible,
                loadingListings: true
            }, this.handleGetListings)
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

        let disps = listings.map(l => {
            return (<DispListing data={l} ex={extradata} />)
        })

        console.log(disps);
        return disps
    }

    render() {
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
            listing_type,
            state,
            loadingMap,
            bounds,
            morePages,
            filteredListings,
            related_cities,
            nearbyListings,
            level,
            geojson
        } = this.state;

        console.log('state')
        console.log(this.state)
        console.log('/state')
        // alert(path)
        console.log(`isMobile: ${isMobile}`)
        console.log(path)
        console.log(path != 'dispensaries')
        console.log(path === 'dispensaries')
        let bcstart = (path == 'delivery') ? 'Delivery Services' : `${path}`;
        if (loading || loadingMap) {
            return (<div className="container" style={{ minHeight: "90vh" }}>
                <div id="loading">
                    <Spinner animation="grow" />
                </div>
            </div>
            )
        }
        else if (hasListings == false) {
            return (
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
                                        onClick={() => this.toggleShowFilter()}
                                        startIcon={filtersVisible ? <DoneIcon /> : <FilterListIcon />}
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
                                        {filters.filter(dd => dd != null).map(d => (
                                            <Chip label={d.label} onDelete={() => this.handleDelete(d.value)} className="filter-chip" color={d.value == 'open_now' ? "primary" : "secondary"} />
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
                                primaryAction={(filters.length > 0) ? <Button variant="contained" onClick={() => this.clearFilters()}>Clear Filters</Button> : <Button variant="contained" onClick={()=> {history.push(`/${path}`); history.go();}}>Back To Search</Button>}


                            />
                        </div>
                    </div>
                </div>

            )
        }
        else {
            return (
                <>

                    <div className={"container-max-map " + level} key={level}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Cannabis {(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in {(city) ? ` ${city}, ${extradata.state}` : ` ${state}`} | Weed.com</title>
                            <meta property="og:site_name" content="Weed.com" />
                            <meta property="og:type" content="website" />
                            <meta property="og:url" content={`${window.location.href}`} />
                            <meta property="og:image" content="https://3d1o2p3n180u4am5sr3ske9v-wpengine.netdna-ssl.com/wp-content/uploads/2021/03/featured-delta-8.jpg" />
                            <meta property="og:title" content={`Cannabis ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? ` ${city}, ${extradata.state}` : ` ${state}`} | Weed.com`} />
                            <meta property="twitter:title" content={`Cannabis ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? ` ${city}, ${extradata.state}` : ` ${state}`} | Weed.com`} />
                            <meta property="og:description" content={`A directory of recreational and medical marijuana ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? `${city}, ${extradata.state}` : extradata.state}`} />
                            <meta name="description" property="og:description" content={`A directory of recreational and medical marijuana ${(path == 'delivery') ? "Delivery Services" : "Dispensaries"} in ${(city) ? `${city}, ${extradata.state}` : extradata.state}`} />
                            <link rel="canonical" href={`${window.location.href}`} />
                        </Helmet>
                        <div className="row max-100vh" style={{ height: `calc(100vh - ${document.querySelector('#header-wrap').offsetHeight}px)` }} onScroll={this.handleScroll}>
                            <div className="resize-container w-100">

                                {!isMobile &&
                                    <Splitter style={{ height: '90vh' }} gutterSize={7} onResizeEnd={() => window.map.resize()}>
                                        <SplitterPanel size={70}>
                                            <ListingCol
                                                state={this.state}
                                                toggleShowFilter={this.toggleShowFilter}
                                                handleDelete={this.handleDelete}
                                                fetchMoreData={this.fetchMoreData}
                                                clearFilters={this.clearFilters}
                                                handleChange={this.handleChange}
                                            />
                                            
                                        </SplitterPanel>
                                        <SplitterPanel size={30} style={{backgroundColor:"#C3C7CC"}}>
                                            <Map geojson={geojson} mapLoading={loadingMap} center={center} bounds={bounds} handleMapUpdate={this.handleMapUpdate} listings={filteredListings} toggleExpandMap={this.toggleExpandMap} />
                                        </SplitterPanel>
                                    </Splitter>
                                }
                                {isMobile &&
                                    <>
                                        {/* <ResizePanel direction="s" style={{ height: "30vh" }}> */}
                                        <ResizePanel direction="s" className="map-resize">
                                            <MapCol geojson={geojson} loadingMap={loadingMap} center={center} bounds={bounds} handleMapUpdate={this.handleMapUpdate} filteredListings={filteredListings} toggleExpandMap={this.toggleExpandMap} />
                                        </ResizePanel>
                                        <ListingCol
                                            state={this.state}
                                            toggleShowFilter={this.toggleShowFilter}
                                            handleDelete={this.handleDelete}
                                            fetchMoreData={this.fetchMoreData}
                                            clearFilters={this.clearFilters}
                                            handleChange={this.handleChange}
                                        />


                                    </>
                                }


                            </div>
                        </div>




                    </div>
                    <div className="container-fluid px-0 py-4 nearby_cities_container pb-lg-5 d-none" style={{color:"#fff", backgroundColor:"#3c4242"}}>
                        <Container>
                    <Accordion square elevation={0} className="py-3" style={{color:"#fff", backgroundColor:"#3c4242"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:"#ffffff"}} />}
          aria-controls="panel1a-content"
          style={{borderBottom: "5px solid #8561C5 !important"}}
          id="panel1a-header"
        >
          {/* <div className="container-fluid px-5"> */}
          {/* <Container> */}
          <div className="row">
                            <div className="col">
                                <h1 className="mb-3">{listing_type == 'city' ? "Nearby Cities" : `Top Cities in ${extradata.state_code.toUpperCase()}` }</h1>
                                </div>
                                </div>
          {/* </div> */}
          {/* </Container> */}
        </AccordionSummary>
        <AccordionDetails>

          <div className="container-fluid px-1 px-lg-5 py-3">
          <div className="row">
                                <div className="col">
                                    <div className="city-wrap">
                                        {related_cities.map(c=>(
                                            <Link className="text-light mt-2" to={`/${path}/${extradata.state_code}/${c.replace(/\s/g, '-')}`}>{c}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      </Container>
                                {/* <section className="p-5 pt-0">
                            <div className="row">
                            <div className="col">
                                <h1 className="mb-3">{listing_type == 'city' ? "Nearby Cities" : `Top Cities in ${extradata.state_code}` }</h1>
                                </div>
                                </div>
                            <div className="row">
                                <div className="col">
                                    <div className="city-wrap">
                                        {related_cities.map(c=>(
                                            <Link className="text-dark mt-2" to={`/${path}/${extradata.state_code}/${c.replace(/\s/g, '-')}`}>{c}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            </section>
                        // </div> */

                        }
                        <Divider className="mb-3"/>
                        </div>
                </>)

        }
    }
}

export default withStore(Listing);
