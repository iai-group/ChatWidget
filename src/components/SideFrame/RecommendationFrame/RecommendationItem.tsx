import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useSocket } from "../../../contexts/SocketContext";
import "./RecommendationItem.css";
import { Article } from "../../../types";
import { useState } from "react";

const RecommendationItem = ({ article }: { article: Article }) => {
  const { bookmarkArticle, logEvent } = useSocket();
  // const { giveRecommendationFeedback, bookmarkArticle } = useSocket();
  const [showSummary, setShowSummary] = useState(false);

  const handleSummaryClick = () => {
    setShowSummary(!showSummary);
  };
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

    logEvent({
      event: "Bookmark article",
      metadata: { article_id: article.item_id },
    });
    bookmarkArticle(article.item_id);
  };

  return (
    <MDBCard
      className="recommendationCard"
      style={{
        border: "1px solid #ccc",
        marginBottom: "-1px",
        borderRadius: "0",
      }}
    >
      {/* <MDBCard className="mb-3 recommendationCard bg-light text-dark border-primary"> */}
      <MDBCardBody className="d-flex flex-column justify-content-between">
        <MDBCardText style={{ fontSize: "15px" }}>{article.title}</MDBCardText>
        {article.authors && (
          <MDBCardText style={{ fontSize: "12px" }}>
            {article.authors.join(", ")}
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
        <MDBCollapse show={showSummary}>
          <div className="mt-3">
            <p style={{ fontSize: "14px" }}>{article.abstract}</p>
          </div>
        </MDBCollapse>
      </MDBCardBody>
    </MDBCard>
  );
};

export default RecommendationItem;
