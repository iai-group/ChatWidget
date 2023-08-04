import "./ChatEmbedded.css";
import ChatBox from "../ChatBox/ChatBox";

export default function ChatEmbedded({ socketConnector }: any) {
  return <ChatBox socketConnector={socketConnector} />;
}
