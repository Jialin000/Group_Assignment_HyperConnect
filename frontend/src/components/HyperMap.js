import React, { Component } from "react";
import HideFavorite from "../components/Toggle";
import { addLocation } from "../API/userAPI";
import { Button } from "antd";
import mapStyle from "../views/mapStyle";
import {
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
    defaultZoom: 15,
    selectedPark: null,
    CurrentLocation: null,
    currentFavourite: null,
    errorMessage: null,
    LabelErrorMessage: null,
    favoritesCenter: {
      lat: null,
      lng: null,
    },
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
    if (!place.formatted_address) {
      this.setState({ errorMessage: "invalid input, please try again!" });
    } else {
      this.setState({ errorMessage: "" });
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
        defaultZoom: 18,
      });
    }
  };

  /**
   * change the selectedbay to the one that have been chosen
   */
  setSelectedPark = (bay) => {
    // this.state.selectedPark = bay;
    // console.log(this.state.selectedPark)
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
      defaultZoom: 18,
    });
  };

  geoFailure = (err) => {
    console.log(err);
  };

  handleSubmit(e) {
    let a = document.getElementById("input_id").value;
    if (a === "") {
      this.setState({ LabelErrorMessage: "invalid label, please try again!" });
      return;
    } else {
      this.setState({ LabelErrorMessage: "" });
      addLocation({
        tag: document.getElementById("input_id").value,
        address: this.state.address,
        lat: this.state.mapPosition.lat,
        lng: this.state.mapPosition.lng,
      })
        .then((res) => {
          if (res.status === 201) {
            alert("Added to favorites");
            this.props.addLocation();
          } else if (res.status === 401) {
            alert("You need to log in first");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Unable to add, please try again");
        });
    }
  }
  /*console.log(this.state.address);
    console.log(this.state.mapPosition);
    console.log(document.getElementById("input_id").value);
    */
  // add the location to my favorite location

  handleFaviousCenter = () => {
    if (
      !Array.isArray(this.props.center) &&
      this.state.favoritesCenter !== this.props.center
    ) {
      this.setState({
        favoritesCenter: this.props.center,
        mapPosition: {
          lat: parseFloat(this.props.center.lat),
          lng: parseFloat(this.props.center.lng),
        },
        defaultZoom: 18,
      });
    }
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={this.state.defaultZoom}
          defaultCenter={{
            lat: parseFloat(this.state.mapPosition.lat),
            lng: parseFloat(this.state.mapPosition.lng),
          }}
          defaultOptions={{ styles: mapStyle }}
        >
          {this.handleFaviousCenter()}
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
              <div className="info">
                <h2>Bay #{this.state.selectedPark.bay_id}</h2>
                <p>st_marker_id: {this.state.selectedPark.st_marker_id}</p>
                <p>latitude: {this.state.selectedPark.lat}</p>
                <p>latitude: {this.state.selectedPark.lon}</p>
                <p>
                  Restriction Information: <br />{" "}
                  {this.state.selectedPark.Description}
                </p>
                <HideFavorite />)
              </div>
            </InfoWindow>
          )}

          {/* Add to favourite factionality */}
          {this.state.address && (
            <div className="searchbar_res">
              <h5>
                Recent searched place: <br />
              </h5>
              <h5>{this.state.address}</h5>
              <input
                name="searchTxt"
                type="text"
                maxlength="512"
                id="input_id"
                class="searchField"
                placeholder={"Enter a tag here"}
              />
              <Button className="btn" onClick={(e) => this.handleSubmit(e)}>
                Add to favourite
              </Button>
            </div>
          )}
          <div className="map_error">
            <p>{this.state.LabelErrorMessage}</p>
          </div>
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
              position: "absolute",
              left: "1%",
              top: "7%",
              border: "2px solid #000000",
              color: "black",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={["address"]}
            componentRestrictions={{ country: "au" }}
          />
          <div className="map_error">
            <p>{this.state.errorMessage}</p>
          </div>
        </GoogleMap>
      ))
    );
    let map;
    map = (
      <div className="map">
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=PutYourKey!&libraries=places`}
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
