import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { useSocket } from "../../../contexts/SocketContext";

const BookmarkItem = ({
  article_id,
  title,
  authors,
  handleRemoveBookmaredkArticle,
}: {
  article_id: string;
  title: string;
  authors: string[];
  handleRemoveBookmaredkArticle: (article_id: string) => void;
}) => {
  const { logEvent } = useSocket();
  const removeBookmarkedArticle = () => {
    logEvent({
      event: "Remove bookmarked article",
      metadata: { article_id: article_id },
    });
    handleRemoveBookmaredkArticle(article_id);
  };

  return (
    <MDBCard className="mb-3">
      <MDBCardBody
        className="d-flex justify-content-between"
        style={{ padding: "1.5rem .5rem" }}
      >
        <MDBCardText style={{ fontSize: "13px" }}>{title}</MDBCardText>
        {authors && (
          <MDBCardText style={{ fontSize: "13px" }}>
            {authors.join(", ")}
          </MDBCardText>
        )}
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
          onClick={removeBookmarkedArticle}
        >
          X
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default BookmarkItem;
