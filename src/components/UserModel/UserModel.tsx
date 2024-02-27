import React from "react";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdb-react-ui-kit";
import { ExplanationState } from "../../types";

const UserModelComponent = ({
  user_model,
}: {
  user_model?: ExplanationState;
}) => {
  return (
    <MDBCard className="h-100" style={{ borderRadius: "15px" }}>
      <MDBCardHeader
        className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
        style={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <h5 className="mb-0 fw-bold">Natural Language User Model</h5>
      </MDBCardHeader>
      <MDBCardBody
        className="d-flex flex-column"
        style={{
          border: "1px solid #ccc",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div className="v-50 " style={{ flex: 1, overflowY: "auto" }}>
          <p>{user_model && user_model.text}</p>
        </div>
      </MDBCardBody>
      <MDBCardHeader
        className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
        style={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <h5 className="mb-0 fw-bold">Raw User Model</h5>
      </MDBCardHeader>
      <MDBCardBody
        className="d-flex flex-column"
        style={{
          border: "1px solid #ccc",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div className="v-50" style={{ flex: 1, overflowY: "auto" }}>
          <pre>
            <p>{user_model && user_model.raw}</p>
          </pre>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default UserModelComponent;
