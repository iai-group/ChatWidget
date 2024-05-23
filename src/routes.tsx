import urlJoin from "url-join";
import { useContext } from "react";
import { ConfigContext } from "./contexts/ConfigContext";

export function useAppRoutes() {
  const { config } = useContext(ConfigContext);

  return {
    HOME: urlJoin(config.path, "/"),
    PRE_TASK: urlJoin(config.path, "/pre-task"),
    INSTRUCTIONS: urlJoin(config.path, "/instructions"),
    TASK: urlJoin(config.path, "/task"),
    POST_TASK: urlJoin(config.path, "/post-task"),
    POST_ALL_TASKS: urlJoin(config.path, "/post-all-tasks"),
    LAST: urlJoin(config.path, "/last"),
    INVOLVED: urlJoin(config.path, "/involved"),
    CONSIDERATE: urlJoin(config.path, "/considerate"),
    DEFAULT: urlJoin(config.path, "/default"),
  };
}
