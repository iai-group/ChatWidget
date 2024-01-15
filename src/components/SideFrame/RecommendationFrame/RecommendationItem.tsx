import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";
import "./RecommendationItem.css";
import { Article } from "../../../types";
import { useState } from "react";

const RecommendationItem = ({
  article,
  isBookmarked,
  toggleBookmarkClick,
}: {
  article: Article;
  isBookmarked: boolean;
  toggleBookmarkClick: () => void;
}) => {
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
            // disabled={isBookmarked}
            size="sm"
            className={`me-2 ${isBookmarked ? "btn-danger" : "btn-secondary"}`}
            style={{ width: "100px" }}
            onClick={toggleBookmarkClick}
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
            <p
              style={{ fontSize: "14px" }}
              dangerouslySetInnerHTML={{ __html: article.abstract }}
            />
          </div>
        </MDBCollapse>
      </MDBCardBody>
    </MDBCard>
  );
};

export default RecommendationItem;
