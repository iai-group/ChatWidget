import React, { useState, ReactNode } from "react";

export enum Mode {
  DEFAULT = "default",
  STYLE_TEST = "style_test",
  STUDY = "study",
}

export type Config = {
  name: string;
  serverUrl: string;
  useFeedback: boolean | false;
  useLogin: boolean | false;
  useRecommendationFrame: boolean | false;
  useWidget: boolean | false;
  socketioPath?: string | undefined;
  mode?: string;
};

type ConfigProviderProps = {
  children: ReactNode;
};

const defaultConfig: Config = {
  name: "Chatbot",
  serverUrl: "http://127.0.0.1:5000/",
  useFeedback: false,
  useLogin: false,
  useRecommendationFrame: false,
  useWidget: false,
  socketioPath: undefined,
  mode: Mode.DEFAULT,
};

export const ConfigContext = React.createContext<{
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
}>({
  config: defaultConfig,
  setConfig: () => {},
});

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<Config>(defaultConfig);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
