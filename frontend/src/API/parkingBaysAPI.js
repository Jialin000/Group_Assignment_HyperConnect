import { useState, useEffect } from "react";

// Base URL
// const BASE_URL = "https://hyper-connect.herokuapp.com";
// const BASE_URL = "http://localhost:8080";
export function updateDatabse() {
  fetch(`/update`).then((res) => {
    console.log(res);
    return res.json();
  });
}

export function getBays() {
  const endpoint = `/parkingBays`;
  return fetch(endpoint).then((res) => {
    console.log(res);
    return res.json();
  });
}

export function useParkingBays() {
  const [loading, setLoading] = useState(true);
  const [bays, setBays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBays()
      .then((bays) => {
        setBays(bays);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    bays,
    error,
  };
}
