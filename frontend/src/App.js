import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App(props) {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
  }, []);

  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
