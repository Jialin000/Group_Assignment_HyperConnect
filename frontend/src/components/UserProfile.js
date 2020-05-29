import React from "react";
import Button from "./Button";

export default class UserProfile extends React.Component {
render(){
   return(

    <div>
        <div className="userprofile">
            <div className="logo"></div>
            <br/>
            <h2>Username</h2>
            <br/><br/>
            <h2>Your Favourites :</h2><br/>
            {/*button to redirect*/}
            <div>
                <button className="btn">222 Swanston St</button><button className="btn">223 Swanston St</button>
                <button className="btn">224 Swanston St</button><button className="btn">225 Swanston St</button><br/><br/><br/>
            </div>

            <div >
                <button className="btn" >224 Swanston St</button><br/>
                <button className="btn">224 Swanston St</button><br/>
            </div>

        </div>
    </div>
   )}
}