import React, { useState } from "react";
import ParkingBays from "../components/ParkingBays";
import HyperMap from "../components/HyperMap";
import { useParkingBays } from "../parkingBaysAPI";
import { usePosition } from "use-position";

export default function SearchPage() {
  // Fetch all the parking bays information upon loading
  const { loading, bays, e } = useParkingBays();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (e) {
    return <p>Something went wrong: {e.message}</p>;
  }

  // Simple style to separate left and right contents
  const leftDivStyle = {
    float: "left",
    margin: "20px 10px 20px 10px",
    width: "25%",
    border: "solid 1px black",
    height: "100%",
  };

  const rightDivStyle = {
    float: "left",
    margin: "20px 10px 20px 10px",
    width: "70%",
    border: "solid 1px black",
  };

  //   const { latitude, longitude, timestamp, accuracy, error } = usePosition(
  //     true,
  //     { enableHighAccuracy: true }
  //   );

  //   // center of map
  //   let center = {
  //     lat: latitude,
  //     lng: longitude,
  //   };

  // Render contents of page
  return (
    <div>
      <div style={leftDivStyle}>
        <ParkingBays bays={bays} />
      </div>
      <div style={rightDivStyle}>
        <HyperMap bays={bays} />
        {/* {console.log(center)} */}
      </div>
    </div>
  );
}
