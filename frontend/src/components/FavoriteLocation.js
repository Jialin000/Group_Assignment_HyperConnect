import React from "react";
import { deleteLocation } from "../userAPI";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function FavoriteLoactions(props) {
	const {locations} = props;

	const [loaction_list, setLocations] = useState(locations);
  	const [showUpdate, setShowUpdate] = useState(false);

	// function to remove the svaed location
	function deleteLocation(location){
		// make a copy of old array
		// remove the location from the new array
		var new_array = loaction_list;
    	var index = new_array.indexOf(location);

    	if (index > -1) {
			new_array.splice(index, 1);
			setLocations(new_array);
		} else{
			alert("Error deleting");
		}
	}

	// funtion to seacrh the parking bays around the saved locations
	// redirect to the searching page
	function searchLocation(){

	}


	function DeleteButton(){
		return(
			<Button className={"btn"} onClick={() => deleteLocation}>
				Delete
			</Button>
		);
	}


	function SearchButton(){
		return(
			<Button className={"btn"} onClick={() => searchLocation}>
				Search
			</Button>
		);
	}

	
	function Location(props) {
		const {tag, lat, lng} = props;
		return (
			<div className="location">
				<p>{tag}</p>
				<p>{lat}</p>
				<p>{lng}</p>
				{showUpdate ? <DeleteButton/>: <SearchButton/>}
			</div>
		);
	}


	function FavoriteLoactionsList() {	
		return(  
		  	<div className="loaction_list">    
				{loaction_list.map(location => (<Location {...location} />))} 
		  	</div> 
		); 
	}
	  

    return (
      <div className="favorite_loactions"> 
			<FavoriteLoactionsList/> 
			<Button className={"btn"} onClick={() => setShowUpdate(!showUpdate)}>
				{showUpdate ? "OK" : "Edit favorite locations"}
			</Button>          
      </div>
  	);
}