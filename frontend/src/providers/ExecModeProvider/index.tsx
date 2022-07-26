import { useState, useContext, createContext } from "react";

export enum ExecMode {
  StandAlone = 'standalone',
  Dependent = 'dependent'
};

interface ExecModeProviderProps {
  children: React.ReactNode;
};

interface ExecModeContextProps {
  execMode: ExecMode;
};

const ExecModeContext = createContext<ExecModeContextProps>({
  execMode: ExecMode.StandAlone
});

export const getExecMode = (): ExecMode => {
  const execMode = process.env.EXEC_MODE;
  if (!execMode) return ExecMode.StandAlone;
  return execMode as ExecMode;
};

export const useExecMode = () => useContext(ExecModeContext);

export const ExecModeProvider = ({ children }:ExecModeProviderProps) => {
  const [execMode] = useState<ExecMode>(() => getExecMode());

  const value = {
    execMode
  };

  return (
    <ExecModeContext.Provider value={value}>{children}</ExecModeContext.Provider>
  );
};
