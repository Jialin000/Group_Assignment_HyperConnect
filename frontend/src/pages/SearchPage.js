import React, { useState } from "react";
import ParkingBays from "../components/ParkingBays";
import HyperMap from "../components/HyperMap";
import { useUserProfile, isAuthenticated, useUserFavorites} from "../userAPI";
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

  // Fetch all the parking bays information upon loading
  const { loading, bays, error } = useParkingBays();
  

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
        <Button 
          className={"btn"} 
          onClick={()=>changeCenter(lat, lng)
        }>
          {tag}
        </Button>	
      </div>
    );
  }

  // a list of favorite locations 
  // user can seacrh the bays around the saved locations
  function FavoriteLocationList(props){
    const {locations} = props;
    if (locations.length === 0){
      return(
        <p>no saved locations</p>
      );
      
    }else{
      return(
        <div className="loaction_list">
        {locations.map(location => (<Location key={location._id} {...location} />))} 
        </div> 
      );
    }
  }


  function FavoriteLocations() {

    // fetch the locations saved by the user
    const { loading, res, error } = useUserProfile();

    // if the user has not logged in
    // remind user to login to see their saved locations
    if (!isAuthenticated("Authorization")){
      return (
        <div>
          <a href={'/#/users/login'}> Log in to see my saved locations</a>
        </div>
      );
    }
    
    const {userName, email, favorites} = res;

    return(
      <div>
        <p>Use saved locations: </p>
        {loading ? <p>Loading...</p> : null}
        {error ? <p>Unable to get saved locations</p> : null}
        {favorites ? <FavoriteLocationList locations={favorites}/> : null}
      </div>
    );
  };

  // render the map
  return (
    <div>
      <FavoriteLocations/>
      <div>
        {centerLocation === null ? null : <p>show results around: {centerLocation}</p>}
        {loading ? <p>Loading...</p> : null}
        {error ? <p>Something went wrong</p> : null}
        {!error && !loading ? <HyperMap bays={bays} center={centerPoint}/> : null}
      </div>
    </div>
  );
}
