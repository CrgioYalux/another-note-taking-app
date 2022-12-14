import type { Note } from '../../types';

export enum NoteDatabaseOperationType {
	GetAll = 0,
	GetOneByID,
	DeleteAll,
  RecoverAll,
	DeleteOneByID,
	RecoverOneByID,
	Create,
	Modify
};

export interface MutableNoteFields {
	title: string;
	author: string;
	categories: string[];
	archived: boolean;
};

export interface NoteDatabaseOperation {
	GetAll: () => void;
	GetOneByID: (ID: number) => void;
	DeleteAll: () => void;
	RecoverAll: () => void;
	DeleteOneByID: (ID: number) => void;
	RecoverOneByID: (ID: number) => void;
	Create: (fields: MutableNoteFields) => void;
	Modify: (ID: number, fields: MutableNoteFields) => void;
	CleanDeleted: () => void;
};

export interface NoteDatabaseState {
	notes: Note[];
	foundNote: Note | null;
	deletedNotes: Note[];
};

export interface NoteDatabase {
	state: NoteDatabaseState;
	operation: NoteDatabaseOperation;
};
