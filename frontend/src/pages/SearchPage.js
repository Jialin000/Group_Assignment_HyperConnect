import React, { useState } from "react";
import ParkingBays from "../components/ParkingBays";
import HyperMap from "../components/HyperMap";
import { useParkingBays } from "../parkingBaysAPI";

export default function SearchPage() {
  // Fetch all the parking bays information upon loading
  const { loading, bays, error } = useParkingBays();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  // Simple style to separate left and right contents
  // const leftDivStyle = {
  //     float: "left",
  //     margin: "20px 10px 20px 10px",
  //     width: "25%",
  //     border: "solid 1px black",
  //     height: "100%"
  // }
  //
  // const rightDivStyle = {
  //     float: "left",
  //     margin: "20px 10px 20px 10px",
  //     width: "70%",
  //     border: "solid 1px black"
  // }

  // Render contents of page
  return (
    <div className="map">
      <HyperMap bays={bays} />
      <div className="searchbar">
        <ParkingBays bays={bays} />
      </div>
    </div>
  );
}
