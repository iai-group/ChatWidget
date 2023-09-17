import { MDBContainer } from "mdb-react-ui-kit";
import { useSocket } from "../../contexts/SocketContext";
import { useCallback, useEffect, useState } from "react";
import { Article } from "../../types";
import BookmarkItem from "./BookmarkItem";

const BookmarkFrame = ({ isActive }: { isActive: boolean }) => {
  const { getBookmarks, onBookmarks, removeBookmarkedArticle } = useSocket();
  const [bookmarkState, setBookmarkState] = useState<JSX.Element[]>([]);

  const handleRemoveBookmaredkArticle = useCallback(
    (article_id: string) => {
      removeBookmarkedArticle(article_id);
      setBookmarkState((prev) =>
        prev.filter((item) => item.key !== article_id)
      );
    },
    [removeBookmarkedArticle]
  );

  useEffect(() => {
    if (isActive) {
      getBookmarks();
    }
  }, [isActive, getBookmarks]);

  useEffect(() => {
    onBookmarks((articles: Article[]) => {
      const bookmarkItems = articles.map((article, index) => (
        <BookmarkItem
          key={article.item_id}
          article_id={article.item_id}
          title={article.title}
          authors={article.authors}
          handleRemoveBookmaredkArticle={handleRemoveBookmaredkArticle}
        />
      ));
      setBookmarkState(bookmarkItems);
    });
  }, [onBookmarks, handleRemoveBookmaredkArticle]);

  return (
    <MDBContainer>
      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
        {bookmarkState}
      </div>
    </MDBContainer>
  );
};

export default BookmarkFrame;
