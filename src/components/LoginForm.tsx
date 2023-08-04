import React, { useContext, useEffect, useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { UserContext } from "../contexts/UserContext";

const LoginForm = ({ socketConnector }: { socketConnector: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    socketConnector.login(username, password);
  };

  const handleAnonymousLogin = () => {
    setUser({ username: "Anonymous", isAnonymous: true });
  };

  // This is where we handle the server's response to the login attempt.
  // We're assuming the server will respond with an "loginResponse" event.
  useEffect(() => {
    socketConnector.onLogin((success: boolean, message: string) => {
      if (success) {
        setUser({ username, isAnonymous: false });
      } else {
        alert(message); // Show the error message from the server.
      }
    });
  }, [socketConnector, setUser, username]);

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Login</MDBCardTitle>
        <MDBCardText>
          <form onSubmit={handleLogin}>
            <MDBInput
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn type="submit">Sign In</MDBBtn>
            <MDBBtn onClick={handleAnonymousLogin}>Anonymous</MDBBtn>
          </form>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default LoginForm;
