import "./ChatBox.css";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import QuickReplyButton from "../QuickReply";
import { useSocket } from "../../contexts/SocketContext";
import { UserContext } from "../../contexts/UserContext";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBCardFooter,
  MDBSwitch,
} from "mdb-react-ui-kit";
import {
  AgentChatMessage,
  UserChatMessage,
} from "../ChatMessageBlock/ChatMessage";
import { ChatMessage } from "../../types";
import { ConfigContext } from "../../contexts/ConfigContext";
import { log } from "console";

export enum StyleOption {
  DEFAULT = "default",
  CONSIDERATE = "considerate",
  INVOLVED = "involved",
}

type Keystroke = {
  key: string;
  timestamp: string;
};

export function ChatBox({
  style,
  showStyleSwitch = false,
}: {
  style: StyleOption;
  showStyleSwitch?: boolean;
}) {
  const { config } = useContext(ConfigContext);
  const { user } = useContext(UserContext);
  const {
    // settings,
    startConversation,
    sendMessage,
    quickReply,
    onMessage,
    onRestart,
    giveFeedback,
    setStyle,
    logEvent,
  } = useSocket();
  const [chatMessages, setChatMessages] = useState<JSX.Element[]>([]);
  const [chatButtons, setChatButtons] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [keystrokes, setKeystrokes] = useState<Keystroke[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>();
  // const [showStyleSwitch, setShowStyleSwitch] = useState<boolean>();
  const [lockedInput, setLockedInput] = useState(false);
  const chatMessagesRef = useRef(chatMessages);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateMessages = (message: JSX.Element) => {
    chatMessagesRef.current = [...chatMessagesRef.current, message];
    setChatMessages(chatMessagesRef.current);
  };

  // useEffect(() => {
  //   if (settings) {
  //     setSelectedStyle(settings?.style?.name);
  //     setShowStyleSwitch(settings?.style?.showStyleSwitch);
  //   }
  // }, [settings]);

  useEffect(() => {
    setSelectedStyle(style);
    setStyle(style);
  }, [style, setStyle]);

  useEffect(() => {
    if (selectedStyle !== undefined && chatMessagesRef.current.length === 0) {
      startConversation();
    }
  }, [selectedStyle, chatMessagesRef, startConversation]);

  const handleKeystrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setKeystrokes([
      ...keystrokes,
      { key: value[value.length - 1], timestamp: new Date().toISOString() },
    ]);
  };

  const unlockInput = () => {
    setLockedInput(false);
  };

  useEffect(() => {
    if (inputRef.current && !lockedInput) {
      inputRef.current.focus();
    }
  }, [lockedInput]);

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    updateMessages(
      <UserChatMessage
        key={chatMessagesRef.current.length}
        message={inputValue}
      />
    );
    setLockedInput(true);
    sendMessage({ message: inputValue, metadata: { keystrokes: keystrokes } });
    setInputValue("");
    setKeystrokes([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleQuickReply = useCallback(
    (message: string) => {
      updateMessages(
        <UserChatMessage
          key={chatMessagesRef.current.length}
          message={message}
        />
      );
      quickReply({ message: message });
    },
    [chatMessagesRef, quickReply]
  );

  const handleMessage = useCallback(
    (message: ChatMessage) => {
      if (!message.text) {
        return;
      }

      setLockedInput(true);
      const text = message.text as string;
      const image_url = message.attachments?.find(
        (attachment) => attachment.type === "images"
      )?.payload.images?.[0];
      if (selectedStyle === StyleOption.INVOLVED) {
        const sentences = text.match(/[^.!?]+[.!?]+/g);
        let index = 0;

        const typeNextSentence = () => {
          if (
            sentences &&
            index < sentences.length &&
            !!sentences[index].trim()
          ) {
            updateMessages(
              <AgentChatMessage
                key={chatMessagesRef.current.length}
                feedback={config.useFeedback ? giveFeedback : null}
                message={sentences[index]}
                image_url={image_url}
                type_output={false}
              />
            );
            index++;
            setTimeout(typeNextSentence, 500); // Adjust time for typing speed
          } else {
            unlockInput();
          }
        };
        typeNextSentence();
      } else if (selectedStyle === StyleOption.CONSIDERATE) {
        updateMessages(
          <AgentChatMessage
            key={chatMessagesRef.current.length}
            feedback={config.useFeedback ? giveFeedback : null}
            message={text}
            image_url={image_url}
            type_output={true}
            onReady={unlockInput}
          />
        );
      } else {
        updateMessages(
          <AgentChatMessage
            key={chatMessagesRef.current.length}
            feedback={config.useFeedback ? giveFeedback : null}
            message={text}
            image_url={image_url}
            type_output={false}
          />
        );
        unlockInput();
      }
    },
    [giveFeedback, chatMessagesRef, config, selectedStyle]
  );

  const handleButtons = useCallback(
    (message: ChatMessage) => {
      const buttons = message.attachments?.find(
        (attachment) => attachment.type === "buttons"
      )?.payload.buttons;
      if (!!buttons && buttons.length > 0) {
        setChatButtons(
          buttons.map((button, index) => {
            return (
              <QuickReplyButton
                key={index}
                text={button.title}
                message={button.payload}
                click={handleQuickReply}
              />
            );
          })
        );
      } else {
        setChatButtons([]);
      }
    },
    [handleQuickReply]
  );

  useEffect(() => {
    onMessage((message: ChatMessage) => {
      handleMessage(message);
      handleButtons(message);
    });
  }, [onMessage, handleButtons, handleMessage]);

  useEffect(() => {
    onRestart(() => {
      setChatMessages([]);
      setChatButtons([]);
    });
  }, [onRestart]);

  const handleStyleChange = () => {
    const style =
      selectedStyle === StyleOption.INVOLVED
        ? StyleOption.CONSIDERATE
        : StyleOption.INVOLVED;
    setSelectedStyle(style);
    setStyle(style);
    logEvent({
      event: "Change style",
      metadata: { style: style },
    });
  };

  return (
    <div className="chat-widget-content">
      <MDBCard
        id="chatBox"
        className="chat-widget-card"
        style={{ borderRadius: "15px" }}
      >
        <MDBCardHeader
          className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <p className="mb-0 fw-bold">{config.name}</p>
          <div className="mb-0 d-flex align-items-center">
            <p className="mb-0 fw-bold">{user?.username}</p>
            <p className="mb-0 fw-bold mx-2">Considerate </p>{" "}
            <MDBSwitch
              checked={selectedStyle === StyleOption.INVOLVED}
              onChange={handleStyleChange}
              disabled={!showStyleSwitch}
              style={!showStyleSwitch ? { opacity: 0.3 } : {}}
            />
            <p className="mb-0 fw-bold mx-2">Involved </p>
            {/* <div className="mx-2">
              <button
                className={`btn ${
                  selectedStyle === "considerate" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => handleStyleChange("considerate")}
              >
                Considerate
              </button>
              <button
                className={`btn ${
                  selectedStyle === "default" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => handleStyleChange("default")}
              >
                Default
              </button>
              <button
                className={`btn ${
                  selectedStyle === "involved" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => handleStyleChange("involved")}
              >
                Involved
              </button>
            </div> */}
          </div>
        </MDBCardHeader>

        <MDBCardBody>
          <div className="card-body-messages">
            {chatMessages}
            <div className="d-flex flex-wrap justify-content-between">
              {chatButtons}
            </div>
          </div>
        </MDBCardBody>
        <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-2">
          <form className="d-flex flex-grow-1" onSubmit={handleInput}>
            <input
              type="text"
              className="form-control form-control-lg"
              id="ChatInput"
              onChange={handleKeystrokeChange}
              placeholder="Type message"
              ref={inputRef}
              disabled={lockedInput}
            ></input>
            <button type="submit" className="btn btn-link text-muted">
              <MDBIcon fas size="2x" icon="paper-plane" />
            </button>
          </form>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}
