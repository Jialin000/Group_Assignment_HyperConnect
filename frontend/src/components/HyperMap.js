import React, { Component, useState, useEffect } from "react";
import { usePosition } from "use-position";
import Button from "../components/Button";
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
    CurrentLocation: null,
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

  getLocation = () => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  };

  geoSuccess = (position) => {
    this.setState({
      CurrentLocation: {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      },
      mapPosition: {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      },
    });
  };

  geoFailure = (err) => {
    console.log(err);
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: parseFloat(this.state.mapPosition.lat),
            lng: parseFloat(this.state.mapPosition.lng),
          }}
        >
          {console.log(this.props)}
          <button className={"btn-search"} onClick={() => this.getLocation()}>
            Search Around
          </button>
          {this.state.CurrentLocation && (
            <Marker
              position={this.state.CurrentLocation}
              label={"Your current location"}
              icon={{ url: "/userLocationIcon.png" }}
            />
          )}
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

          {/* search bar */}
          <Autocomplete
            style={{
              width: "330px",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "500px",
              position:"absolute",
              left: "1%",
              top: "7%",
              border: "2px solid #000000",
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
      <div className="map">
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCE_by6BiXR1XCws5YiduStyJfvzPrXfuc&libraries=places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
    return map;
  }
}
export default HyperMap;
