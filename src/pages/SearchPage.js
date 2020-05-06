import React, { useState } from "react";
import SearchBar from "../components/SearchBar"
import ParkingBays from "../components/ParkingBays"

export default function SearchPage() {  
  return (
    <div>
      <SearchBar />
      <ParkingBays />
    </div>
  );
}
