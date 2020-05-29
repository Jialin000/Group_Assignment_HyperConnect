import React, { useState } from "react";
import ParkingBays from "../components/ParkingBays";
import HyperMap from "../components/HyperMap";
import { useUserProfile,getUserProfile, isAuthenticated, useUserFavorites} from "../userAPI";
import { useParkingBays } from "../parkingBaysAPI";

import Button from "../components/Button";

export default function SearchPage() {
  
  const [centerPoint, setCenterPoint] = useState([]);

  // Fetch all the parking bays information upon loading
  const { bay_loading, bays, bay_error } = useParkingBays();
  if (bay_loading) {
    return <p>Loading...</p>;
  }
  if (bay_error){
    return <p>Something went wrong: {bay_error.message}</p>;
  }

  
  
  // show a sigle saved location
  // the center point of map will be changed 
  // by clicking the button
	function Location(props) {
    const {tag, lat, lng} = props;

    function changeCenter(lat, lng){
      const position = {
        "lat" : lat,
        "lng" : lng
      };
      // change the center position
      setCenterPoint(position);
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
    if (locations.length == 0){
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
    //tes1t@gmail.com
    const { loading, res, error } = useUserProfile();
    
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
        return <p>Unable to get saved location</p>;
    }

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
        <p>Saved locations: </p>
        <FavoriteLocationList locations={favorites}/>
      </div>
    );
  };

  // Render contents of page
  return (
    <div>
      <div className="homepage_left_description">
        <FavoriteLocations/>
      </div>
      <div className="map">
        {<HyperMap bays={bays} center={centerPoint}/>}
      </div>
    </div>
  );
}
