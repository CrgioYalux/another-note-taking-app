import { useEffect, useState, useMemo } from 'react';
import type { NoteDatabase, NoteDatabaseOperation, Note, MutableNoteFields } from './types';
import type { useLocalStorageReturns } from '../../hooks/useLocalStorage';
import { getHighestNoteID } from './utils';


interface StandAloneNoteDatabaseOperationProps {
	setFound: React.Dispatch<React.SetStateAction<Note|null>>;
	setDeleted: React.Dispatch<React.SetStateAction<Note[]>>;
	operation: LocalStorageOperation;
	localStorageKey: string;
	state: {
		notes: Note[];
		nextID: number;
	};
};

const StandAloneNoteDatabaseOperation = (props: StandAloneNoteDatabaseOperationProps): NoteDatabaseOperation => {
	const { state, operation, localStorageKey, setFound, setDeleted } = props;
	const { notes, nextID } = state;

	return {
		GetAll: () => {
			operation.GetItem(localStorageKey);
		},
		GetOneByID: (ID: number) => {
			const found: Note | null = notes.filter((note) => note.ID === ID)[0] || null;
			if (found !== null) setFound(found);
		},
		Create: (fields: MutableNoteFields) => {
			const created: Note = {
				...fields,
				created: Date.now(),
				modified: Date.now(),
				ID: nextID
			};
			operation.SetItem(localStorageKey, JSON.stringify([...notes, created]));
		},
		DeleteAll: () => {
			setDeleted(notes);
			operation.SetItem(localStorageKey, JSON.stringify([]));
		},
		DeleteOneByID: (ID: number) => {
			let found: Note[] = [];
			const modified = notes.filter((note) => {
				if (note.ID !== ID) return note;
				found.push(note);
			});
			if (found.length !== 0) {
				setDeleted(prev => [...prev, ...found]);
				operation.SetItem(localStorageKey, JSON.stringify(modified));
			};
		},
		CleanDeleted: () => {},
		Modify: (ID: number, fields: MutableNoteFields) => {
			let found: boolean = false;
			const modified = notes.map((note) => {
				if (note.ID !== ID) return note;
				else {
					found = true;
					return {
						...fields,  
						ID,
						created: note.created,
						modified: Date.now()
					};
				}
			});
			if (found) {
				operation.SetItem(localStorageKey, JSON.stringify(modified));
			};
		}
	};
};

export type StandAloneNoteStorage = useLocalStorageReturns<Note[]>;

export const useStandAloneNoteDatabase = (storage: StandAloneNoteStorage): NoteDatabase => {
  const localStorageKey = "NotesStorage";

  useEffect(() => {
    storage.operation.GetItem(localStorageKey);
  }, []);

  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);
  const [foundNote, setFoundNote] = useState<Note | null>(null);
  const state = useMemo(() => {
    return { notes: storage.state ?? [], nextID: getHighestNoteID([...storage.state ?? [], ...deletedNotes]) + 1 };
  }, [storage]);

  return {
    state: {
      notes: state.notes,
      deletedNotes,
      foundNote
    },
    operation: StandAloneNoteDatabaseOperation({
      localStorageKey,
      state,
      operation: storage.operation,
      setDeleted: setDeletedNotes,
      setFound: setFoundNote
    })
  };
};
