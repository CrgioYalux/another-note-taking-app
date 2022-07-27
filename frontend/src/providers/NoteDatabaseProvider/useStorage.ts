import { ExecMode } from "../../providers/ExecModeProvider";
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const useStorage = <T,>(execMode: ExecMode, initialState: T) => {
  if (execMode === ExecMode.StandAlone) return useLocalStorage<T>(initialState);
  return useLocalStorage<T>(initialState);
};
