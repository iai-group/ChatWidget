import BaseComponent from "./Base/Base";
import { AppRoutes } from "../../routes";

export default function PostTask({ user_id }: { user_id: string }) {
  const form_url = `https://docs.google.com/forms/d/e/1FAIpQLScfkasBZ7S7Dw1HfZKMmRRUExDjNFSpaaRaG6vVaB1nGioizg/viewform?usp=pp_url&entry.1506333392=${user_id}&embedded=true`;

  return (
    <BaseComponent
      pageTitle="Post-Task Questionnaire"
      buttonText="I have Submitted the Questionnaire"
      nextPath={AppRoutes.TASK}
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
