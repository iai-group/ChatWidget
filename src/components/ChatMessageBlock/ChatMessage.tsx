import { MDBIcon } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import Feedback from "../Feedback";

function UserChatMessage({ message }: { message: string }): JSX.Element {
  return (
    <div className="d-flex flex-row justify-content-end mb-1">
      <div
        className="p-2 ms-3 border"
        style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
      >
        <p className="small mb-0">{message}</p>
      </div>
      <div className="text-center ms-2">
        <MDBIcon fas size="2x" className="text-muted" icon="user-large" />
      </div>
      {/* <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
        alt="User"
        style={{ width: "45px", height: "100%" }}
      /> */}
    </div>
  );
}

function AgentChatMessage({
  message,
  image_url,
  feedback,
  type_output = false,
  onReady,
}: {
  message: string;
  image_url?: string;
  feedback: ((message: string, event: number) => void) | null;
  type_output?: boolean;
  onReady?: () => void;
}): JSX.Element {
  const [typingMessage, setTypingMessage] = useState("");

  useEffect(() => {
    if (!type_output) {
      setTypingMessage(message);
    } else {
      let typedMessage = "";
      let index = 0;

      const typeNextChar = () => {
        if (index < message.length) {
          typedMessage += message[index];
          setTypingMessage(typedMessage);
          index++;
          setTimeout(typeNextChar, 20); // Adjust time for typing speed
        } else {
          if (onReady) {
            onReady();
          }
        }
      };
      typeNextChar();
    }
  }, [type_output, message, onReady]);

  return (
    <div className="d-flex flex-row justify-content-start mb-1">
      <div className="text-center">
        <MDBIcon fas size="2x" className="text-muted" icon="robot" />
        {feedback && <Feedback message={message} on_feedback={feedback} />}
      </div>
      <div
        className="p-2 ms-3"
        style={{
          borderRadius: "15px",
          backgroundColor: "rgba(57, 192, 237,.2)",
        }}
      >
        {!!image_url && (
          <div className="d-flex flex-row justify-content-center">
            <img
              src={image_url}
              alt=""
              style={{ width: "200px", height: "100%" }}
            />
          </div>
        )}
        <p className="small mb-0">{typingMessage}</p>
      </div>
    </div>
  );
}

export { UserChatMessage, AgentChatMessage };
