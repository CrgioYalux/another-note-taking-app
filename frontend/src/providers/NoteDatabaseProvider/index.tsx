import { useContext } from "react";
import { createDatabaseContext } from '../../contexts/DatabaseContext';
import { selectNoteDatabase } from './selectNoteDatabase';
import { initialValue } from './utils';
import type { NoteDatabaseState, NoteDatabaseOperation } from './types';

interface NoteDatabaseProviderProps {
  children: React.ReactNode;
};

const NoteDatabaseContext = createDatabaseContext<NoteDatabaseState, NoteDatabaseOperation>(initialValue);

export const useNoteDatabase = () => useContext(NoteDatabaseContext);

export const NoteDatabaseProvider = ({ children }: NoteDatabaseProviderProps) => {
  const { state, operation } = selectNoteDatabase();

  const value = { state, operation };
  
  return (
    <NoteDatabaseContext.Provider value={value}>{children}</NoteDatabaseContext.Provider>
  );
};
