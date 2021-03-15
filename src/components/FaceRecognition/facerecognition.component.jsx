import React from "react";

import "./facerecognition.styles.css";

const FaceRecognition = (props) => {
    const {box, imageUrl} = props;
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" src={imageUrl} alt="" style={{width:"500px",height:"auto"}}/>
                <div className="bounding-box" style={
                    { 
                        top: box.topRow, 
                        left: box.leftCol, 
                        right: box.rightCol,
                        bottom: box.bottomRow
                    }
                }></div>
            </div>
        </div>
    )
}

export default FaceRecognition;