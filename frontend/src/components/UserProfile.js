import React from "react";
import { updateUserProfile } from "../API/userAPI";
import { useState } from "react";
import  {Button}  from 'antd';


export default function UserProfile(props) {
    const { userName, email } = props;
    
    const [username_value, setUserName] = useState(userName);
    const [showUpdate, setShowUpdate] = useState(false);

    function cancelSubmit(){
        setUserName(userName);
        setShowUpdate(!showUpdate);
    }

    
    function onSubmit() {
        if(!username_value){
            return;
        }
        updateUserProfile({
            userName: username_value,
        }).then(res => {
            if (res.status === 200){
                alert("Change has been saved!");
                setShowUpdate(!showUpdate);

            }else if(res.status === 401){
                alert("Please log in");
                window.location.replace("/users/login");

            }else{
                alert("Error updating, please try again");
            }
        })                      
    }


    function ProfileForm() {        
        return (
            <div >

                <h3>Username: <br/></h3>
                <p>{username_value}<br/></p>
                <h3>Email: <br/></h3>
                <p>{email}</p><br/>
                <Button className="btn" onClick={()=>setShowUpdate(!showUpdate)}>
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
                <label htmlFor="username">Username: </label><br/>
                <input type="text" name="username"  
                    value={username_value} 
                    onChange={event => {setUserName(event.target.value)
                }}/>
                {!username_value ? <p>*Username can not be empty</p>: null}
                <br/><br/>
                <h3>Email: <br/></h3>
                <p>{email}</p>
                <br/><br/>
                <Button className="btn" onClick={onSubmit}>
                    Save
                </Button><br/><br/>
                <Button className="btn" onClick={cancelSubmit}>
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
 
