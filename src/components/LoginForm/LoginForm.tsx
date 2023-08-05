import React, { useContext, useEffect, useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import "./LoginForm.css";
import { UserContext } from "../../contexts/UserContext";
import { ConfigContext } from "../../contexts/ConfigContext";

const LoginForm = ({ socketConnector }: { socketConnector: any }) => {
  const { config } = useContext(ConfigContext);
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
    <div className="chat-widget-content">
      <MDBCard
        id="chatBox"
        className="chat-widget-card"
        style={{ borderRadius: "15px" }}
      >
        <MDBCardHeader
          className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <p className="mb-0 fw-bold">{config.name}</p>
        </MDBCardHeader>

        <MDBCardBody>
          <MDBCardTitle>Login</MDBCardTitle>
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
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default LoginForm;
