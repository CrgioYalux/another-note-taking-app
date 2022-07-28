import './DeletedNotesView.css';
import { useNoteDatabase } from '../../providers/NoteDatabaseProvider';
import { useView } from '../../providers/ViewProvider';
import { NoteList } from '../../components/NoteList';
import { NoteState } from '../../components/Note/types';
import { View } from '../../types';

export const DeletedNotesView = () => {
  const { state, operation } = useNoteDatabase();
  const { goToView } = useView();

  return (
    <div className="DeletedNotesView">
      <div>
        <strong>{state.deletedNotes.length} deleted notes</strong>
        <button onClick={() => operation.RecoverAll()}>Recover all</button>
      </div>
      <NoteList notes={state.deletedNotes} noteState={NoteState.Deleted} />
    </div>
  );
};

