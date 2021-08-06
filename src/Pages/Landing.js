import React from 'react';
import PropTypes from 'prop-types';
// import cn from 'classnames';
import { green } from '@material-ui/core/colors';
import purple from '@material-ui/core/colors/purple';
import  { withStore } from '../util/datastore'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { toJS } from 'mobx'
import { TabMenu } from 'primereact/tabmenu';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Header from '../Components/Header';
// import {FilterListIcon, AddCircleIcon}  from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import { render } from '@testing-library/react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { isMobile } from "react-device-detect";
import USAMap from "react-usa-map";
import {Spinner} from "react-bootstrap-v5";
import GoogleAuto from '../Components/GoogleAuto';
import history from '../history';
import Select from 'react-select';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Link, useParams} from "react-router-dom";
import makeAnimated from 'react-select/animated';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import {Chip,IconButton, Tooltip, Button, Popper} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
// import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import {getTopCities} from '../util/apilink';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import DoneIcon from '@material-ui/icons/Done';
import {Helmet} from "react-helmet";
import GoogleMaps from '../Components/GoogleMaps'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../landingstyle.css';
// import { isMobileDevice } from 'react-select/src/utils';
import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';
// const mypurple = purple.A400;

const stateLinks = [{label: "Alabama", link: "https://weed.com/articles/is-weed-delivery-legal-in-my-state/"},{label: "Alaska", link: "https://weed.com/articles/is-weed-legal-in-my-stated"},{label: "Arizona", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-arizona/"},{label: "Arkansas", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Colorado", link: "https://weed.com/articles/weed-delivery-in-denver/"},{label: "Connecticut", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Delaware", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "District of Columbia", link: "https://weed.com/articles/using-marijuana-for-anxiety/"},{label: "Florida", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-florida/"},{label: "Georgia", link: "https://weed.com/articles/quit-smoking-with-cbd/"},{label: "Hawaii", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Idaho", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Illinois", link: "https://weed.com/articles/buy-cbd-oil-hemp-flower-near-you/"},{label: "Indiana", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-indiana/"},{label: "Iowa", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Kansas", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Kentucky", link: "https://weed.com/articles/can-marijuana-cure-cancer/"},{label: "Louisiana", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Maine", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Maryland", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Massachusetts", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Michigan", link: "https://weed.com/articles/what-is-thc-2/"},{label: "Minnesota", link: "https://weed.com/articles/does-cbd-help-pain/"},{label: "Mississippi", link: "https://weed.com/articles/what-is-thc-2/"},{label: "Missouri", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Montana", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Nebraska", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Nevada", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "New Hampshire", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "New Jersey", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-new-jersey/"},{label: "California", link: "/dispensaries/ca"},{label: "New Mexico", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "New York", link: "https://weed.com/articles/is-weed-delivery-legal-in-my-state/"},{label: "North Carolina", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-north-carolina/"},{label: "North Dakota", link: "https://weed.com/articles/is-weed-delivery-legal-in-my-state/"},{label: "Ohio", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Oklahoma", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Oregon", link: "https://weed.com/articles/weed-delivery-in-portland-oregon/"},{label: "Pennsylvania", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Rhode Island", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "South Carolina", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "South Dakota", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Tennessee", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-tennessee/"},{label: "Texas", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-texas/"},{label: "Utah", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Vermont", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Virginia", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Washington", link: "https://weed.com/articles/where-to-buy-cbd-flower-in-washington/"},{label: "West Virginia", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Wisconsin", link: "https://weed.com/articles/is-weed-legal-in-my-state/"},{label: "Wyoming", link: "https://weed.com/articles/is-weed-legal-in-my-state/"}]

const stateSelect = [{value: "AL", label: "Alabama"},{value: "AK", label: "Alaska"},{value: "AZ", label: "Arizona"},{value: "AR", label: "Arkansas"},{value: "CA", label: "California"},{value: "CO", label: "Colorado"},{value: "CT", label: "Connecticut"},{value: "DE", label: "Delaware"},{value: "DC", label: "District of Columbia"},{value: "FL", label: "Florida"},{value: "GA", label: "Georgia"},{value: "HI", label: "Hawaii"},{value: "ID", label: "Idaho"},{value: "IL", label: "Illinois"},{value: "IN", label: "Indiana"},{value: "IA", label: "Iowa"},{value: "KS", label: "Kansas"},{value: "KY", label: "Kentucky"},{value: "LA", label: "Louisiana"},{value: "ME", label: "Maine"},{value: "MD", label: "Maryland"},{value: "MA", label: "Massachusetts"},{value: "MI", label: "Michigan"},{value: "MN", label: "Minnesota"},{value: "MS", label: "Mississippi"},{value: "MO", label: "Missouri"},{value: "MT", label: "Montana"},{value: "NE", label: "Nebraska"},{value: "NV", label: "Nevada"},{value: "NH", label: "New Hampshire"},{value: "NJ", label: "New Jersey"},{value: "NM", label: "New Mexico"},{value: "NY", label: "New York"},{value: "NC", label: "North Carolina"},{value: "ND", label: "North Dakota"},{value: "OH", label: "Ohio"},{value: "OK", label: "Oklahoma"},{value: "OR", label: "Oregon"},{value: "PA", label: "Pennsylvania"},{value: "RI", label: "Rhode Island"},{value: "SC", label: "South Carolina"},{value: "SD", label: "South Dakota"},{value: "TN", label: "Tennessee"},{value: "TX", label: "Texas"},{value: "UT", label: "Utah"},{value: "VT", label: "Vermont"},{value: "VA", label: "Virginia"},{value: "WA", label: "Washington"},{value: "WV", label: "West Virginia"},{value: "WI", label: "Wisconsin"},{value: "WY", label: "Wyoming"}]

const stateDetails = {
     "AL":"Alabama |;| Status: Fully Illegal |;|   Decriminalized: No",
     "AK":"Alaska |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "AZ":"Arizona |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "AR":"Arkansas |;| Status: Medical Only |;|   Decriminalized: No",
     "CA":"California |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "CO":"Colorado |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "CT":"Connecticut |;| Status: Medical Only |;|   Decriminalized: Yes",
     "DE":"Delaware |;| Status: Medical Only |;|   Decriminalized: Yes",
     "FL":"Florida |;| Status: Medical Only |;|   Decriminalized: No",
     "GA":"Georgia |;| Status: CBD Oil Only |;|   Decriminalized: No",
     "HI":"Hawaii |;| Status: Medical Only |;|   Decriminalized: Yes",
     "ID":"Idaho |;| Status: Fully Illegal |;|   Decriminalized: No",
     "IL":"Illinois |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "IN":"Indiana |;| Status: CBD Oil Only |;|   Decriminalized: No",
     "IA":"Iowa |;| Status: CBD Oil Only |;|   Decriminalized: No",
     "KS":"Kansas |;| Status: Fully Illegal |;|   Decriminalized: No",
     "KY":"Kentucky |;| Status: CBD Oil Only |;|   Decriminalized: No",
     "LA":"Louisiana |;| Status: Medical Only (Not Active) |;|   Decriminalized: No",
     "ME":"Maine |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "MD":"Maryland |;| Status: Medical Only |;|   Decriminalized: Yes",
     "MA":"Massachusetts |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "MI":"Michigan |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "MN":"Minnesota |;| Status: Medical Only |;|   Decriminalized: Yes",
     "MS":"Mississippi |;| Status: Medical Only |;|   Decriminalized: Yes",
     "MO":"Missouri |;| Status: Medical Only |;|   Decriminalized: Yes",
     "MT":"Montana |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "NE":"Nebraska |;| Status: Fully Illegal |;|   Decriminalized: Yes",
     "NV":"Nevada |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "NH":"New Hampshire |;| Status: Medical Only |;|   Decriminalized: Yes",
     "NJ":"New Jersey |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "NM":"New Mexico |;| Status: Medical Only |;|   Decriminalized: Yes",
     "NY":"New York |;| Status: Medical Only |;|   Decriminalized: Yes",
     "NC":"North Carolina |;| Status: Fully Illegal |;|   Decriminalized: Yes",
     "ND":"North Dakota |;| Status: Medical Only |;|   Decriminalized: Yes",
     "OH":"Ohio |;| Status: Medical Only |;|   Decriminalized: Yes",
     "OK":"Oklahoma |;| Status: Medical Only |;|   Decriminalized: No",
     "OR":"Oregon |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "PA":"Pennsylvania |;| Status: Medical Only |;|   Decriminalized: No",
     "RI":"Rhode Island |;| Status: Medical Only |;|   Decriminalized: Yes",
     "SC":"South Carolina |;| Status: Fully Illegal |;|   Decriminalized: No",
     "SD":"South Dakota |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "TN":"Tennessee |;| Status: Fully Illegal |;|   Decriminalized: No",
     "TX":"Texas |;| Status: CBD Oil Only |;|   Decriminalized: No",
     "UT":"Utah |;| Status: Medical Only |;|   Decriminalized: No",
     "VT":"Vermont |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "VA":"Virginia |;| Status: CBD Oil Only |;|   Decriminalized: Yes",
     "WA":"Washington |;| Status: Fully Legal |;|   Decriminalized: Yes",
     "WV":"West Virginia |;| Status: Medical Only |;|   Decriminalized: No",
     "WI":"Wisconsin |;| Status: CBD Oil Only |;|   Decriminalized: No",
     "WY":"Wyoming |;| Status: Fully Illegal |;|   Decriminalized: No",
     "DC":"District of Columbia |;| Status: Fully Legal |;|   Decriminalized: Yes",
     }
const tabItems = [
     {
          label: "Dispensaries",
          template: (item, options) => {
               return (
                   /* custom element */
                   <Link className={options.className} to="/dispensaries">
                       <span className="pi pi-fw pi-home"></span>
                       <span className={options.labelClassName}>{item.label}</span>
                   </Link>
               );
           }
     }, {
          label: "Delivery",
          template: (item, options) => {
               return (
                   /* custom element */
                   <Link className={options.className} to="/delivery">
                       <span className="pi pi-fw pi-home"></span>
                       <span className={options.labelClassName}>{item.label}</span>
                   </Link>
               );
           }

     }
]
const filterOptions = [
     // { value: 'open_now', label: 'Open Now' },
     // { value: 'delivery', label: 'Delivery' },
     { value: 'recreational', label: 'Recreational' },
     { value: 'medical', label: 'Medical' },
     { value: 'has_atm', label: 'ATM On Site' },
     { value: 'accepts_credit_cards', label: 'Accepts Credit Cards' },
     { value: 'has_curbside_pickup', label: 'Curbside Pickup' },
     { value: 'has_handicap_access', label: 'Handicap Access' }
   ]
   const colourStylesLight = {
     control: styles => ({ ...styles, backgroundColor: 'rgba(131, 131, 131, 0.5)', width:"100%", border:"none", fontFamily: `"Maven Pro", sans-serif !important` }),
     // multiValue: (styles, { data }) => ({ ...styles, backgroundColor:"#8460a8", color:"#fff", borderRadius:"5px" }),
     multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: "#fff",
        }),
     //    placeholder: styles => ({ ...styles, color:"#fff" }),
        menu: styles => ({ ...styles, color:"#000", backgroundColor:"#ffffff", zIndex:999999 }),
     //    menuList: styles => ({ ...styles, color:"#fff", backgroundColor:"#343a40", zIndex:999999 }),
        option: (provided, state) => ({
          ...provided,
          // borderBottom: '1px dotted pink',
          backgroundColor: (state.isSelected) ? '#5C5F62' : 'transparent',
          color: (state.isSelected) ? '#fff' : 'transparent',
          color:'#000',
          // padding: 20,
        }),


   }
   const colourStyles = {
     control: styles => ({ ...styles, backgroundColor: 'rgba(131, 131, 131, 0.5)', width:"100%", border:"none", fontFamily: `"Maven Pro", sans-serif !important` }),
     multiValue: (styles, { data }) => ({ ...styles, backgroundColor:"#8460a8", color:"#fff", borderRadius:"5px" }),
     multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: "#fff",
        }),
        placeholder: styles => ({ ...styles, color:"#fff" }),
        menu: styles => ({ ...styles, color:"#fff", backgroundColor:"#343a40", zIndex:999999 }),
        menuList: styles => ({ ...styles, color:"#fff", backgroundColor:"#343a40", zIndex:999999 }),
        option: (provided, state) => ({
          ...provided,
          // borderBottom: '1px dotted pink',
          backgroundColor: (state.isFocused) ? 'rgba(255,255,255,0.25)' : 'transparent',
          color:'#fff',
          // padding: 20,
        }),


   }
//    const accent = purple.A700;
   const theme = createMuiTheme({
     palette: {

       primary: {
            main: "#4caf50",
            contrastText: "#fff",
            dark: "#212121"
       },
       secondary: {
          // Purple and green play nicely together.
          main: "#8561c5",
        },
        default:{
          contrastText: "#fff",
          main: "#212121"
        }
     //   secondary: accent
     },
   });
//    @withStore
class LandingPage extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
        console.log(props.store.filters)
        console.log(toJS(props.store.filters))
        props.store.clearFilters()
        props.store.updateSearchData()

        this.state = {
             filters:props.store.getFilterArray(),
             filtersVisible: false,
             additionalFilters: [],
             keywordSearch: '',
             anchorEl: null,
             // path: window.location.pathname.split('/')[1],
             path: window.location.pathname.indexOf('delivery') > -1 ? 'delivery' : 'dispensaries',
             selectedState: '',
             selectedDetails:[],
             topCities: [],
			loading: true
        }
    }
    didSetLocation = (loc) =>{
         const{ path} =this.state;
		console.log(loc)
		geocodeByPlaceId((loc.value)? loc.value.place_id : loc.place_id)
		.then(res=>{
			console.log(res)
               this.props.store.clearMapData()
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
				link = `${window.location.pathname}/${state}`
				console.log(link)
	   		} else {
				city = city[0].long_name.toLowerCase().replace(/\s/g, '-');
				link = `${window.location.pathname}/${state}/${city}`
				console.log(link);

	   		}
                  this.props.store.updateSearchData({
                       city: city,
                       state: state,
                       keyword: this.state.keywordSearch,
                       formatted: loc.label
                  })
			   var paramsString = `lat=${geo.lat}&lng=${geo.lng}`;
               var queryParams = new URLSearchParams(paramsString);
               history.push( link + "?" + queryParams.toString())
               history.go()
		})

		// if(loc.value.)
		// let link = `dispensaries/${loc.t}
	}
     handleKeywordChange = (e) =>{
          console.log(e.currentTarget.value)
          this.setState({
               keywordSearch: e.currentTarget.value
          })
     }
     handleDelete = (e) => {
          console.log(e)
          // console.log(e.currentTarget.getAttribute('data-value'))
          // console.info('You clicked the delete icon.');
          const {
               filters,
               additionalFilters
          } = this.state

          if(filters.map(f=>f.value).indexOf(e) > -1) {
               filters.splice(filters.map(f=>f.value).indexOf(e), 1)
          }
          else if(additionalFilters.map(f=>f.value).indexOf(e) > -1){
               additionalFilters.splice(additionalFilters.map(f=>f.value).indexOf(e), 1)
          }

          console.log(filters)
          console.log(additionalFilters)
          this.props.store.updateFilters(filters.concat(additionalFilters))
          this.setState({
               filters: filters,
               additionalFilters: additionalFilters
          })

        };
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

     toggleShowFilter = () => {
          const {filters, additionalFilters} = this.state
          let allfilters = filters.concat(additionalFilters);
          if(allfilters.length > 0){
               this.props.store.updateFilters(allfilters)
          }
          console.log(this.props.store)
          this.setState({
               filtersVisible: !this.state.filtersVisible
          })
        };
        handleChange = (e) => {

             console.log(e)
             this.setState({additionalFilters: e})


        }
     showFilters = () => {
          console.info('You clicked the Chip.');
        };

    statesCustomConfig = () => {
        return {
            "AK":{fill:"#349c48"},
            "NV":{fill:"#349c48"},
            "CO":{fill:"#349c48"},
            "MI":{fill:"#349c48"},
            "VT":{fill:"#349c48"},
            "DC":{fill:"#349c48"},
            "MT":{fill:"#349c48"},
            "WA":{fill:"#349c48"},
            "FL":{fill:"#349c48"},
            "MN":{fill:"#349c48"},
            "RI":{fill:"#349c48"},
          //   "LA":{fill:"#349c48"},
            "OH":{fill:"#349c48"},
            "VA":{fill:"#349c48"},
            "AR":{fill:"#349c48"},
            "MO":{fill:"#349c48"},
            "NY":{fill:"#349c48"},
            "MA":{fill:"#349c48"},
            "AZ":{fill:"#349c48"},
            "IL":{fill:"#349c48"},
            "DC2":{fill:"#349c48"},
            "NJ":{fill:"#349c48"},
            "CA":{fill:"#349c48"},
            "ME":{fill:"#349c48"},
            "OR":{fill:"#349c48"},
            "CT":{fill:"#349c48"},
            "MD":{fill:"#349c48"},
            "ND":{fill:"#349c48"},
            "DE":{fill:"#349c48"},
            "NM":{fill:"#349c48"},
            "PA":{fill:"#349c48"},
            "WV":{fill:"#349c48"},
            "HI":{fill:"#349c48"},
            "NH":{fill:"#349c48"},
            "OK":{fill:"#349c48"},
            "UT":{fill:"#349c48"},
            "AL":{fill: "#8b5eaf"},
"NC":{fill: "#8b5eaf"},
"TN":{fill: "#8b5eaf"},
"GA":{fill: "#8b5eaf"},
"SC":{fill: "#8b5eaf"},
"IN":{fill: "#8b5eaf"},
"IA":{fill: "#8b5eaf"},
"TX":{fill: "#8b5eaf"},
"KS":{fill: "#8b5eaf"},
"WI":{fill: "#8b5eaf"},
"KY":{fill: "#8b5eaf"},
"WY":{fill: "#8b5eaf"},
"SD":{fill: "#8b5eaf"},
"MS":{fill: "#8b5eaf"},
"ID":{fill: "#8b5eaf"},
"LA":{fill: "#8b5eaf"},
"NE":{fill: "#8b5eaf"},
        };
      };
      handleScroll = (event) => {
          // console.log(event)
          // console.log(window.scrollY)
          // document.querySelector('#site-header-landing.top').classList.remove()
      }
      mapHandler = (event) => {
           try{
           console.log(event)
           console.log(event.target)
           console.log(event.target.dataset)
           if(document.querySelector('.state.selected')){
           document.querySelector('.state.selected').classList.remove('selected')
           }
           let name = (event.target.dataset.name == this.state.selectedState) ? '' : event.target.dataset.name;
           name.length > 0 && (event.target.classList.add('selected'))


           this.setState({
                selectedState: name,
                selectedDetails: name.length > 0 ? stateDetails[event.target.dataset.name.toUpperCase()].split('|;|') : []
           })
     //    alert(event.target.dataset.name);
          }
          catch(e){
               console.log(e)
          }
      };
      handleClick = (event) => {

          this.setState({anchorEl: event.currentTarget},this.toggleShowFilter());
        };
      componentDidMount(){
		getTopCities()
		.then(res=>{
			console.log(res)
			this.setState({
				topCities: res.top_cities,
				loading:false
			})
		})
	}
    render(){
         const {filters, path, anchorEl, additionalFilters,filtersVisible, keywordSearch, selectedState, selectedDetails, topCities, loading} = this.state
         console.log(this.props)
         const open = Boolean(anchorEl)
         console.log('open ' + open)
         let activeTab = (path == 'delivery') ? 1 : 0;
     //     window.addEventListener('scroll', this.handleScroll);
     // if (loading) {
     //      return (<div className="container" style={{minHeight:"90vh"}}>
     //            <div id="loading">
     //                <Spinner animation="grow" />
     //            </div>
     //            </div>
     //        )
     // }
     // else {
  return (

    <div id="landing_page" >
        <Header landing_page={true}/>
        <div id ="top-hero">
        <img src="https://storage.googleapis.com/disp_images/appimgs/budimg.png" id="bud-img" className="floating"/>
        <div id="inner-hero">
             <div class="row" style={{width:"100%", marginLeft:0, marginRight:0}}>
        <div className="col col-md-6"
        ></div>
        <div className="col col-md-6">


     { path == 'delivery' ?

    <div className="hero-txt">
         <div className="container-fluid">

         <Helmet>
                <meta charSet="utf-8" />
                <title>Find Weed Delivery Near You, Directory of Weed Delivery Services in Your Area | Weed.com</title>
                <link rel="canonical" href={`${window.location.href}`} />
            </Helmet>
         <h1>Weed Delivery<br className="d-none d-md-block"/>Near You</h1>
         <h3>Search for weed delivery<br/>services in your area</h3>
    </div>

    </div>
    :
    <div className="hero-txt">
         <div className="container-fluid">

         <Helmet>
                <meta charSet="utf-8" />
                <title>Find Cannabis Dispensaries Near You, Directory of Cannabis Dispensaries Services in Your Area | Weed.com</title>
                <link rel="canonical" href={`${window.location.href}`} />
            </Helmet>
         <h1>Cannabis Dispensaries Near You</h1>
         <h3>Search for dispensaries<br/> in your area</h3>
    </div>
    </div>

    }

    <div id="search-wrap" className="container">
         <div id="main-search" className="input-group mb-3 flex-wrap input-group-lg d-none d-lg-flex">
         {/* <div className="card"> */}
               <TabMenu model={tabItems} activeItem={tabItems[activeTab]}/>
               {/* </div> */}
              <div className="inputs-wrap d-md-flex d-none">
                   <input type="text"  onInput={this.handleKeywordChange} value={keywordSearch} placeholder="Search" className="form-control m-0 col-md-6  d-none" />
                   <LocationOnIcon/>
                   <GoogleAuto didSetLocation={this.didSetLocation} className=" col-md-6"/>
                   </div>
                   <button className="btn btn-success d-none" type="button" id="button-addon2">
                        Search
                   </button>
              </div>
              <div id="mobile-main" className="mobile-search d-block d-md-none">
              <TabMenu model={tabItems} activeItem={tabItems[activeTab]}/>
              <GoogleMaps didSetLocation={this.didSetLocation} landing={true}/>

              </div>

              <div id="filters" className="align-items-center" >
              <ThemeProvider theme={theme}>
              <Button
               variant="contained"
               // size="lare"
               color={filtersVisible ? "primary" : "secondary"}
               // {...filtersVisible ? (color="primary") : (color="default")}
               className={filtersVisible ? "mr-lg-2 show-filter-btn active" : "mr-lg-2 show-filter-btn"}
               disableElevation
               onClick={this.handleClick}
               // onClick={()=>this.toggleShowFilter()}
               startIcon={filtersVisible ? <DoneIcon/>:<FilterListIcon /> }
      >
        {!filtersVisible ? <span>Filter</span> : <span>Done</span>}
      </Button>
      </ThemeProvider>

        {filtersVisible &&
        <Popper
        placement="top-start"
        className="filter-popper"
        disablePortal={true}
        open={open}
        style={{width:"100%", zIndex:999,height: "100%", transform:"none"}}
        anchorEl={anchorEl}


      >
        <Paper className="p-4 d-flex flex-wrap bg-dark text-light">
               <div className={filters.map(f=>f.value).indexOf('open_now') > -1 ? "filter-btn green-btn selected" :"filter-btn green-btn"} onClick={()=>this.handleAddFilter('open_now')}>
                        {/* <i className="bi bi-clock-fill"></i> */}
                        <ScheduleIcon className="mr-1"/>
                        Open Now
                   </div>

                   <div className={filters.map(f=>f.value).indexOf('delivery') > -1 ? "filter-btn purp-btn selected" :"filter-btn purp-btn"} onClick={()=>this.handleAddFilter('delivery')}>
                        {/* <i className="bi bi-bag-check-fill"></i> */}
                        <LocalMallIcon className="mr-1"/>
                        Delivery
                   </div>

                    <Select
                         closeMenuOnSelect={false}
                         isMulti
                         className="filter-select mt-3"
                         options={filterOptions}
                         menuPlacement="top"
                         styles={colourStyles}

                         onChange={this.handleChange}
                    />
                    <ThemeProvider theme={theme}>
              <Button
               variant="contained"
               // size="lare"
               color={filtersVisible ? "primary" : "secondary"}
               // {...filtersVisible ? (color="primary") : (color="default")}
               className={filtersVisible ? "mr-lg-2 my-3 show-filter-btn active" : "mr-lg-2 show-filter-btn"}
               disableElevation
               onClick={this.handleClick}
               // onClick={()=>this.toggleShowFilter()}
               startIcon={filtersVisible ? <DoneIcon/>:<FilterListIcon /> }
      >
        {!filtersVisible ? <span>Filter</span> : <span>Done</span>}
      </Button>
      </ThemeProvider>
                    </Paper>
                    </Popper>
        }
        {!filtersVisible && filters.concat(additionalFilters).length > 0 &&
        <><ThemeProvider theme={theme}>
              {filters.concat(additionalFilters).map(d=>(
                   <Chip label={d.label} onDelete={()=>this.handleDelete(d.value)} className="filter-chip" color={d.value == 'open_now' ? "primary" : "secondary"} />
              ))}
              </ThemeProvider>
                    </>
        }


        </div>
              </div>
         </div>
         </div>
    </div>
</div> < div className = "container mt-5 mb-5" > <div className="row">
    <div className="col">
         <h2 className="mb-5">Most Popular Cities</h2>
    </div>
</div>

<div className="row text-center">
     {loading &&
     <>
          { [1,2,3,4].map(d=>(
               <div className="col col-md-3 flex-fill">
               <Skeleton variant="rect" height={300}/>
               </div>
          ))}
          </>
    }
    {!loading &&
           <>
     {topCities.map(cit=>(
          <div className="col col-md-3 flex-fill">

           <div className="city-card">
               <img src={cit.photo} alt=""/>
               <div className="circle-disp">{cit.doc_count}</div>
               <h2 className="text-center mt-3 mb-3">{cit.key}</h2>
               <Link to={`/${path}/ca/${cit.key.toLowerCase().replace(/\s/g, '-')}`} className="stretched-link"/>
          </div>

     </div>
     ))}
    </>
    }

</div>
<div class="row mt-5">
        <div class="col">
          <h2 class="mb-5 mt-5">Browse By State</h2>
        </div>
      </div>
       <div class="row">
            <div class="col-12 state-col  mb-5 row p-0 p-md-auto">
                 {stateLinks.map(s=>(
                    {...s.link.indexOf("http") > -1 ? <a href={s.link} className="state-browse-link col-6 col-md-2 flex-fill">{s.label}</a> : <Link to={s.link} className="state-browse-link col-6 col-md-2 flex-fill">{s.label}</Link> }
                 ))}
                {/* <a class="state-browse-link col-4 col-md-2 flex-fill" href="/delivery/alabama">Alabama</a>
                <a class="state-browse-link col-4 col-md-2 flex-fill " href="/delivery/alaska">Alaska</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/arizona">Arizona</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/arkansas">Arkansas</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/california">California</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/colorado">Colorado</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/connecticut">Connecticut</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/delaware">Delaware</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/florida">Florida</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/georgia">Georgia</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/hawaii">Hawaii</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/idaho">Idaho</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/illinois">Illinois</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/indiana">Indiana</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/iowa">Iowa</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/kansas">Kansas</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/kentucky">Kentucky</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/louisiana">Louisiana</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/maine">Maine</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/maryland">Maryland</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/massachusetts">Massachusetts</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/michigan">Michigan</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/minnesota">Minnesota</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/mississippi">Mississippi</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/missouri">Missouri</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/montana">Montana</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/nebraska">Nebraska</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/nevada">Nevada</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/new-hampshire">New Hampshire</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/new-jersey">New Jersey</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/new-mexico">New Mexico</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/new-york">New York</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/north-carolina">North Carolina</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/north-dakota">North Dakota</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/ohio">Ohio</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/oklahoma">Oklahoma</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/oregon">Oregon</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/pennsylvania">Pennsylvania</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/rhode-island">Rhode Island</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/south-carolina">South Carolina</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/south-dakota">South Dakota</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/tennessee">Tennessee</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/texas">Texas</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/utah">Utah</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/vermont">Vermont</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/virginia">Virginia</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/washington">Washington</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/west-virginia">West Virginia</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/wisconsin">Wisconsin</a>
                <a class="state-browse-link flex-fill col-4 col-md-2" href="/delivery/wyoming">Wyoming</a> */}
            </div>
            <div className="col d-none">
            <Select
          className="basic-single"
          classNamePrefix="select"
          // defaultValue={colourOptions[0]}
          // isDisabled={isDisabled}
          // isLoading={isLoading}
          isClearable={true}
          // isRtl={isRtl}
          isSearchable={true}
          name="State"
          options={stateSelect}
        />

            </div>
            <div class="col-12">
            <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}

      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <section id="map-wrap" className="pb-5 mb-5">
                     <div className="map-legend mb-5 mt-5">
                          <div className="legend-item"><div className="color-block green"></div> THC Legal</div>
                          <div className="legend-item"><div className="color-block purple"></div> Illegal</div>
                          {/* <div className="legend-item"><div className="color-block black"></div>  Illegal</div> */}
                     </div>

        <TransformComponent style={{minHeight:"30vh"}}>


                <USAMap customize={this.statesCustomConfig()}  onClick={this.mapHandler} />
                </TransformComponent>



                </section>
                )}
                </TransformWrapper>

        {selectedState.length > 0 &&
            <Paper elevation={3} className="p-3 mt-3 paper-popup">
                 <h3>{selectedDetails[0]}</h3>
                 <p>{selectedDetails[1]}<br/>{selectedDetails[2]}</p>
                 </Paper>
    }
        </div>
        </div>
</div> </div>

  )
    }
}
//   }

export default withStore(LandingPage);
