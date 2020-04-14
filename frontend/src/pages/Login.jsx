import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../img/one-piece.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/Auth";
import axios from "axios";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, setAuthToken } = useAuth();

  const referrer = props.location.state.referrer || "/";

  function postLogin() {
    axios
      .post("http://localhost:8080/login", { userName, password })
      .then((res) => {
        console.log(res.data.token);

        if (res.status === 200) {
          setAuthToken(res.data.token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((err) => setIsError(true));
  }

  if (authToken) {
    return <Redirect to={referrer} />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="email"
          placeholder="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
      {isError && (
        <Error>The username or password provided were incorrect!</Error>
      )}
    </Card>
  );
}

export default Login;
