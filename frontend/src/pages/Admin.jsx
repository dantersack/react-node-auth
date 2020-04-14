import React from "react";
import { useAuth } from "../context/Auth";
import { Button } from "../components/AuthForm";

function Admin(props) {
  const { setAuthToken } = useAuth();

  function logOut() {
    setAuthToken();
    localStorage.removeItem("token");
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log Out</Button>
    </div>
  );
}

export default Admin;
