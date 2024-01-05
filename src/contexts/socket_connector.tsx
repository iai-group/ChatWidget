import { useState, useEffect, useRef, useContext } from "react";
import io, { Socket } from "socket.io-client";
import {
  UserMessage,
  AgentMessage,
  ChatMessage,
  Article,
  Settings,
  Query,
} from "../types";
import { ConfigContext, Mode } from "./ConfigContext";

const defaultSettings: Settings = {
  style: {
    name: "default",
    showStyleSwitch: false,
  },
};

export default function useSocketConnection() {
  const { config } = useContext(ConfigContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectError, setConnectError] = useState<Error | null>(null);
  const [settings, setSettings] = useState<Settings>();
  const onMessageRef = useRef<(message: ChatMessage) => void>();
  const onRecommendationRef = useRef<(articles: Article[]) => void>();
  const onBookmarkRef = useRef<(articles: Article[]) => void>();
  const onPreferenceRef = useRef<(preference: string[]) => void>();
  // const onTaskDetailsRef = useRef<(TaskDetails: TaskDetails) => void>();
  const onRestartRef = useRef<() => void>();
  const onAuthenticationRef =
    useRef<(success: boolean, error: string) => void>();

  const mergeSettings = (incomingData?: Settings) => {
    if (!incomingData) {
      return defaultSettings;
    }

    return {
      ...defaultSettings,
      ...incomingData,
      style: {
        ...defaultSettings.style,
        ...incomingData.style,
      },
    };
  };

  useEffect(() => {
    if (!config.serverUrl) {
      console.error("Missing server url");
      return;
    }

    const newSocket = io(config.serverUrl, {
      path: config.socketioPath,
    });
    setSocket(newSocket);

    newSocket.on("connect_error", (error) => {
      console.warn("Connection Error: ", error);
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

    newSocket.on("init", (settings?: Settings) => {
      const mergedSettings = mergeSettings(settings);
      setSettings(mergedSettings);
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

    // newSocket.on("task_details", (taskDetails: TaskDetails) => {
    //   onTaskDetailsRef.current && onTaskDetailsRef.current(taskDetails);
    // });

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
  }, [config.mode, config.serverUrl, config.socketioPath]);

  useEffect(() => {
    if (connectError) {
      // TODO handle connection error
      console.error("Connection error", connectError);
    }
  });

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

  // const getTaskDetails = () => {
  //   socket?.emit("get_task_details", {});
  // };

  const setStyle = (style: string) => {
    socket?.emit("set_style", { style: style });
  };

  const logEvent = (data?: {
    [key: string]: string | number | boolean | object;
  }) => {
    const to_log: Record<string, any> = {
      timestamp: new Date().toISOString(),
      page: window.location.pathname.split("/").pop(),
      ...window.localStorage,
      ...data,
    };
    socket?.emit("log_event", to_log);
  };

  const onPreferences = (callback: (topics: string[]) => void) => {
    onPreferenceRef.current = callback;
  };

  const onBookmarks = (callback: (articles: Article[]) => void) => {
    onBookmarkRef.current = callback;
  };

  // const onTaskDetails = (callback: (taskDetails: TaskDetails) => void) => {
  //   onTaskDetailsRef.current = callback;
  // };

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

  const reloadSocketConnection = () => {
    if (socket) {
      socket.disconnect();
      socket.connect();
    }
  };

  return {
    isConnected,
    settings,
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
    // getTaskDetails,
    // onTaskDetails,
    setStyle,
    logEvent,
    quickReply,
    onRestart,
    onMessage,
    onRecommendation,
    login,
    register,
    onAuthentication,
    reloadSocketConnection,
  };
}
