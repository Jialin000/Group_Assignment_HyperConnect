import React from "react";
import { deleteLocation } from "../userAPI";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function FavoriteLoactions(props) {

  const [showUpdate, setShowUpdate] = useState(false);

    return (
      <div className="favorite_loactions"> 
			{showUpdate ? <UpdateFavoriteLocations {...props} /> : <FavoriteLoactionsList {...props} />}   
			<Button className={"btn"} onClick={() => setShowUpdate(!showUpdate)}>
				{showUpdate ? "OK" : "Edit favorite locations"}
			</Button>          
      </div>
  );
}


export function Location(props) {
	const {id, tag, location} = props;

	function onSubmit(id) {
		// search around
		
	}

	return (
		<div className="location">
			<p>{id}</p>
			<p>{tag}</p>
			<p>{location}</p>
			<Button className={"btn"} onClick={()=>onsubmit}>
				Search
			</Button> 
		</div>
	);
}

/*
export function UpdateLocation(props) {

  const {id, tag, location} = props;

  function onSubmit() {
    // delete the seletced locations
    
  }

  return (
    <div className="location">
        <p>{id}</p>
        <p>{tag}</p>
        <p>{location}</p>
          
    </div>
  );
}*/


export function FavoriteLoactionsList(props) {
  const [locations, setLocations] = useState([]);
  setLocations(props.locations);

  function onSubmit() {
    // delete the seletced locations
    
  }
  
  return(  
    <div className="loaction_list">    
      {locations.map(location => {        
        const {id, tag, address} = location;
        return(
          <div className="location">
          <p>{id}</p>
          <p>{tag}</p>
          <p>{address}</p>
          <Button className={"btn"} onClick={() => onSubmit}>
            Delete
          </Button>
        </div>
        );
      }
    )}
    </div> 
  ); 
}


export function UpdateFavoriteLocations(props) {
    const {locations} = props; 
  
    return (
      <div className="update_location_list">
        <form>
          <div> 
            {locations.map(location => (<Location {...location} />))}    
          </div> 
        </form>
      </div>
    );
}