import React from "react";
import {useUserProfile, isAuthenticated} from "../userAPI";
import UserProfile from "../components/UserProfile";
import FavoriteLoactions from "../components/FavoriteLocation";

export default function UserPage() {

    const { loading, res, error } = useUserProfile();
    
    
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    
    const {userName, email, favorites} = res;

    // Display user information and saved locations
    return (
        <div>
            {/*<div className="profilepage"></div>*/}

            <div className="ProfileForm">
                <h1>User Profile</h1>
                <div className="logo"></div>

                <UserProfile userName={userName} email={email}/>
                <h1>Favorite Locations</h1>
                {favorites.length == 0 ? <p>no saved locations</p> : <FavoriteLoactions locations={favorites}/>}
            </div>    

        </div>
    );
}
