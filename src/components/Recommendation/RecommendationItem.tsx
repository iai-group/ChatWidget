import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { useSocket } from "../../contexts/SocketContext";
import "./RecommendationItem.css";

const RecommendationItem = ({
  article_id,
  title,
  authors,
}: {
  article_id: string;
  title: string;
  authors: string[];
}) => {
  const { bookmarkArticle } = useSocket();
  // const { giveRecommendationFeedback, bookmarkArticle } = useSocket();

  const handleSummaryClick = () => {};
  // const handlePositiveFeedback = () => {
  //   giveRecommendationFeedback(article_id, 1);
  // };
  // const handleNegativeFeedback = () => {
  //   giveRecommendationFeedback(article_id, -1);
  // };
  const handleBookmarkClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    const target = event.target as HTMLElement;
    target.classList.add("disabled");

    bookmarkArticle(article_id);
  };

  return (
    <MDBCard className="mb-3 recommendationCard">
      {/* <MDBCard className="mb-3 recommendationCard bg-light text-dark border-primary"> */}
      <MDBCardBody className="d-flex flex-column justify-content-between">
        <MDBCardText style={{ fontSize: "13px" }}>{title}</MDBCardText>
        {authors && (
          <MDBCardText style={{ fontSize: "13px" }}>
            {authors.join(", ")}
          </MDBCardText>
        )}
        <div className="d-flex justify-content-end">
          <MDBBtn
            size="sm"
            className="btn-secondary me-2"
            style={{ width: "100px" }}
            onClick={handleSummaryClick}
          >
            Summary
          </MDBBtn>
          <MDBBtn
            size="sm"
            className="btn-secondary me-2"
            style={{ width: "100px" }}
            onClick={handleBookmarkClick}
          >
            Bookmark
          </MDBBtn>
          {/* <MDBBtn
            size="sm"
            className="btn-secondary me-2"
            style={{ width: "122px" }}
            onClick={handlePositiveFeedback}
          >
            More like this
          </MDBBtn>
          <MDBBtn
            size="sm"
            className="btn-secondary"
            style={{ width: "122px" }}
            onClick={handleNegativeFeedback}
          >
            Less like this
          </MDBBtn> */}
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default RecommendationItem;
