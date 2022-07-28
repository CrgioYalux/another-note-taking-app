import { useState, useContext, createContext } from "react";
import { CreateEditNote, CreateEditNoteMode } from '../../components/CreateEditNote';
import { Note } from "../../types";
import { useNoteDatabase } from "../NoteDatabaseProvider";
import { MutableNoteFields } from "../NoteDatabaseProvider/types";

interface CreateEditNoteProviderProps {
  children: React.ReactNode;
};

interface CreateEditNoteContextProps {
    startUseMode: (mode:CreateEditNoteMode, note: Note|null) => void;
    stopUseMode: (mode:CreateEditNoteMode, fields: MutableNoteFields) => void;
    endUse: () => void;
    using: boolean;
};

const CreateEditNoteContext = createContext<CreateEditNoteContextProps>({
    startUseMode: () => {}, 
    stopUseMode: () => {},
    endUse: () => {},
    using: false
});

export const useCreateEditMode = () => useContext(CreateEditNoteContext);

export const CreateEditModeProvider = ({ children }: CreateEditNoteProviderProps) => {
  const [using, setUsing] = useState<boolean>(false);
  const [mode, setMode] = useState<CreateEditNoteMode>(CreateEditNoteMode.Create);
  const [note, setNote] = useState<Note | null>(null);
  const { operation } = useNoteDatabase();

  const startUseMode = (mode:CreateEditNoteMode, note: Note|null) => {
    setUsing(true);
    setMode(mode);
    setNote(note);
  };

  const endUse = () => { setUsing(false); };

  const stopUseMode = (mode:CreateEditNoteMode, fields: MutableNoteFields) => {
    if (mode === CreateEditNoteMode.Create) operation.Create(fields);
    if (mode === CreateEditNoteMode.Edit && note) operation.Modify(note.ID, fields);
    setUsing(false);
  };

  const value = {startUseMode, stopUseMode, endUse, using};

  return (
    <CreateEditNoteContext.Provider value={value}>
        {using && <CreateEditNote mode={mode} note={note} stopUseMode={stopUseMode} />}
        {children}
    </CreateEditNoteContext.Provider>
  );
};
