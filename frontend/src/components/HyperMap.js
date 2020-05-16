import React, { Component,useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {Marker,InfoWindow} from '@react-google-maps/api';
import {usePosition} from 'use-position';
import Autocomplete from 'react-google-autocomplete';
// Display parking bays on map


export default function HyperMap(props) {

    

    // style of map
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    // Get user's current location
    const watch = true;

    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = usePosition(watch, {enableHighAccuracy: true});

    // center of map
    let center = {
        lat: latitude,
        lng: longitude
    }

    const [selectedPark, setSelectedPark] = useState(null);
    
    // render

    // onPlaceSelected = ( place ) => {
    //     console.log( 'plc', place );
    //     const address = place.formatted_address,
    //           addressArray =  place.address_components,
    //           city = this.getCity( addressArray ),
    //           area = this.getArea( addressArray ),
    //           state = this.getState( addressArray ),
    //           latValue = place.geometry.location.lat(),
    //           lngValue = place.geometry.location.lng();
    //     // Set these values in the state.
    //     this.setState({
    //         address: ( address ) ? address : '',
    //         area: ( area ) ? area : '',
    //         city: ( city ) ? city : '',
    //         state: ( state ) ? state : '',
    //         markerPosition: {
    //             lat: latValue,
    //             lng: lngValue
    //         },
    //         mapPosition: {
    //             lat: latValue,
    //             lng: lngValue
    //         },
    //     })
    // }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCE_by6BiXR1XCws5YiduStyJfvzPrXfuc"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
            >
                {/* <Autocomplete
					style={{
					    width: '100%',
						height: '40px',
						paddingLeft: '16px',
						marginTop: '2px',
						marginBottom: '100px'
						}}
                        onPlaceSelected={ this.onPlaceSelected }
						types={['(regions)']}
				/> */}
                
                {/* User's current location */}
                <Marker position={center} label={"Your current location"} 
                icon={{url:'/userLocationIcon.png'}}/>

                {/* Parkingbays' locations */}
                {props.bays.map(bay =>
                (bay.status === "Unoccupied" &&
                    <Marker
                        position={{lat: parseFloat(bay.lat), lng: parseFloat(bay.lon)}}
                        onClick={() => {setSelectedPark(bay)}}
                        icon={{url:'/availableIcon.png'}}
                    />)
                )}

                {props.bays.map(bay =>
                (bay.status === "Present" &&
                    <Marker
                        position={{lat: parseFloat(bay.lat), lng: parseFloat(bay.lon)}}
                        icon={{url:'/nonAvailableIcon.png'}}
                    />)
                )}

                {selectedPark && 
                    <InfoWindow position={{lat: parseFloat(selectedPark.lat), lng: parseFloat(selectedPark.lon)}}
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                    >
                        <div>
                            <h2>Bay #{selectedPark.bay_id}</h2>
                            <p>st_marker_id: {selectedPark.st_marker_id}</p>
                            <p>latitude: {selectedPark.lat}</p>
                            <p>latitude: {selectedPark.lon}</p>
                        </div>
                    </InfoWindow>
                }
                
                {/* {selectedPark && 
                (this.center.lat=parseFloat(selectedPark.lat))&& 
                (this.center.lng = parseFloat(selectedPark.lon))
                } */}

            </GoogleMap>
        </LoadScript>
    )


}
