import BaseComponent from "../Base/Base";
import { AppRoutes } from "../../../routes";
import ChatEmbedded from "../../Embedded/ChatEmbedded";
import { ChatBox, StyleOption } from "../../ChatBox/ChatBox";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useSocket } from "../../../contexts/SocketContext";

export default function Task() {
  const [modalOpen, setModalOpen] = useState(true);
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const [taskStyle, setTaskStyle] = useState<string>();
  const { reloadSocketConnection, logEvent } = useSocket();
  const [userReadInstructions, setUserReadInstructions] = useState(false);

  useEffect(() => {
    reloadSocketConnection();
    const taskIndex = parseInt(localStorage.getItem("taskIndex") || "0");
    const taskStyle =
      localStorage.getItem("taskStyle") ||
      (Math.random() < 0.5 ? "considerate" : "involved");
    setTaskIndex(taskIndex);
    setTaskStyle(taskStyle);

    localStorage.setItem("taskIndex", taskIndex + "");
    localStorage.setItem("taskStyle", taskStyle + "");
  }, []);

  const taskCompleted = () => {
    logEvent({
      event: "Task completed",
    });
    localStorage.setItem("taskIndex", (taskIndex + 1).toString());
    if (taskStyle === "involved")
      localStorage.setItem("taskStyle", "considerate");
    else localStorage.setItem("taskStyle", "involved");
  };

  const openModal = () => {
    logEvent({
      event: "Open task description",
    });
    setModalOpen(true);
  };
  const closeModal = () => {
    logEvent({
      event: "Close task description",
    });
    setModalOpen(false);
    setUserReadInstructions(true);
  };

  return (
    <BaseComponent
      pageTitle={`ArXivDigest Assistant (ADA) - Task ${taskIndex + 1}`}
      buttonText="Done"
      buttonHandler={taskCompleted}
      nextPath={
        taskIndex === 2 ? AppRoutes.POST_ALL_TASKS : AppRoutes.POST_TASK
      }
      openModal={openModal}
    >
      {userReadInstructions && (
        <ChatEmbedded task_index={taskIndex}>
          <ChatBox
            style={
              taskStyle === "involved"
                ? StyleOption.INVOLVED
                : StyleOption.CONSIDERATE
            }
            showStyleSwitch={taskIndex === 2}
          />
        </ChatEmbedded>
      )}
      <Modal
        modalOpen={modalOpen}
        closeModal={closeModal}
        style={taskIndex === 2 ? "optional" : taskStyle}
      />
    </BaseComponent>
  );
}
