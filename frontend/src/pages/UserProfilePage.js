import React from "react";
import "../styles.css";
import Button from "../components/Button";


<div className="userprofile_box">

    <div className="userprofile">
        <div className="logo"></div>
        <h2>Username</h2>

    </div>
    <div className="userprofile_favourite">
        <h2>Your Favourites :</h2>
        {/*button to redirect*/}
        <div>
            <Button >222 Swanston St</Button>
        </div>

        <div className="Fav">
            222 Swanston St             <button >Find </button>
        </div>
    </div>
</div>