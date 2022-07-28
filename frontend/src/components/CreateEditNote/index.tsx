import './CreateEditNote.css';
import { Note } from '../../types';
import { useNoteDatabase } from '../../providers/NoteDatabaseProvider';

export enum CreateEditNoteMode {
  Create = 0,
  Edit
};

interface CreateEditNoteProps {
  note: Note | null;
  mode: CreateEditNoteMode;
  stopUseMode: () => void; 
};

interface Form extends HTMLFormElement {
  TitleInput: HTMLInputElement;
  CategoriesInput: HTMLInputElement;
  ArchivedInput: HTMLInputElement;
}

export const CreateEditNote = ({ note, mode, stopUseMode }: CreateEditNoteProps) => {
  const { operation } = useNoteDatabase();

  const handleSubmit = (event: React.ChangeEvent<Form>) => {
    event.preventDefault();
    operation.Create({
      title: event.target.TitleInput.value,
      categories: event.target.CategoriesInput.value.split(' '),
      archived: event.target.ArchivedInput.checked,
      author: 'me'
    });
    stopUseMode();
  };

  return (
    <form onSubmit={handleSubmit} className="CreateEditNote">
      <label htmlFor="TitleInput">
        <strong>Title:</strong>
        <input name="TitleInput" id="titleInput" type="text"  defaultValue={!note ? "" : note.title}/>
      </label>
      <label htmlFor="CategoriesInput">
        <strong>Categories:</strong>
        <input placeholder="e.g. category1 category2 ..." name="CategoriesInput" id="CategoriesInput" type="text" defaultValue={!note ? "" : note.categories.join(' ')} />
      </label>
      <label htmlFor="ArchivedInput">
        <strong>Archived?</strong>
        <input name="ArchivedInput" id="ArchivedInput" type="checkbox" defaultChecked={!note ? false : note.archived}/>
      </label>
      <button type="submit">{mode === CreateEditNoteMode.Create ? "Create" : "Edit"}</button>
    </form>
  );
};
