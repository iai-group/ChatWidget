import { useContext } from "react";
import { ConfigContext } from "./contexts/ConfigContext";
import { UserContext } from "./contexts/UserContext";
import ChatBox from "./components/ChatBox/ChatBox";
import LoginForm from "./components/LoginForm/LoginForm";
import ChatWidget from "./components/Widget/ChatWidget";
import ChatEmbedded from "./components/Embedded/ChatEmbedded";
import ExplainableBox from "./components/Explainability/ExplainableBox";

export default function App() {
  const { config } = useContext(ConfigContext);
  const { user } = useContext(UserContext);

  const showExplanation = config.showExplanation && user?.username;
  const content = !user ? <LoginForm /> : <ChatBox />;
  return config.useWidget ? (
    <ChatWidget>{content}</ChatWidget>
  ) : (
    <ChatEmbedded>
      {showExplanation && (
        <div className="col md-6">
          <ExplainableBox />
        </div>
      )}
      <div className={showExplanation ? "col md-6" : "col md-12"}>
        {content}
      </div>
    </ChatEmbedded>
  );
}
