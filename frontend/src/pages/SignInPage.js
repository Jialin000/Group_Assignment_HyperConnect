import React from "react";
import SignInForm from "../components/SignInForm"
import Button from "../components/Button";
import { isAuthenticated } from "../userAPI";
import UserProfile from "../components/UserProfile";

import "../styles.css"

export default function SignInPage() {
    if (isAuthenticated('Authorization')){
        return (
            <div className="login_bg">
                <div className="login_box">
                    <UserProfile />
                </div>
            </div>

        );
    } else{
        return (
      <div className="login_bg">
          <div className="login_box">
             <SignInForm />
          </div>
      </div>
    );
  }
}

//     <div className="userprofile_box">
//
//         <div className="userprofile">
//             <div className="logo"></div>
//                 <h2>Username</h2>
//
//         </div>
//         <div className="userprofile_favourite">
//             <h2>Your Favourites :</h2>
//             {/*button to redirect*/}
//             <div>
//                 <Button >222 Swanston St</Button>
//             </div>
//
//             <div className="Fav">
//                 222 Swanston St             <button >Find </button>
//             </div>
//         </div>
//     </div>