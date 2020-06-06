import React from 'react';

class HideFavorite extends React.Component{

    constructor(){
        super();
        this.state={
            show:false
        }
    }
    render(){
        return (
            <div className="info_help">
                <header >
                    <div>
                        {
                            this.state.show? <div>
                               <h7> 1P = 1 hour only  <br/>
                                   Dis = Disabled only <br/>
                                    MTR = need to pay using the meter <br/>
                                   LZ = Loading Zone  <br/>
                                   M-SAT = Monday - Saturday  <br/>
                                   RPE = Resident Permit Excepted <br/>

                            </h7>
                            </div> : null
                        }
                        <button onClick={()=>{this.setState({show:!this.state.show})}}>{ this.state.show? 'Hide' : 'Show'} Help?</button>
                    </div>
                </header>
            </div>
        );
    }
}

export default HideFavorite;