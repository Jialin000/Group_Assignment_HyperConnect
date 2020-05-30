import React from 'react';
import FavoriteLocations from "../pages/SearchPage";

class HideFavorite extends React.Component{

    constructor(){
        super();
        this.state={
            show:true
        }
    }
    render(){
        return (
            <div >
                <header >
                    <div>
                        {
                            this.state.show? <div>

                                <FavoriteLocations/>


                            </div> : null
                        }
                        <button onClick={()=>{this.setState({show:!this.state.show})}}>{ this.state.show? 'Hide' : 'Show'} My Favorites</button>
                    </div>
                </header>
            </div>
        );
    }
}

export default HideFavorite;