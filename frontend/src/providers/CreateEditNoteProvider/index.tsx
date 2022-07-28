import { useState, useContext, createContext } from "react";
import { CreateEditNote, CreateEditNoteMode } from '../../components/CreateEditNote';
import { Note } from "../../types";

interface CreateEditNoteProviderProps {
  children: React.ReactNode;
};

interface CreateEditNoteContextProps {
    useMode: (mode:CreateEditNoteMode, note: Note|null) => void;
    stopUseMode: () => void;
};

const CreateEditNoteContext = createContext<CreateEditNoteContextProps>({
    useMode: () => {}, 
    stopUseMode: () => {}
});

export const useCreateEditMode = () => useContext(CreateEditNoteContext);

export const CreateEditModeProvider = ({ children }: CreateEditNoteProviderProps) => {
  const [using, setUsing] = useState<boolean>(false);
  const [mode, setMode] = useState<CreateEditNoteMode>(CreateEditNoteMode.Create);
  const [note, setNote] = useState<Note | null>(null);


  const useMode = (mode:CreateEditNoteMode, note: Note|null) => {
    setUsing(true);
    setMode(mode);
    setNote(note);
  };

  const stopUseMode = () => {setUsing(false);};

  const value = {useMode, stopUseMode};

  return (
    <CreateEditNoteContext.Provider value={value}>
        {using && <CreateEditNote mode={mode} note={note} stopUseMode={stopUseMode}/>}
        {children}
    </CreateEditNoteContext.Provider>
  );
};
