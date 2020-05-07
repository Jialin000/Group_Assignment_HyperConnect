import { useState, useEffect } from "react";

const BASE_URL = "https://hyper-connect.herokuapp.com/";

// TODO
// return fetch call that gets parkingBays list
const showAllParkingBays = () => {
    const endpoint = BASE_URL + '/parkingBays'
}

// TODO
// return fetch call that gets parkingBays around user's location
const findParkingBays = () => {
    const endpoint = BASE_URL + '/parkingBays/find'
}

