import React from "react";
import { useUserProfile, updateUserProfile } from "../userAPI";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function UserPage() {
  const { loading, user, error } = useUserProfile();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  // use this to make sure you are getting the right data
  console.log(user);

  // Display a list of the authors
    return (
        <div>      
            <h1>User Profile</h1>
            <UserProfile {...user}/>      
        </div>
    );
}

export function UserProfile(user) {
  const { userName, email } = user;
  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <div className="userProfile">
      <div className="info">
        {userName} {email}
        <Button className={"btn"} onClick={() => setShowUpdate(!showUpdate)}>
          {showUpdate ? "Cancel" : "Edit profile"}
        </Button>
      </div>
      <UpdateProfile {...user} showUpdate={showUpdate} />
    </div>
  );
}

export function UpdateProfile(props) {
  const { userName, email, showUpdate } = props;

  const [username_input, setUserName] = useState(userName);
  const [email_input, setEmail] = useState(email);
  

  function onSubmit() {
    updateUserProfile({
        userName: username_input,
        email: email_input
    });
  }

  return (
    <div className={`user-expand ${showUpdate ? "show" : ""}`}>
      <form>
        <input type="text" name="username"  value={username_input} onChange={event => {setUserName(event.target.value)}}/>
        <input type="text" name="email" value={email_input} onChange={event => {setEmail(event.target.value)}}/>
        <Button className={"btn-warning"} onClick={onSubmit}>
          Update
        </Button>
      </form>
    </div>
  );
}
