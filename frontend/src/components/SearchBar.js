import React, { useState } from "react";
import {findBays, getBays} from "../parkingBaysAPI"
import Button from "../components/Button";

export default function SearchBar() {


  function findNearestBays(){

  }

  return (
    <div className="SearchBar">
      <form>
        <Button className={"btn-success"} onClick={findNearestBays}>
          Search Around
        </Button>
      </form>
    </div>
  );
}