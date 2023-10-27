import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(user)

  function onLogIn(currentUserLogin) {
    setUser(currentUserLogin)
  }

  if (user) {
    return (
      <div className="page">
        <NavBar/>
        <Home/>
      </div>
    )
  } else {
    return (
      <div className="login">
        <Login onLogIn={onLogIn}/>
      </div>
    )
  }
    
}

export default App;
