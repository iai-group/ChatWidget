import { useContext, useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketContext";
import {
  MDBInput,
  MDBBtn,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import "./LoginForm.css";
import { UserContext } from "../../contexts/UserContext";
import Frame from "../Frame/Frame";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const { login, onLogin, register, onRegister } = useSocket();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnonymousLogin = () => {
    setUser({ username: "Anonymous", isAnonymous: true });
  };

  const handleLogin = () => {
    login(username, password);
  };

  const handleRegister = () => {
    register(username, password);
  };

  useEffect(() => {
    onLogin((success: boolean, error: string) => {
      if (success) {
        setUser({ username, isAnonymous: false });
      } else {
        setErrorMessage(error);
      }
    });
    onRegister((success: boolean, error: string) => {
      if (success) {
        setUser({ username, isAnonymous: false });
      } else {
        setErrorMessage(error);
      }
    });
  }, [onLogin, onRegister, setUser, setErrorMessage, username]);

  return (
    <Frame>
      <MDBCardBody className="login">
        <MDBCardTitle>Login</MDBCardTitle>
        <MDBInput
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <MDBInput
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <MDBCardText className="text-danger">{errorMessage}</MDBCardText>
        )}
        <div className="d-flex justify-content-between mt-3">
          <MDBBtn onClick={handleRegister}>Register</MDBBtn>
          <MDBBtn onClick={handleLogin}>Sign In</MDBBtn>
          <MDBBtn onClick={handleAnonymousLogin}>Anonymous</MDBBtn>
        </div>
      </MDBCardBody>
    </Frame>
  );
};

export default LoginForm;
