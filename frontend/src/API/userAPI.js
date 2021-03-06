import { useState, useEffect } from "react";

// const BASE_URL = "https://hyper-connect.herokuapp.com";
// const BASE_URL = "https://parking-bay.herokuapp.com";
// const BASE_URL = "http://localhost:8080";


export default function userLogIn(user) {
  const endpoint = `/users/login`;
  const {email, password} = user; 

  const res = fetch(endpoint, {
    method: "POST",
    headers: {
      "credentials": 'include',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  return res;
}


export function userSignUp(user) {
  const endpoint = `/users/signup`;
  const { userName, email, password} = user;
  
  const res = fetch(endpoint, {
    method: "POST",
    headers: {
      "credentials": 'include',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName,
      email,
      password
    })
  });

  return res;
}


export function userLogOut() {
  const endpoint = `/users/logout`;

  fetch(endpoint,{
    method: "POST",
    credentials: 'include',
  }).then(res => {
    if (res.status === 200) {
      alert("logout!");
      window.location.replace("/#/");
      window.location.reload();

    }else {
      alert("Error");
    }
  })
}


export function addLocation(location){
  const endpoint = `/users/favorites/`;
  const { tag, address, lat, lng} = location;

  const res = fetch(endpoint, {
    method: "POST",
    headers: {
      "credentials": 'include',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tag, 
      address, 
      lat, 
      lng
    })
  });
  return res;
}

export function deleteLocation(id) {
  const endpoint = `/users/favorites/`;

  const res = fetch(endpoint + id, {
    headers: {
      "credentials": 'include',
      "Content-Type": "application/json"
    },
    method: "DELETE",
  });
  return res;
}

// get user's saved Locations
export async function getUserFavorites() {
  const endpoint = `/users/favorites`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      "credentials": 'include',
      "Accept": 'application/json'
    }
  });
  
  return res.json();
}

// get user's information
export async function getUserProfile() {
  const endpoint = `/users/profile`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      "credentials": 'include',
      "Accept": 'application/json'
    }
  });
  console.log(res);
  if (res.status === 401) {
    window.location.replace("/#/users/login");
  }
  return res.json();
}
// get user's information from homepage
export async function getUserProfileHomePage() {
  const endpoint = `/users/profile`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      "credentials": 'include',
      "Accept": 'application/json'
    }
  });
  
  return res.json();
}

// update user information
export function updateUserProfile(user) {
  const endpoint = `/users/profile`;
  const {userName} = user;

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "credentials": 'include',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName:userName,
    })
  })
}


export function useUserProfile() {
  const [loading, setLoading] = useState(true);
  const [res, setResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then(res => {
        setResponse(res);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  },[]);

  return {
    loading,
    res,
    error
  };
}

export function useUserProfileHomePage() {
  const [loading, setLoading] = useState(true);
  const [res, setResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserProfileHomePage()
        .then(res => {
          setResponse(res);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
          setError(e);
          setLoading(false);
        });
  },[]);

  return {
    loading,
    res,
    error
  };
}


// get user's saved locations
export function useUserFavorites() {
  const [loading, setLoading] = useState(true);
  const [res, setResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserFavorites()
      .then(res => {
        setResponse(res);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  },[]);

  return {
    loading,
    res,
    error,
  };
}


// get the cookie from the browser
export function isAuthenticated(name) {
  const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return true ? cookie&&cookie[2] : false;
}