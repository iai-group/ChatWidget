import "./Frame.css";

import { useContext } from "react";
import { MDBCard, MDBCardHeader } from "mdb-react-ui-kit";
import { ConfigContext } from "../../contexts/ConfigContext";
import { UserContext } from "../../contexts/UserContext";

export default function Frame({
  children,
  title,
}: {
  children: JSX.Element;
  title?: string;
}) {
  const { config } = useContext(ConfigContext);
  const { user } = useContext(UserContext);

  return (
    <div className="chat-widget-content">
      <MDBCard className="chat-widget-card" style={{ borderRadius: "15px" }}>
        <MDBCardHeader
          className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <p className="mb-0 fw-bold">{title ? title : config.name}</p>
          {user?.username && !title && (
            <p className="mb-0 fw-bold">{user?.username}</p>
          )}
        </MDBCardHeader>
        {children}
      </MDBCard>
    </div>
  );
}
