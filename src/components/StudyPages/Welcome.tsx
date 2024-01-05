import BaseComponent from "./Base/Base";
import { AppRoutes } from "../../routes";

export default function Welcome() {
  return (
    <BaseComponent
      pageTitle="Welcome to the Study"
      buttonText="Start"
      nextPath={AppRoutes.PRE_TASK}
    >
      <div style={{ margin: "10px 50px" }}>
        <div className="welcome" style={{ marginBottom: "20px" }}>
          <p>
            We appreciate your participation in this research. Please read the
            following information carefully before proceeding.
          </p>
        </div>

        <div className="study-focus" style={{ marginBottom: "20px" }}>
          <h3>About the Study</h3>
          <p>
            This study explores the impact of different conversational styles in
            human-agent interaction. It is split into three tasks. In the first
            two you will encounter two distinct styles of conversational agents.
            These styles are designed to offer varied experiences in terms of
            interaction and information delivery. In the final task, you will be
            given the choice to select the conversational style you prefer for
            the agent to use.
          </p>
        </div>

        <div className="instructions" style={{ marginBottom: "15px" }}>
          <h3>Navigation Instructions</h3>
          <p>
            To navigate through the study, please use the button located at the
            top right corner of each page.
          </p>
        </div>

        <div
          className="time-estimate"
          style={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          <p>Estimated Time to Complete: 30-45 minutes</p>
        </div>

        <div className="content">
          <h3>Study Content Overview</h3>
          <ol className="content-section" style={{ marginLeft: "20px" }}>
            <li>Introductory questionnaire</li>
            <li>
              Instructions on the usage of the conversational assistant (ADA)
            </li>
            <li>Three tasks, each followed by a post-task questionnaire</li>
          </ol>
        </div>
      </div>
    </BaseComponent>
  );
}
