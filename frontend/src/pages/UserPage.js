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
            <div>
                <h1>User Profile</h1>
                <UserProfile userName={userName} email={email}/>  
            </div>    
            <div>
                <h1>Favorite Loactions</h1>
                <FavoriteLoactions locations={favorites}/>             
            </div>
        </div>
    );
}
