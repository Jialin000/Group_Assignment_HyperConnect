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
    credentials: 'include',
  }).then(res => {
    if (res.status === 200) {
      alert("logout!");
      window.location.replace("/users/login");

    }else {
      alert("Error");
    }
  })
}


export function getUserProfile() {
  const endpoint = `/users/profile`;

  const res = fetch(endpoint, {
    method: "GET",
    headers: {
      "credentials": 'include'
    }
  });

  console.log(res.status);
  return res;
}



export function updateUserProfile(user) {
  const endpoint = `/users/profile`;
  const { userName, email} = user;

  const res = fetch(endpoint, {
    method: "POST",
    headers: {
      "credentials": 'include',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName,
      email,
    })
  });
  return res.json();
}

export function useUserProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then(user => {
        setUser(user);
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
    user,
    error
  };
}


// get the cookie from the browser
export function isAuthenticated(name) {
  const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return true ? cookie&&cookie[2] : false;
}