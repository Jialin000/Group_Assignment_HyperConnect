import { useState, useEffect } from "react";

// TODO - update this to be your url
const BASE_URL = "https://hyper-connect.herokuapp.com/users";

export function userLogIn(user) {
  const endpoint = BASE_URL + `/login`;

  
}


export function userSignUp(user) {
  const endpoint = BASE_URL + `/signup`;

}

export function userLogOut() {
  const endpoint = BASE_URL + `logout`;

  
}

export function useUserLogIn() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    userLogIn()
      .then(users => {
        setUsers(users);
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
    users,
    error
  };
}
