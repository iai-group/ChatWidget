import React, { useState, ReactNode } from "react";

export type Config = {
  name: string;
  serverUrl: string;
  useFeedback: boolean | false;
  useLogin: boolean | false;
  useRecommendationFrame: boolean | false;
  useWidget: boolean | false;
  socketioPath?: string | undefined;
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
