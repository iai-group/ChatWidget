import {
  MDBModalDialog,
  MDBModalBody,
  MDBBtn,
  MDBModalContent,
  MDBModalFooter,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";

const Modal = ({
  modalOpen,
  closeModal,
  style,
}: {
  modalOpen: boolean;
  closeModal: () => void;
  style?: string;
}) => {
  return (
    <MDBModal show={modalOpen} onHide={closeModal} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            {/* <MDBModalTitle>{taskDetails.title}</MDBModalTitle> */}
            <MDBModalTitle>Find Relevant Articles</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={closeModal}
            ></MDBBtn>
          </MDBModalHeader>

          <MDBModalBody>
            {/* <p>{taskDetails.body}</p> */}
            <p>
              Your task is to identify and select between{" "}
              <strong>5-10 research papers</strong> based on the provided
              research topic. Use the conversational recommender system to
              discover papers. <strong>Bookmark</strong> papers you find
              relevant.
            </p>
            <p>
              For this task{" "}
              {style === "optional" ? (
                "You can now switch between the two styles during conversation"
              ) : (
                <>
                  ADA uses <strong>{style}</strong> style.
                </>
              )}
            </p>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={closeModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default Modal;
