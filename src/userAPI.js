import { useState, useEffect } from "react";

// TODO - update this to be your url
const BASE_URL = "https://hyper-connect.herokuapp.com/users";

export default function userLogIn(user) {
  const endpoint = BASE_URL + `/login`;
  const {email, password} = user; 

  const res = fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (res.status == 200){
   alert("Authentication succeeded.");
  }else if (res.status == 401){
   alert("Authentication failed.");
  }

  return res.status;
}


export function userSignUp(user) {
  const endpoint = BASE_URL + `/signup`;
  const { userName, email, password} = user;
  const res = fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName,
      email,
      password
    })
  });

  if (res.status == 200){
   alert("user succeeded.");
  }else{
    alert("error");
  }
  return res.status;
}

export function userLogOut() {
  const endpoint = BASE_URL + `logout`;
}

export function useUserLogIn() {
  const [loading, setLoading] = useState(true);
  const [response, setResponses] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    userLogIn()
      .then(response => {
        setResponses(response);
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
    response,
    error
  };
}