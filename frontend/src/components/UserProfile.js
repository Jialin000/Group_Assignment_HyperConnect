import React from "react";
import { updateUserProfile } from "../userAPI";
import { useState, useEffect } from "react";
import Button from "../components/Button";


export default function UserProfile(props) {
    const [showUpdate, setShowUpdate] = useState(false);

    return (
      <div className="userProfile">          
        {showUpdate ? <UpdateProfileForm {...props} /> : <ProfileForm {...props} />}          
        <Button className={"btn"} onClick={() => setShowUpdate(!showUpdate)}>
            {showUpdate ? "Cancel" : "Edit profile"}
        </Button>  
      </div>
    );
}

export function ProfileForm(props) {
    
    const { userName, email } = props;
  
    return (
        <div className="ProfileForm">
            <p>Username: {userName}</p><br/>
            <p>Email: {email}</p><br/>
        </div>
    );
}

export function UpdateProfileForm(props) {
    const { userName, email } = props;
  
    const [username_input, setUserName] = useState(userName);
    const [email_input, setEmail] = useState(email);
  
    function onSubmit() {
        updateUserProfile({
            userName: username_input,
            email: email_input
        })       
        .then(window.location.reload());
    }
  
    return (
      <div className="UpdateProfileForm">
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username"  value={username_input} onChange={event => {setUserName(event.target.value)}}/><br/><br/>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" value={email_input} onChange={event => {setEmail(event.target.value)}}/><br/><br/>
            <Button className={"btn-warning"} onClick={onSubmit}>
                Save
            </Button>
        </form>
      </div>
    );
}