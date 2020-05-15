import React, { useState } from "react";
import {findBays, getBays} from "../parkingBaysAPI"
import Button from "../components/Button";

export default function SearchBar() {
  
  function getCurrentLocation() {
  
  }

  function findNearestBays(){

  }

  return (
    <div className="SearchBar">
      <form>
<<<<<<< Updated upstream
        
        
        <Button className={"btn-success"} onClick={findNearestBays}>
          Use Current Location
        </Button>
=======
        <button className={"btn-search"} onClick={findNearestBays}>
          Search Around
        </button>
>>>>>>> Stashed changes
      </form>
    </div>
  );
}
