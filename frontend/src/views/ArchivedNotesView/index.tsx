import './ArchivedNotesView.css';
import { useNoteDatabase } from '../../providers/NoteDatabaseProvider';
import { useView } from '../../providers/ViewProvider';
import { NoteList } from '../../components/NoteList';
import { NoteState } from '../../components/Note/types';
import { View } from '../../types';

export const ArchivedNotesView = () => {
  const { state } = useNoteDatabase();
  const { goToView } = useView();

  return (
    <div className="ArchivedNotesView">
      <strong>{state.notes.length} archived notes</strong>
      <NoteList notes={state.notes} noteState={NoteState.Archived} />
    </div>
  );
};

