import React, { useState } from "react";
import {findBays, getBays} from "../parkingBaysAPI"
import Button from "../components/Button";

export default function SearchBar() {


  function findNearestBays(){

  }

  return (
    <div className="SearchBar">
      <form>
          <button className={"btn-search"} onClick={findNearestBays}>
              Search Around
          </button>
      </form>
    </div>
  );
}
