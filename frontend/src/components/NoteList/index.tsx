import './NoteList.css';
import type { Note as NoteType } from '../../types';
import { NoteState } from '../Note/types';
import { Note } from '../Note';

interface NoteListProps {
  notes: NoteType[];
  noteState: NoteState;
};

export const NoteList = ({ notes = [], noteState }: NoteListProps) => {
  return (
    <ul className="NoteList">
      {notes.map((note) => {
        if (noteState === NoteState.Deleted) return (<Note noteState={NoteState.Deleted} key={note.ID} note={note}/>);
        if (note.archived) {
          if (noteState === NoteState.Archived) return (<Note noteState={NoteState.Archived} key={note.ID} note={note} />)
          else return null;
        }
        else {
          if (noteState === NoteState.Unarchived) return (<Note noteState={NoteState.Unarchived} key={note.ID} note={note} />);
          else return null;
        }
      })}
    </ul>
  );
};
