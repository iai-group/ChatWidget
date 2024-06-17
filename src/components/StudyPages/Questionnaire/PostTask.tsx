import BaseComponent from "../Base/Base";
import { useAppRoutes } from "../../../routes";

export default function PostTask({ user_id }: { user_id: string }) {
  const form_url = `https://docs.google.com/forms/d/e/1FAIpQLScfkasBZ7S7Dw1HfZKMmRRUExDjNFSpaaRaG6vVaB1nGioizg/viewform?usp=pp_url&entry.1506333392=${user_id}&embedded=true`;
  const routes = useAppRoutes();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <BaseComponent
      pageTitle="Post-Task Questionnaire"
      buttonText="I have Submitted the Questionnaire"
      nextPath={routes.TASK}
    >
      <iframe
        onLoad={scrollToTop}
        src={form_url}
        style={{
          width: "640px",
          height: "2588px",
          border: "0",
        }}
        title="Google Form"
      />
    </BaseComponent>
  );
}
