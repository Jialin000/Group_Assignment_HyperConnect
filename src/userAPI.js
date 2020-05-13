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

  return res;
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

  return res;
}

export function userLogOut() {
  const endpoint = BASE_URL + `logout`;
  
}