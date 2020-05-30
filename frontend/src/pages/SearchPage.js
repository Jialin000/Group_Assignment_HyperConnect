import React, { useState } from "react";
import ParkingBays from "../components/ParkingBays";
import HyperMap from "../components/HyperMap";
import { useUserProfile, isAuthenticated, useUserFavorites} from "../userAPI";
import { useParkingBays } from "../parkingBaysAPI";

import  {Layout,Button}  from 'antd';
export default function SearchPage() {
  
  const [centerPoint, setCenterPoint] = useState([]);
  
  
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
      <div className="location_list">
        <h4>Saved locations: </h4>
        <FavoriteLocationList locations={favorites}/>
      </div>
    );
  };

  
  // a map showing the location of parking bays around the center point
  function ParkingBaysMap(){
    // Fetch all the parking bays information upon loading
    const { loading, bays, error } = useParkingBays();
    
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong</p>;
    }
    
    return <HyperMap bays={bays} center={centerPoint}/>;
  }

  // Render contents of page
  return (
    <div>
      <div>
        <FavoriteLocations/>
      </div>
      <div className="map">
        <ParkingBaysMap/>
      </div>
    </div>
  );
}
