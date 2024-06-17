import BaseComponent from "../Base/Base";
import { useAppRoutes } from "../../../routes";

export default function PreTask({ user_id }: { user_id: string }) {
  const form_url = `https://docs.google.com/forms/d/e/1FAIpQLSeQbuTnegBwCcEeZAPRATqLy4MseuKhZsKGvez-Me6MmWjFiw/viewform?usp=pp_url&entry.1573045245=${user_id}&embedded=true`;
  const routes = useAppRoutes();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <BaseComponent
      pageTitle="Pre-Task Questionnaire"
      buttonText="I have Submitted the Questionnaire"
      nextPath={routes.INSTRUCTIONS}
    >
      <iframe
        onLoad={scrollToTop}
        src={form_url}
        style={{
          width: "640px",
          height: "1764px",
          border: "0",
        }}
        title="Google Form"
      />
    </BaseComponent>
  );
}
