import "./ChatBox.css";

import React, { useState, useEffect, useRef, useCallback } from "react";
import QuickReplyButton from "./QuickReply";

import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { AgentChatMessage, UserChatMessage } from "./ChatMessage";
import { ChatMessage } from "../types";

export default function ChatBox({
  name,
  onClose,
  connector,
  use_feedback,
}: {
  name: string;
  onClose: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  connector: {
    sendMessage: (message: { message: string }) => void;
    quickReply: (message: { message: string }) => void;
    giveFeedback: (message: string, event: string) => void;
    onMessage: (callback: (response: ChatMessage) => void) => void;
    onRestart: (callback: () => void) => void;
  };
  use_feedback: boolean;
}) {
  const [chatMessages, setChatMessages] = useState<JSX.Element[]>([]);
  const [chatButtons, setChatButtons] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const chatMessagesRef = useRef(chatMessages);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateMessages = (message: JSX.Element) => {
    chatMessagesRef.current = [...chatMessagesRef.current, message];
    setChatMessages(chatMessagesRef.current);
  };

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    updateMessages(
      <UserChatMessage
        key={chatMessagesRef.current.length}
        message={inputValue}
      />
    );
    connector.sendMessage({ message: inputValue });
    setInputValue("");
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
      connector.quickReply({ message: message });
    },
    [connector, chatMessagesRef]
  );

  const handelMessage = useCallback(
    (message: ChatMessage) => {
      if (!!message.text) {
        const image_url = message.attachments?.find(
          (attachment) => attachment.type === "images"
        )?.payload.images?.[0];
        updateMessages(
          <AgentChatMessage
            key={chatMessagesRef.current.length}
            feedback={use_feedback ? connector.giveFeedback : null}
            message={message.text}
            image_url={image_url}
          />
        );
      }
    },
    [connector, chatMessagesRef, use_feedback]
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
    connector.onMessage((message: ChatMessage) => {
      handelMessage(message);
      handleButtons(message);
    });
  }, [connector, handleButtons, handelMessage]);

  useEffect(() => {
    connector.onRestart(() => {
      setChatMessages([]);
      setChatButtons([]);
    });
  }, [connector]);

  return (
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
        <p className="mb-0 fw-bold">{name}</p>
        <a href="#!" onClick={onClose} style={{ color: "white" }}>
          <MDBIcon fas icon="angle-down" />
        </a>
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
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type message"
            ref={inputRef}
          ></input>
          <button type="submit" className="btn btn-link text-muted">
            <MDBIcon fas size="2x" icon="paper-plane" />
          </button>
        </form>
      </MDBCardFooter>
    </MDBCard>
  );
}
