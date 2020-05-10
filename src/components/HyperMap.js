import React, { Component,useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {Marker,InfoWindow} from '@react-google-maps/api';
import {usePosition} from 'use-position';

// Display parking bays on map
export default function HyperMap(props) {

    // style of map
    const containerStyle = {
        width: '1000px',
        height: '800px'
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
    const center = {
        lat: latitude,
        lng: longitude
    }

    const [selectedPark, setSelectedPark] = useState(null);

    // render
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCE_by6BiXR1XCws5YiduStyJfvzPrXfuc"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
            >
                {/* User's current location */}
                <Marker position={center} label={"Your current location"} 
                icon={{url:'/userLocationIcon.png'}}/>

                {/* Parkingbays' locations */}
                {props.bays.map(bay =>
                (bay.status === "Unoccupied" &&
                    <Marker
                        position={{lat: parseFloat(bay.lat), lng: parseFloat(bay.lon)}}
                        onClick={() => {setSelectedPark(bay);}}
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

                {selectedPark &&(
                    <InfoWindow position={{lat: parseFloat(selectedPark.lat), lng: parseFloat(selectedPark.lon)}}
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}>
                        <div>
                            <h2>Bay #{selectedPark.bay_id}</h2>
                            <p>st_marker_id: {selectedPark.st_marker_id}</p>
                            <p>latitude: {selectedPark.lat}</p>
                            <p>latitude: {selectedPark.lon}</p>
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>
        </LoadScript>
    )

}