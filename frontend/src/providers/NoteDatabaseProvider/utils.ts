import { NoteDatabase } from './types';
import type { Note } from '../../types';

export const getHighestNoteID = (notes: Note[]): number => {
  let ID = 0;
  notes.map((note) => {
		if (note.ID > ID) {
			ID = note.ID;
		};
  });
  return ID;
};

export const initialValue: NoteDatabase = {
  state: {
		notes: [] as Note[],
		foundNote: null,
		deletedNotes: [] as Note[]
  },
  operation: {
		GetAll: () => {},
		GetOneByID: () => {},
		DeleteAll: () => {},
		DeleteOneByID: () => {},
		Create: () => {},
		Modify: () => {},
		CleanDeleted: () => {}
  }
};
