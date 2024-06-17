import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

import ReactDOM from "react-dom/client";
import { Config, ConfigProvider } from "./contexts/ConfigContext";
import { UserProvider } from "./contexts/UserContext";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { SocketProvider } from "./contexts/SocketContext";

let root: ReactDOM.Root;

declare global {
  interface Window {
    ChatWidget: (config: Partial<Config>, containerId: string) => void;
  }
}

window.ChatWidget = (config, containerId) => {
  const container = document.getElementById(containerId);
  console.log("container", container);

  if (Object.keys(config).length === 0 && container) {
    // Read data properties from the container div and use them as the config
    const dataset = container.dataset;
    config = {
      useFeedback: "useFeedback" in dataset,
      useLogin: "useLogin" in dataset,
      useWidget: "useWidget" in dataset,
      useRecommendationFrame: "useRecommendationFrame" in dataset,
    };
    if (dataset.name) config.name = dataset.name;
    if (dataset.serverUrl) config.serverUrl = dataset.serverUrl;
    if (dataset.socketioPath) config.socketioPath = dataset.socketioPath;
    if (dataset.mode) config.mode = dataset.mode;
    if (dataset.path) config.path = dataset.path;
  }

  if (!root) {
    root = ReactDOM.createRoot(container as HTMLElement);
  }

  root.render(
    <ConfigProvider>
      <SocketProvider>
        <UserProvider>
          <App user_config={config} />
        </UserProvider>
      </SocketProvider>
    </ConfigProvider>
  );
};

if (document.getElementById("chatWidgetContainer")) {
  window.ChatWidget({}, "chatWidgetContainer");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
