import BaseComponent from "./Base/Base";
import { AppRoutes } from "../../routes";

export default function PostAllTasks({ user_id }: { user_id: string }) {
  const form_url = `https://docs.google.com/forms/d/e/1FAIpQLSeYh8pHKf8lZIvf32T0K1XCiox2NJFWxg7CEATOFI-qvB1CHQ/viewform?usp=pp_url&entry.192811754=${user_id}&embedded=true`;

  return (
    <BaseComponent
      pageTitle="The Final Questionnaire"
      buttonText="Next"
      nextPath={AppRoutes.LAST}
    >
      <iframe
        src={form_url}
        style={{
          width: "640px",
          height: "1826px",
          border: "0",
        }}
        title="Google Form"
      />
    </BaseComponent>
  );
}
