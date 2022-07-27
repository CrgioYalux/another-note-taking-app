export interface Note {
	ID: number;
	title: string;
	created: number;
	modified: number;
	author: string;
	categories: string[];
	archived: boolean;
};

