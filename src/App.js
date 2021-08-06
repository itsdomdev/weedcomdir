import React from "react";
import { Link, Route, Switch, Redirect, useParams } from "react-router-dom";
import Header from './Components/Header';
import { Provider } from 'mobx-react'
import AppStore, { StoreProvider } from './util/datastore'
import Listing from './Pages/Listing';
import Landing from './Pages/Landing';
import ListingBlock from './Components/ListingBlock';
import DispProfile from './Pages/DispProfile';
import Footer from './Components/Footer';
import {Helmet} from "react-helmet";
import './App.css';
import usePageTracking from './usePageTracking';



const appDataStore = new AppStore()

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);
const DispensaryLanding = () => (
  <>
   {/* <Header/> */}
   <Landing level="dispensaries"/>
   <Footer/>
  </>
);
const DeliveryLanding = () => (
  <>
   {/* <Header/> */}
   <Landing level="delivery"/>
   <Footer/>
  </>
);
const StateListing = () => (
  <>
   <Header/>
  <Listing level="state"/>
  </>
);
const ProfilePage = () => (
  <>
   <Header/>
    <DispProfile />
    <Footer/>
  </>
);

const ListingPage = (props) => {
  const {city, state_code} = useParams()
  console.log(city)
  console.log(state_code)

  return(<>
   <Header level={props.level} city={city} state={state_code}/>
   {props.level == 'city' ? <Listing  level="city" city={city} state={state_code} /> : <Listing  level="state" state={state_code} />}
    {/* <Footer/> */}
  </>
);
}

const AppStoreContext = React.createContext(new AppStore());

export default function App() {
  // console.log(this.props)
  usePageTracking()
  console.log(`${process.env.PUBLIC_URL}`)
  return (
    // <StoreProvider store={appDataStore}>
    <StoreProvider store={appDataStore}>
      {/* <Route path="/" render={({location}) => {
  if (typeof window.ga === 'function') {
    ReactGA.pageview(window.location.pathname + window.location.search);

  }
  return null;
}} /> */}


      <Switch>
      {/* <Route path="/*" component={()=><ListingBlock/>}/> */}
      <Route path={[`/dispensaries/:state_code/:city/:disp_slug`,`/delivery/:state_code/:city/:disp_slug`]}><ProfilePage /></Route>
      <Route path={`/delivery/:state_code/:city`} component={()=><ListingPage  level="city" />}/>
      <Route path={`/dispensaries/:state_code/:city`} component={()=><ListingPage  level="city" />}/>

      <Route path={`/delivery/:state_code`} component={()=><ListingPage level="state" />}/>
      <Route path={`/dispensaries/:state_code`} component={()=><ListingPage level="state" />}/>

      <Route path={`/delivery`} component={()=><DeliveryLanding/>}/>
      <Route path={`/dispensaries`} component={()=><DispensaryLanding/>}/>


       <Route path={`/`} exact><Redirect to={`/dispensaries`}/> </Route>








      {/* <Route path="/dispensaries/:state_code"><Listing /></Route> */}

      </Switch>

    </StoreProvider>
  );
}
