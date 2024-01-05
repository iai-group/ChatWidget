import { useCallback, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Config, ConfigContext } from "./contexts/ConfigContext";
import Welcome from "./components/StudyPages/Welcome";
import PreTask from "./components/StudyPages/PreTask";
import Instructions from "./components/StudyPages/Instructions";
import PostTask from "./components/StudyPages/PostTask";
import PostAllTasks from "./components/StudyPages/PostAllTasks";
import Last from "./components/StudyPages/Last";
import { AppRoutes } from "./routes";
import Task from "./components/StudyPages/Task/Task";
import { useSocket } from "./contexts/SocketContext";

export default function App({
  user_config,
}: {
  user_config?: Partial<Config>;
}) {
  const { setConfig } = useContext(ConfigContext);
  const { logEvent } = useSocket();
  const [userId, setUserId] = useState<string>("");

  const generateToken = () => {
    const token =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem(
      "userStudyID",
      JSON.stringify({ userID: "user_" + token, expiresAt: expirationTime })
    );
    return token;
  };

  const getUserStudyID = useCallback(() => {
    const storedItem = localStorage.getItem("userStudyID");
    if (storedItem) {
      const { token, expiresAt } = JSON.parse(storedItem);
      if (new Date().getTime() <= expiresAt) {
        return token;
      }
    }
    return generateToken();
  }, []);

  useEffect(() => {
    const user_id = getUserStudyID();
    setUserId(user_id);
    logEvent({ event: "App start" });
  }, [logEvent, getUserStudyID]);

  useEffect(() => {
    setConfig((prevConfig) => ({ ...prevConfig, ...user_config }));
  }, [user_config, setConfig]);

  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.HOME} element={<Welcome />} />
        <Route path={AppRoutes.INSTRUCTIONS} element={<Instructions />} />
        <Route
          path={AppRoutes.PRE_TASK}
          element={<PreTask user_id={userId} />}
        />
        <Route path={AppRoutes.TASK} element={<Task />} />
        <Route
          path={AppRoutes.POST_TASK}
          element={<PostTask user_id={userId} />}
        />
        <Route
          path={AppRoutes.POST_ALL_TASKS}
          element={<PostAllTasks user_id={userId} />}
        />
        <Route path={AppRoutes.LAST} element={<Last />} />
      </Routes>
    </Router>
  );
}

//   const content = config.useLogin && !user ? <LoginForm /> : <ChatBox />;
//   return config.useWidget ? (
//     <ChatWidget>{content}</ChatWidget>
//   ) : (
//     <ChatEmbedded>{content}</ChatEmbedded>
//   );
// }
