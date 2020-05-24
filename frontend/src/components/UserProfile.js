import React from "react";
import Button from "./Button";

export default class UserProfile extends React.Component {
render(){
   return(

    <div className="userprofile_box">

        <div className="userprofile">
            <div className="logo"></div>
            <h2>Username</h2>

        </div>
        <div className="userprofile_favourite">
            <h2>Your Favourites :</h2>
            {/*button to redirect*/}
            <div>
                <Button >222 Swanston St</Button><br/><br/><br/>
            </div>

            <div className="Fav">
                222 Swanston St&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button >Find </button>
            </div>
        </div>
    </div>)}}