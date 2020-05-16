//import Cookies from 'universal-cookie';


const BASE_URL = "https://hyper-connect.herokuapp.com";
//const BASE_URL = "https://parking-bay.herokuapp.com";

export default function userLogIn(user) {
  const endpoint = BASE_URL + `/users/login`;
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
  const endpoint = BASE_URL + `/users/signup`;
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
  const endpoint = BASE_URL + `/users/logout`;

  fetch(endpoint,{
    credentials: 'include',
  }).then(res => {
    if (res.status === 200) {
      alert("logout!");
    }else {
      alert("Error");
    }
  })
}

/*export function getToken() {
  const res = Cookies.get("Authorization");
  alert(res);
}*/