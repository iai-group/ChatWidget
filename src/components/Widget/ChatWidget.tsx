import "./ChatWidget.css";
import { useState, MouseEvent } from "react";
import ChatBox from "../ChatBox/ChatBox";
import { MDBIcon } from "mdb-react-ui-kit";

export default function ChatWidget({ socketConnector }: any) {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    setIsChatBoxOpen(isChatBoxOpen ? false : true);
  }

  return (
    <div className="chat-widget-container">
      <div className="chat-widget-icon">
        <a href="#!" onClick={handleClick} className="text-muted">
          <MDBIcon fas icon="robot" />
        </a>
      </div>
      <div className="chat-widget-box">
        {isChatBoxOpen && <ChatBox socketConnector={socketConnector} />}
      </div>
    </div>
  );
}
