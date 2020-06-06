import React, { useState, useEffect } from "react";
import ParkingBays from "../components/ParkingBays";
import HyperMap from "../components/HyperMap";
import { isAuthenticated, useUserFavorites} from "../userAPI";
import { useParkingBays } from "../parkingBaysAPI";

import  {Layout,Button}  from 'antd';
export default function SearchPage() {
  
  // Render contents of page
  return (
    <div>
      <div className="map">
        <ParkingBaysMap/>
      </div>
    </div>
  );
}

// a map showing the location of parking bays around the center point
function ParkingBaysMap(){
  // the center of the map
  const [centerPoint, setCenterPoint] = useState([]);
  const [centerLocation, setCenterLocation] = useState(null);
  const [refreshFavorite, serRfreshFavorite] = useState(false);

  // Fetch all the parking bays information upon loading
  const { loading, bays, error } = useParkingBays();
  
  function refreshFavoriteLocation(){
    serRfreshFavorite(!refreshFavorite);
  }

  // show a sigle saved location
  // the center point of map will be changed 
  // by clicking the button
  function Location(props) {
    const {tag, address, lat, lng} = props;

    function changeCenter(lat, lng){
      const position = {
        "lat" : lat,
        "lng" : lng
      };
      // change the center position
      setCenterPoint(position);
      setCenterLocation(address);
    }

    return (
      <div className="locationButton">
        <strong>
            <Button
            className={"btn"}
            onClick={()=>changeCenter(lat, lng)
            }>
            {tag}
        </Button>
        </strong>
          <br/>
        {address}	  
      </div>
    );
  }

  // a list of favorite locations 
  // user can seacrh the bays around the saved locations
  function FavoriteLocationList(props){
    const {locations} = props;
    if (locations.length === 0){
      return(
          <div className="location_list-no">
            <h4>no saved locations</h4>
          </div>
    );
      
    }else{
      return(
        <div>
        {locations.map(location => (<Location key={location._id} {...location} />))} 
        </div> 
      );
    }
  }


  function FavoriteLocations() {
    // fetch the locations saved by the user
    const { loading, res, error } = useUserFavorites();
    //const [refresh, setRefresh] = useState(false);

    // if the user has not logged in
    // remind user to login to see their saved locations
    if (!isAuthenticated("Authorization")){
      return (
        <div className="fav_nologin">
         <h3><u>  Log in to see my saved locations <br/></u></h3>
          <Button className="btn"
                  onClick={(event) => (window.location.href = "/#/users/login")}>
              Click me to log in</Button>
        </div>
      );
    }
    
    const {favorites} = res;

    return(

      <div>
        <h4>Use saved locations: </h4>
        {loading ? <h4>Loading...</h4> : null}
        {error ? <h4>Unable to get saved locations</h4> : null}
        {!loading && !error ? <FavoriteLocationList locations={favorites}/> : null}
      </div>
    );
  };

  // render the map
  return (

    <div className="map_box">
        <div className="location_list">
            <FavoriteLocations/>
        </div>
      <div >
        {centerLocation === null ? null : <p>show results around: {centerLocation}</p>}
        <div >
        {loading ? <p>Loading...</p> : null}
        {error ? <p>Something went wrong</p> : null}
        </div>
        {!error && !loading ? <HyperMap  addLocation={()=>refreshFavoriteLocation()} bays={bays} center={centerPoint}/> : null}

      </div>
    </div>
  );
}
