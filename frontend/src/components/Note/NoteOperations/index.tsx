import './NoteOperations.css';
import { EditIcon } from '../../EditIcon';
import { DeleteIcon } from '../../DeleteIcon';
import { ArchiveIcon } from '../../ArchiveIcon';
import { UnarchiveIcon } from '../../UnarchiveIcon';
import { RecoverIcon } from '../../RecoverIcon';
import { useNoteDatabase } from '../../../providers/NoteDatabaseProvider';
import { NoteState } from '../types.ts';

interface NoteOperationsProps {
  isArchived: boolean;
  editNote: () => void;
  deleteNote: () => void;
  recoverNote: () => void;
  archiveNote: () => void;
  unarchiveNote: () => void;
  noteState: NoteState;
};

export const NoteOperations = (props: NoteOperationsProps) => {
  const {
    isArchived,
    editNote,
    deleteNote,
    recoverNote,
    archiveNote,
    unarchiveNote,
    noteState
  } = props;
  return (
    <div className="NoteOperations">
      <button 
        onClick={() => editNote()}
        className="NoteOperation_bt NoteOperation__edit_bt"
      >
        <EditIcon className={`NoteOperation_icon NoteOperation__edit_icon ${noteState}`} />
      </button>
      {
        noteState === NoteState.Deleted 
          ? (
            <button
              onClick={() => recoverNote()}
              className="NoteOperation_bt NoteOperation__recover_bt"
            >
              <RecoverIcon className={`NoteOperation_icon NoteOperation__recover_icon ${noteState}`} />
            </button>
          )
          : (
            <button
              onClick={() => deleteNote()}
              className="NoteOperation_bt NoteOperation__delete_bt"
            >
              <DeleteIcon className={`NoteOperation_icon NoteOperation__delete_icon ${noteState}`} />
            </button>
          )
      
      }
      {
        isArchived 
          ? (
            <button
              onClick={() => unarchiveNote()}
              className="NoteOperation_bt NoteOperation__unarchive_bt"
            >
              <UnarchiveIcon className={`NoteOperation_icon NoteOperation__unarchive_icon ${noteState}`} />
            </button>
          )
          : (
            <button
              onClick={() => archiveNote()}
              className="NoteOperation_bt NoteOperation__archive_bt"
            >
              <ArchiveIcon className={`NoteOperation_icon NoteOperation__archive_icon ${noteState}`} />
            </button>
          )
      }
    </div>
  );
};
