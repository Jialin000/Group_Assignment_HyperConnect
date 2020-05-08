import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {Marker} from '@react-google-maps/api';
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
                <Marker position={center} label={"Your current location"}/>

                {/* Parkingbays' locations */}
                {props.bays.map(bay =>

                    <Marker
                        position={{lat: parseFloat(bay.lat), lng: parseFloat(bay.lon)}}
                    />
                )}

            </GoogleMap>
        </LoadScript>
    )

}