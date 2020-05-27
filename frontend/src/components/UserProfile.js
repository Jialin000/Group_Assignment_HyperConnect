import React from "react";
import Button from "./Button";

export default class UserProfile extends React.Component {
render(){
   return(

    <div>
        <div className="userprofile">
            <div className="logo"></div>
            <h2>Username</h2>



            <h2>Your Favourites :</h2><br/>
            {/*button to redirect*/}
            <div>
                <Button >222 Swanston St</Button><Button >223 Swanston St</Button>
                <Button >224 Swanston St</Button><Button >225 Swanston St</Button><br/><br/><br/>
            </div>

            <div >
                222 Swanston St&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button >Find </button><br/>
                223 Swanston St&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button >Find </button><br/>
                224 Swanston St&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button >Find </button><br/>
            </div>

        </div>
    </div>
   )}
}