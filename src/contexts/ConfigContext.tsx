import React, { useState, ReactNode } from "react";

export type Config = {
  name: string | undefined;
  serverUrl: string | undefined;
  socketioPath?: string | undefined;
  useFeedback?: boolean | undefined;
  useLogin?: boolean | undefined;
  showExplanation?: boolean | undefined;
  useWidget?: boolean | undefined;
};

type ConfigProviderProps = {
  children: ReactNode;
};

const defaultConfig: Config = {
  name: "Chatbot",
  serverUrl: "http://127.0.0.1:5000/",
  socketioPath: undefined,
  useFeedback: false,
  useLogin: false,
  showExplanation: false,
  useWidget: false,
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
