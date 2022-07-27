import { useExecMode, ExecMode } from "../../providers/ExecModeProvider";
import { useStandAloneNoteDatabase } from './useStandAloneNoteDatabase';
import { useDependentNoteDatabase } from './useDependentNoteDatabase';
import { useStorage } from './useStorage';

export const selectNoteDatabase = (): NoteDatabase => {
  const { execMode } = useExecMode();
  const storage = useStorage<Note[]>(execMode, []);
  if (execMode === ExecMode.StandAlone) {
    return useStandAloneNoteDatabase(storage);
  };
  return initialValue;
};
