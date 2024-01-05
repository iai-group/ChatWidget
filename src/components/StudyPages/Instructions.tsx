import BaseComponent from "./Base/Base";
import { AppRoutes } from "../../routes";

export default function Instructions() {
  return (
    <BaseComponent
      pageTitle="Instructions"
      buttonText="Next"
      nextPath={AppRoutes.TASK}
    >
      <div style={{ margin: "10px 50px" }}>
        <div className="task-description" style={{ marginBottom: "20px" }}>
          <h2>Tasks</h2>
          <p>
            In the following tasks, you will assume the role of a mentor, tasked
            with compiling a set of <strong>5-10 research papers</strong> on a
            given research topic. These papers will serve as a foundational
            resource for a student to develop the 'related work' section of a
            research paper on the specific topic. To compile your selections,
            simply <strong>bookmark</strong> your choices using the provided
            bookmark button. When you are satisfied with your selections, press{" "}
            <strong>Done</strong> in the top right corner of the page.
          </p>
        </div>

        <div className="topic-information">
          <h3>Topic Information</h3>
          <p>You will be provided with:</p>
          <ul className="topic-info">
            <li>A topic title.</li>
            <li>A detailed topic description.</li>
          </ul>
          <p>
            Use this information to find relevant arXiv articles using the
            provided conversational agent.
          </p>
        </div>

        <div className="instructions" style={{ marginBottom: "10px" }}>
          <h3>Interaction Instructions</h3>
          <p>
            Follow these guidelines to effectively interact with the
            conversational assistant:
          </p>
          <ol className="instruction-detail" style={{ marginBottom: "20px" }}>
            <li>Interact with the agent using natural language.</li>
            <li>
              The agent focuses on topics of interest, including both positive
              and negative preferences.
            </li>
            <li>
              After each conversational turn, review the recommendations and
              refine your preferences to receive better-suited recommendations.
            </li>
          </ol>
          <p>
            Before moving on to the tasks you are welcome to test out the agent{" "}
            <strong>
              <a href="https://gustav1.ux.uis.no/ada/test/">here</a>
            </strong>
            . You can try to find some papers relevant to{" "}
            <strong>your research topic</strong>.
          </p>
        </div>
      </div>
    </BaseComponent>
  );
}
