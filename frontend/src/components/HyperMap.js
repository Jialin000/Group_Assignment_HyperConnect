import React, { Component, useState, useEffect } from "react";
import { usePosition } from "use-position";
import {
  LoadScript,
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";

class HyperMap extends Component {
  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    mapPosition: {
      lat: -37.8136,
      lng: 144.9631,
    },
    selectedPark: null,
  };

  /**
   * Get the city and set the city input value to the one selected
   */
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   */
  onInfoWindowClose = (event) => {};

  /**
   * When the user types an address in the search box
   */
  onPlaceSelected = (place) => {
    console.log("plc", place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  /**
   * change the selectedbay to the one that have been chosen
   */
  setSelectedPark = (bay) => {
    this.setState({ selectedPark: bay });
  };

  /**
   * distinguishly display the parking with empty and occupied
   */
  handleRenderBays = (bay) => {
    return (
      <Marker
        position={{ lat: parseFloat(bay.lat), lng: parseFloat(bay.lon) }}
        onClick={() => {
          this.setSelectedPark(bay);
        }}
        icon={
          bay.status === "Unoccupied"
            ? { url: "/availableIcon.png" }
            : { url: "/nonAvailableIcon.png" }
        }
      />
    );
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* select a parking bay the InfoWindow will pop up */}
          {this.state.selectedPark && (
            <InfoWindow
              position={{
                lat: parseFloat(this.state.selectedPark.lat),
                lng: parseFloat(this.state.selectedPark.lon),
              }}
              onCloseClick={() => {
                this.setSelectedPark(null);
              }}
            >
              <div>
                <h2>Bay #{this.state.selectedPark.bay_id}</h2>
                <p>st_marker_id: {this.state.selectedPark.st_marker_id}</p>
                <p>latitude: {this.state.selectedPark.lat}</p>
                <p>latitude: {this.state.selectedPark.lon}</p>
              </div>
            </InfoWindow>
          )}

          {/* Parkingbays' locations */}
          {this.props.bays.map((bay) => this.handleRenderBays(bay))}
          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "500px",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={["address"]}
            componentRestrictions={{ country: "au" }}
          />
        </GoogleMap>
      ))
    );
    let map;
    map = (
      <div>
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCE_by6BiXR1XCws5YiduStyJfvzPrXfuc&libraries=places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: "300px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
    return map;
  }
}
export default HyperMap;

// import React, { Component,useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, withGoogleMap, withScriptjs } from '@react-google-maps/api';
// import {Marker,InfoWindow} from '@react-google-maps/api';
// import {usePosition} from 'use-position';
// import PlacesAutocomplete from 'react-places-autocomplete';
// import Autocomplete from 'react-google-autocomplete';

// import Geocode from "react-geocode";
// Geocode.setApiKey( "AIzaSyCE_by6BiXR1XCws5YiduStyJfvzPrXfuc" );
// Geocode.enableDebug();

// // Display parking bays on map

// export default function HyperMap(props) {

//     // style of map
//     const containerStyle = {
//         width: '1000px',
//         height: '800px'
//     }

//     // Get user's current location
//     const watch = true;

//     const {
//         latitude,
//         longitude,
//         timestamp,
//         accuracy,
//         error,
//     } = usePosition(watch, {enableHighAccuracy: true});

//     // center of map
//     let center = {
//         lat: latitude,
//         lng: longitude
//     }

//     const [selectedPark, setSelectedPark] = useState(null);
//     const [address, setAddress] = React.useState("")
//     const hanleSelect = async (value) => {};
//     // render

//     return (
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={16}
//             >
//                 <Autocomplete
// 							style={{
// 								width: '100%',
// 								height: '40px',
// 								paddingLeft: '16px',
// 								marginTop: '2px',
// 								marginBottom: '500px'
// 							}}
// 							onPlaceSelected={ onPlaceSelected }
// 							types={['(regions)']}
// 						/>

//                 {/* User's current location */}
//                 <Marker position={center} label={"Your current location"}
//                 icon={{url:'/userLocationIcon.png'}}/>

//                 {/* Parkingbays' locations */}
//                 {props.bays.map(bay =>
//                 (bay.status === "Unoccupied" &&
//                     <Marker
//                         position={{lat: parseFloat(bay.lat), lng: parseFloat(bay.lon)}}
//                         onClick={() => {setSelectedPark(bay)}}
//                         icon={{url:'/availableIcon.png'}}
//                     />)
//                 )}

//                 {props.bays.map(bay =>
//                 (bay.status === "Present" &&
//                     <Marker
//                         position={{lat: parseFloat(bay.lat), lng: parseFloat(bay.lon)}}
//                         icon={{url:'/nonAvailableIcon.png'}}
//                     />)
//                 )}

//                 {selectedPark &&
//                     <InfoWindow position={{lat: parseFloat(selectedPark.lat), lng: parseFloat(selectedPark.lon)}}
//                     onCloseClick={() => {
//                         setSelectedPark(null);
//                     }}
//                     >
//                         <div>
//                             <h2>Bay #{selectedPark.bay_id}</h2>
//                             <p>st_marker_id: {selectedPark.st_marker_id}</p>
//                             <p>latitude: {selectedPark.lat}</p>
//                             <p>latitude: {selectedPark.lon}</p>
//                         </div>
//                     </InfoWindow>
//                 }
//             {/* <PlacesAutocomplete
//                 value={address}
//                 onchange = {setAddress}
//                 onSelect = {hanleSelect}
//             >{()=>(<div>wahahah</div>)}
//             </PlacesAutocomplete> */}
//             <h1>wahahaha</h1>
//             </GoogleMap>
//     )

// }
