import ChatWidget from "./components/Widget/ChatWidget";
import ChatEmbedded from "./components/Embedded/ChatEmbedded";
import useSocketConnection from "./socket_connector";
import { useContext } from "react";
import { ConfigContext } from "./contexts/ConfigContext";

export default function App() {
  const { config } = useContext(ConfigContext);
  const socketConnector = useSocketConnection(
    config.serverUrl,
    config.socketioPath
  );

  return config.useWidget ? (
    <ChatWidget socketConnector={socketConnector} />
  ) : (
    <ChatEmbedded socketConnector={socketConnector} />
  );
}
