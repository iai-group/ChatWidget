import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from "mdb-react-ui-kit";

const PreferenceItem = ({
  topic,
  handleRemovePreference,
}: {
  topic: string;
  handleRemovePreference: (topic: string) => void;
}) => {
  return (
    <MDBCard className="mb-3">
      <MDBCardBody
        className="d-flex align-items-center justify-content-between"
        style={{ padding: ".2rem .5rem" }}
      >
        <MDBCardText
          className="ms-3"
          style={{ fontSize: "13px", padding: 0, margin: 0 }}
        >
          {topic}
        </MDBCardText>
        <MDBBtn
          size="sm"
          className="btn-danger"
          style={{
            padding: "4px 8px",
            margin: "4px",
            height: "26px",
            width: "24px",
            flexShrink: 0,
          }}
          onClick={() => handleRemovePreference(topic)}
        >
          X
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default PreferenceItem;
