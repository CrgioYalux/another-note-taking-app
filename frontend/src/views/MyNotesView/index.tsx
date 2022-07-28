import './MyNotesView.css';
import { useNoteDatabase } from '../../providers/NoteDatabaseProvider';
import { useView } from '../../providers/ViewProvider';
import { NoteList } from '../../components/NoteList';
import { NoteState } from '../../components/Note/types';
import { View } from '../../types';

export const MyNotesView = () => {
  const { state } = useNoteDatabase();
  const { goToView } = useView();

  return (
    <div className="MyNotesView">
      <strong>{state.notes.length} notes</strong>
      <NoteList notes={state.notes} noteState={NoteState.Unarchived} />
    </div>
  );
};

