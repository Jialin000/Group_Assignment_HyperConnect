import React from "react";
import { deleteLocation } from "../API/userAPI";
import { useState } from "react";
import { Button } from "antd";

export default function FavoriteLoactions(props) {
	const {locations} = props;

	const [loaction_list, setLocations] = useState(locations);
  	const [showUpdate, setShowUpdate] = useState(false);


	// function to remove the svaed location
	function removeLocation(_id){
		deleteLocation(_id)
			.then(res => {
			if (res.status === 200) {
			  setLocations(loaction_list.filter(location => location._id !== _id)); 

			}else {
			  alert("Unable to delete");
			}})	
	}

	// show a sigle location
	function Location(props) {
		const {_id, tag, address} = props;
	
		function DeleteButton(){
			return(
				<Button className={"btn"} onClick={() => removeLocation(_id)}>
					Delete
				</Button>
			);
		}

		return (
			<div className="location">
				<h4>{tag}</h4>
				<p>{address}</p><br/>
				{showUpdate ? <DeleteButton/> : null}
			</div>
		);
	}

	// a list a saved locations
	function FavoriteLoactionsList() {	

		return( 
			<div>
				<div >
					{loaction_list.map(location => (<Location key={location._id} {...location} />))} 
				</div><br/>
				<Button className="btn" onClick={() => setShowUpdate(!showUpdate)}>
						{showUpdate ? "OK" : "Edit favorite locations"}
				</Button> 
			</div>

		); 
	}
	  

    return (


      <div className="favorite_locations">
        {loaction_list.length === 0 ? <p>no saved locations</p> : <FavoriteLoactionsList/> }       

      </div>
  	);
}