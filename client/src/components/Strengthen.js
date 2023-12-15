import { colors } from "@mui/material";
import { Typography } from "antd";
import React from "react";


function Strengthen() {


    return (
        <div id="introPage">

            <div id="introPageTitle">
                {/* <Typography id="title1">WORK HARD GET STRONG</Typography> */}
                <Typography id="title2"> | STRENGTHEN |</Typography>
            </div>
            <div id="introPageHeader">
                <Typography id="header1">ACCOMPLISH YOUR</Typography>
                <Typography id="header2">FITNESS GOALS</Typography>
                <div style={{backgroundColor: "rgb(255, 102, 0)", height: "10px"}}></div>
                <div id="introPageDescription">
                    <div className="descriptionContainers">
                        <div className="bulletPoints">
                            <img className="weightsBulletPoint" src="https://static.vecteezy.com/system/resources/thumbnails/018/925/267/small/dumbbell-3d-illustration-png.png" alt="dumbbell"/>
                        </div>
                        <div>
                            <Typography className = "descriptions">Free Exercises Covering All Major Muscle Groups</Typography>
                        </div>
                    </div>
                    <div className="descriptionContainers">
                        <div className="bulletPoints">
                            <img className="weightsBulletPoint" src="https://static.vecteezy.com/system/resources/thumbnails/018/925/267/small/dumbbell-3d-illustration-png.png" alt="dumbbell"/>
                        </div>
                        <div>
                            <Typography className = "descriptions">Create And Personalize Your Very Own Workout Routines</Typography>
                        </div>
                    </div>
                    <div className="descriptionContainers">
                        <div className="bulletPoints">
                            <img className="weightsBulletPoint" src="https://static.vecteezy.com/system/resources/thumbnails/018/925/267/small/dumbbell-3d-illustration-png.png" alt="dumbbell"/>
                        </div>
                        <div>
                            <Typography className = "descriptions">Select From Many Pre Existing Workout Routines</Typography>
                        </div>
                    </div>
                    <div className="descriptionContainers">
                        <div className="bulletPoints">
                            <img className="weightsBulletPoint" src="https://static.vecteezy.com/system/resources/thumbnails/018/925/267/small/dumbbell-3d-illustration-png.png" alt="dumbbell"/>
                        </div>
                        <div>
                            <Typography className = "descriptions">Create Personal Goals And Track Accomplishments</Typography>
                        </div>
                    </div>
                </div>
            </div> 
            <div id="getStartedButton">
                <Typography id="getStarted"> GET STARTED </Typography>
            </div>
        </div>
    )
}

export default Strengthen;