import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import logoImg from "../img/one-piece.jpg";
import { Card, Logo, Form, Input, Button } from "../components/AuthForm";
import { useAuth } from "../context/Auth";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, setAuthToken, setLoggedIn } = useAuth();

  const referrer = props.location.state ? props.location.state.referrer : "/";

  function postLogin() {
    axios
      .post("http://localhost:8080/login", { email, password })
      .then((res) => {
        console.log(res.data.token);

        if (res.status === 200) {
          setAuthToken(res.data.token);
          setLoggedIn(true);
        } else {
          console.log("Login failed.");
        }
      })
      .catch((err) => console.log(err));
  }

  if (authToken) {
    //return <Redirect to="/" />;
    return <Redirect to={referrer} />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
    </Card>
  );
}

export default Login;
