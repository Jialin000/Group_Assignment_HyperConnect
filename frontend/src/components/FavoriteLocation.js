import React from "react";
import { deleteLocation } from "../userAPI";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function FavoriteLoactions(props) {
	const {locations} = props;

	const [loaction_list, setLocations] = useState(locations);
  	const [showUpdate, setShowUpdate] = useState(false);

	

	// funtion to seacrh the parking bays around the saved locations
	// redirect to the searching page
	function searchLocation(){
		alert("click");
	}


	


	function SearchButton(){
		return(
			<Button className={"btn"} onClick={()=>searchLocation(this)}>
				Search
			</Button>
		);
	}


	// function to remove the svaed location
	function removeLocation(_id){
		deleteLocation(_id)
			.then(res => {
			if (res.status === 200) {
			  alert ("deleted"); 
			  setLocations(loaction_list.filter(location => location._id !== _id)); 
			    
			}else {
			  alert("Error");
			}})	
	}

	// show a sigle location
	function Location(props) {
		const {_id, tag, lat, lng} = props;
	
		function DeleteButton(){
			return(
				<Button className={"btn"} onClick={() => removeLocation(_id)}>
					Delete
				</Button>
			);
		}

		return (
			<div className="location">
				<p>{_id}</p>
				<p>{tag}</p>
				<p>{lat}</p>
				<p>{lng}</p>
				{showUpdate ? <DeleteButton/>: <SearchButton/>}
			</div>
		);
	}

	// a list a saved locations
	function FavoriteLoactionsList() {	
		return(  
		  	<div className="loaction_list">    
				{loaction_list.map(location => (<Location key={location._id} {...location} />))} 
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