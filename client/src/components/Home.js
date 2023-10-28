import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";



function Home() {
    const [myWorkouts, setMyWorkouts] = useState([])

    // useEffect(() => {
    //     fetch()
    // }, [])
    return (
        <div>
            <NavBar/>
            <h3>Hello THIS IS HOME</h3>
            <div>

            </div>
        </div>
    )
}

export default Home