import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { AgentMessage, UserMessage, ChatMessage, Article } from "../types";

export default function useSocketConnection(
  url: string = "http://127.0.0.1:5000",
  path: string | undefined
) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectError, setConnectError] = useState<Error | null>(null);
  const onMessageRef = useRef<(message: ChatMessage) => void>();
  const onRecommendationRef = useRef<(articles: Article[]) => void>();
  const onBookmarkRef = useRef<(articles: Article[]) => void>();
  const onPreferenceRef = useRef<(preference: string[]) => void>();
  const onRestartRef = useRef<() => void>();
  const onAuthenticationRef =
    useRef<(success: boolean, error: string) => void>();

  useEffect(() => {
    const newSocket = io(url, { path: path });
    setSocket(newSocket);

    newSocket.on("connect_error", (error) => {
      console.error("Connection error", error);
      setConnectError(error); // Set connection error
    });

    newSocket.on("connect_timeout", () => {
      console.error("Connection timeout");
      setConnectError(new Error("Connection timeout")); // Set timeout as connection error
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      setConnectError(null);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("message", (response: AgentMessage) => {
      if (response.info) {
        console.log(response.info);
      }
      if (response.message) {
        onMessageRef.current && onMessageRef.current(response.message);
      }
    });

    newSocket.on("recommendations", (articles: Article[]) => {
      onRecommendationRef.current && onRecommendationRef.current(articles);
    });

    newSocket.on("bookmarks", (articles: Article[]) => {
      onBookmarkRef.current && onBookmarkRef.current(articles);
    });
    newSocket.on("preferences", (preferences: string[]) => {
      onPreferenceRef.current && onPreferenceRef.current(preferences);
    });

    newSocket.on("restart", () => {
      onRestartRef.current && onRestartRef.current();
    });

    newSocket.on("authentication", ({ success, error }) => {
      onAuthenticationRef.current &&
        onAuthenticationRef.current(success, error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [url, path]);

  const startConversation = () => {
    socket?.emit("start_conversation", {});
  };

  const sendMessage = (message: UserMessage) => {
    socket?.emit("message", message);
  };

  const quickReply = (message: UserMessage) => {
    socket?.emit("message", message);
  };

  const giveFeedback = (message: string, feedback: number) => {
    socket?.emit("feedback", { message: message, feedback: feedback });
  };

  const giveRecommendationFeedback = (item_id: string, feedback: number) => {
    socket?.emit("recommendation_feedback", {
      item_id: item_id,
      feedback: feedback,
    });
  };

  const bookmarkArticle = (item_id: string) => {
    socket?.emit("bookmark_article", { item_id: item_id });
  };

  const removeBookmarkedArticle = (item_id: string) => {
    socket?.emit("remove_bookmark", { item_id: item_id });
  };

  const removePreference = (topic: string) => {
    socket?.emit("remove_preference", { topic: topic });
  };

  const getBookmarks = () => {
    socket?.emit("get_bookmarks", {});
  };

  const getPreferences = () => {
    socket?.emit("get_preferences", {});
  };

  const onPreferences = (callback: (topics: string[]) => void) => {
    onPreferenceRef.current = callback;
  };

  const onBookmarks = (callback: (articles: Article[]) => void) => {
    onBookmarkRef.current = callback;
  };

  const onRecommendation = (callback: (articles: Article[]) => void) => {
    onRecommendationRef.current = callback;
  };

  const onMessage = (callback: (response: ChatMessage) => void) => {
    onMessageRef.current = callback;
  };

  const onRestart = (callback: () => void) => {
    onRestartRef.current = callback;
  };

  const login = (username: string, password: string) => {
    socket?.emit("login", { username, password });
  };

  const register = (username: string, password: string) => {
    socket?.emit("register", { username, password });
  };

  const onAuthentication = (
    callback: (success: boolean, error: string) => void
  ) => {
    onAuthenticationRef.current = callback;
  };

  return {
    isConnected,
    startConversation,
    sendMessage,
    giveFeedback,
    giveRecommendationFeedback,
    bookmarkArticle,
    removeBookmarkedArticle,
    getBookmarks,
    onBookmarks,
    removePreference,
    getPreferences,
    onPreferences,
    quickReply,
    onRestart,
    onMessage,
    onRecommendation,
    login,
    register,
    onAuthentication,
  };
}
