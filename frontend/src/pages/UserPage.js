import React from "react";
import {useUserProfile} from "../API/userAPI";
import UserProfile from "../components/UserProfile";
import FavoriteLoactions from "../components/FavoriteLocation";
import "../views/styles.css";

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
            <div className="profilepage"></div>
            <div className="ProfileForm">
                <div className="userprofile_form"></div>
                <div>
                    <h1>User Profile</h1>
                    <UserProfile userName={userName} email={email}/>
                    <br/><br/>
                </div>
                <div className="userprofile_favorite">
                    <h1>Favorite Locations</h1>
                    <FavoriteLoactions locations={favorites}/>
                </div>

            </div>
        </div>
    );
}
