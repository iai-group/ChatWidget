import RecommendationItem from "./RecommendationItem";
import { useSocket } from "../../contexts/SocketContext";
import { useEffect, useState } from "react";
import { Article } from "../../types";

const RecommendationFrame = ({
  onFrameUpdate,
}: {
  onFrameUpdate: () => void;
}) => {
  const { onRecommendation } = useSocket();
  const [recommendationState, setRecommendationsState] = useState<
    JSX.Element[]
  >([]);

  useEffect(() => {
    onRecommendation((articles: Article[]) => {
      const recommendationItems = articles.map((article, index) => (
        <RecommendationItem
          key={index}
          article_id={article.item_id}
          title={article.title}
          authors={article.authors}
        />
      ));
      setRecommendationsState(recommendationItems);
      onFrameUpdate();
    });
  }, [onRecommendation, onFrameUpdate]);

  return <>{recommendationState}</>;
};

export default RecommendationFrame;
