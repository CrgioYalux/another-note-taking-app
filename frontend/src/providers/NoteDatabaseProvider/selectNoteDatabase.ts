import { useExecMode, ExecMode } from "../../providers/ExecModeProvider";
import { useStandAloneNoteDatabase } from './useStandAloneNoteDatabase';
import { useStorage } from './useStorage';
import { NoteDatabase } from './types';
import { initialValue } from './utils';
import type { Note } from '../../types';

export const selectNoteDatabase = (): NoteDatabase => {
  const { execMode } = useExecMode();
  const storage = useStorage<Note[]>(execMode, []);
  if (execMode === ExecMode.StandAlone) {
    return useStandAloneNoteDatabase(storage);
  };
  return initialValue;
};
