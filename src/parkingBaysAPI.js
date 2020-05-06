import { useState, useEffect } from "react";

// TODO - update this to be your url
const BASE_URL = "https://hyper-connect.herokuapp.com/parkingBays";

export function getBays() {
  const endpoint = BASE_URL + `/`;
  
}

export function findBays(location) {
  /*
  const {lat, lon} = location;
  const endpoint = BASE_URL + `/find?lat=${lat}lon=${lon}`;
  */
  
}

/* 
export function useParkingBays() {
  const [loading, setLoading] = useState(true);
  const [bays, setBays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    findBays()
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

}*/
