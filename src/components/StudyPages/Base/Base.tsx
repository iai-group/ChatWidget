import React, { ReactNode } from "react";
import { MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./Base.css";
import { AppRoutes } from "../../../routes";
import { useSocket } from "../../../contexts/SocketContext";
import { EventHandler } from "../../../types";

// Define the props type
interface BaseComponentProps {
  children: ReactNode;
  pageTitle: string;
  buttonText?: string;
  buttonHandler?: () => void;
  nextPath?: string;
  openModal?: EventHandler;
}

const BaseComponent: React.FC<BaseComponentProps> = ({
  children,
  pageTitle,
  buttonText = undefined,
  buttonHandler = undefined,
  nextPath = AppRoutes.HOME,
  openModal = undefined,
}) => {
  // const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const { logEvent } = useSocket();

  const handleContinueButtonClick = () => {
    logEvent({
      event: "navigation",
    });
    if (!!buttonHandler) buttonHandler();
    if (nextPath) navigate(nextPath);
  };

  return (
    <div className="base-component">
      <div className="header">
        <h1>{pageTitle}</h1>
        <MDBBtnGroup>
          {!!openModal && (
            <MDBBtn className="btn-lg" color="secondary" onClick={openModal}>
              Task
            </MDBBtn>
          )}
          {!!buttonText && (
            <MDBBtn
              className="btn-lg"
              color="primary"
              onClick={handleContinueButtonClick}
            >
              {buttonText}
            </MDBBtn>
          )}
        </MDBBtnGroup>
      </div>
      <div className="content-container">{children}</div>
    </div>
  );
};

export default BaseComponent;
