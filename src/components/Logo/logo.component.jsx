import React from "react";
import Tilt from 'react-tilt';

import "./logo.styles.css";
import brain from "./brain.png";

const Logo = () => {
    return(
        <div className="mt0 ma4">                
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: "5px", height: "80%", width: "80%"}} alt="logo" src={brain}/> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;