import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu1 from "./pages/Menu1";
import Menu2 from "./pages/Menu2";
import Menu3 from "./pages/Menu3";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App(props) {
  const [authToken, setAuthToken] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
      setLoggedIn(true);
    }
  }, []);

  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };

  function logout() {
    setAuthToken();
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  const navigation = (
    <div>
      <ul>
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/menu1">Menu 1</Link>
        </li>
        <li>
          <Link to="/menu2">Menu 2</Link>
        </li>
        <li>
          <Link to="/menu3">Menu 3</Link>
        </li>
        <li>
          <Link onClick={logout}>Logout</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken: setToken, isLoggedIn, setLoggedIn }}
    >
      <Router>
        {isLoggedIn ? navigation : null}

        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/menu1" component={Menu1} />
          <PrivateRoute exact path="/menu2" component={Menu2} />
          <PrivateRoute exact path="/menu3" component={Menu3} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
