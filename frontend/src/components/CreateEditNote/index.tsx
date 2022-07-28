import './CreateEditNote.css';
import { Note } from '../../types';
import { MutableNoteFields } from '../../providers/NoteDatabaseProvider/types';

export enum CreateEditNoteMode {
  Create = 0,
  Edit
};

interface CreateEditNoteProps {
  note: Note | null;
  mode: CreateEditNoteMode;
  stopUseMode: (mode: CreateEditNoteMode, fields: MutableNoteFields) => void; 
};

interface Form extends HTMLFormElement {
  TitleInput: HTMLInputElement;
  CategoriesInput: HTMLInputElement;
  ArchivedInput: HTMLInputElement;
}

export const CreateEditNote = ({ note, mode, stopUseMode }: CreateEditNoteProps) => {

  const handleSubmit = (event: React.ChangeEvent<Form>) => {
    event.preventDefault();
    stopUseMode(
      mode,
      {
        title: event.target.TitleInput.value,
        archived: event.target.ArchivedInput.checked,
        author: "me",
        categories: event.target.CategoriesInput.value.split(' ')
      });
  };

  return (
    <form onSubmit={handleSubmit} className="CreateEditNote">
      <label className="Input__default_class" htmlFor="TitleInput">
        <div>
          <strong>Title:</strong>
          <input className="Input_field__default_class" name="TitleInput" id="titleInput" type="text"  defaultValue={!note ? "" : note.title}/>
        </div>
      </label>
      <label  className="Input__default_class" htmlFor="CategoriesInput">
        <div>
          <strong>Categories:</strong>
          <input  className="Input_field__default_class"  placeholder="e.g. category1 category2 ..." name="CategoriesInput" id="CategoriesInput" type="text" defaultValue={!note ? "" : note.categories.join(' ')} />
        </div>
      </label>
      <label className="Input__default_class" htmlFor="ArchivedInput">
        <div>
          <strong>Archived?</strong>
          <input className="Input_field__default_class" name="ArchivedInput" id="ArchivedInput" type="checkbox" defaultChecked={!note ? false : note.archived}/>
        </div>
      </label>
      <button type="submit">{mode === CreateEditNoteMode.Create ? "Create" : "Edit"}</button>
    </form>
  );
};
