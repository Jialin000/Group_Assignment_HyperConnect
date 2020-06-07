import { useState, useEffect } from "react";

// Base URL
// const BASE_URL = "https://hyper-connect.herokuapp.com";
// const BASE_URL = "http://localhost:8080";

export function getBays() {
  const endpoint = `/parkingBays`;
  const update = (callback) => {
    setTimeout(function () {
      return callback();
    }, 1000 * 30);
  };
  update(() => {
    fetch(`/update`);
  });
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
