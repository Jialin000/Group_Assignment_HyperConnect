import React from "react";
import { updateUserProfile } from "../userAPI";
import { useState, useEffect } from "react";
import Button from "../components/Button";


export default function UserProfile(props) {
    const { userName, email } = props;
    
    const [username_value, setUserName] = useState(userName);
    const [email_value, setEmail] = useState(email);
    const [showUpdate, setShowUpdate] = useState(false);

    function cancelSubmit(){
        setUserName(userName);
        setEmail(email);
        setShowUpdate(!showUpdate);
    }

    
    function onSubmit() {
        updateUserProfile({
            userName: username_value,
            email: email_value
        }).then(res => {
            if (res.status == 200){
                alert("Change has been saved!");
                setShowUpdate(!showUpdate);

            }else if(res.status == 401){
                alert("Please log in");
                window.location.replace("/users/login");

            }else{
                alert("Error updating, please try again");
            }
        })                      
    }


    function ProfileForm() {        
        return (
            <div className="ProfileForm">
                <p>Username: {username_value}</p><br/>
                <p>Email: {email_value}</p><br/>
                <Button className={"btn"} onClick={()=>setShowUpdate(!showUpdate)}>
                    Edit my profile
                </Button>
            </div>
        );
    }

    // the form allow users to update their information
    function UpdateProfileForm() {
        return (
        <div className="UpdateProfileForm">
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username"  
                    value={username_value} 
                    onChange={event => {setUserName(event.target.value)
                }}/>
                <br/><br/>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" 
                    value={email_value} 
                    onChange={event => {setEmail(event.target.value)
                }}/>
                <br/><br/>
                <Button className={"btn-warning"} onClick={onSubmit}>
                    Save
                </Button>
                <Button className={"btn"} onClick={cancelSubmit}>
                    Cancel
                </Button>
            </form>
        </div>
        );
    }

    return (
      <div className="userProfile">          
        {showUpdate ? <UpdateProfileForm/> : <ProfileForm/>}                  
      </div>
    );
}
 
