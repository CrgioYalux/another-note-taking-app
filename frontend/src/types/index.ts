export interface Note {
	ID: number;
	title: string;
	created: number;
	modified: number;
	author: string;
	categories: string[];
	archived: boolean;
};

export enum View {
  MyNotes = 'My Notes',
  ArchivedNotes = 'Archived Notes',
  DeletedNotes = 'Deleted Notes',
  Login = 'Login'
};
