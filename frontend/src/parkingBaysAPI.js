import { useState, useEffect } from "react";

// Base URL
const BASE_URL = "https://hyper-connect.herokuapp.com";

// end point to get all parking bays
export function getBays() {
  const endpoint = BASE_URL + `/parkingBays`;
  return fetch(endpoint).then(res => {
    console.log(res)
    return res.json();
  })
}



// export function findBays(location) {
//   /*
//   const {lat, lon} = location;
//   const endpoint = BASE_URL + `/find?lat=${lat}lon=${lon}`;
//   */
//
// }




export function useParkingBays() {
  const [loading, setLoading] = useState(true);
  const [bays, setBays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBays()
      .then(bays => {
        setBays(bays);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    bays,
    error
  };
}
