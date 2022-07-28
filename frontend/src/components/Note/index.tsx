import './Note.css';
import { NoteGraphic } from './NoteGraphic';
import { NoteState } from './types';
import { NoteOperations } from './NoteOperations';
import { useState } from 'react';
import { useNoteDatabase } from '../../providers/NoteDatabaseProvider';
import type { Note as NoteType } from '../types';
import { useCreateEditMode } from '../../providers/CreateEditNoteProvider';
import { CreateEditNoteMode } from '../../components/CreateEditNote';

interface NoteProps {
  note: NoteType;
  noteState: NoteState;
};

export const Note = ({note, noteState}: NoteProps) => {
  const { operation } = useNoteDatabase();
  const { useMode } = useCreateEditMode();

  const editNote = (note: NoteType) => {
    useMode(CreateEditNoteMode.Edit, note);
  };

  const deleteNote = (note: NoteType) => {
    operation.DeleteOneByID(note.ID);
  };

  const recoverNote = (note: NoteType) => {
    operation.RecoverOneByID(note.ID);
  }; 

  const archiveNote = (note: NoteType) => {
    operation.Modify(note.ID, {...note, archived: true});
  }; 

  const unarchiveNote = (note: NoteType) => {
    operation.Modify(note.ID, {...note, archived: false});
  }; 

  return (
    <div className="Note">
      <NoteGraphic noteState={noteState} />
      <div className="Note_content">
        <strong>{note.title}</strong>
        <small>
          Last edited:
          <span>{new Date(note.created === note.modified ? note.created : note.modified).toLocaleString()}</span>
        </small>
      </div>
      <NoteOperations
        isArchived={note.archived}
        noteState={noteState}
        editNote={() => { editNote(note); }}
        deleteNote={() => { deleteNote(note); }}
        recoverNote={() => { recoverNote(note); }}
        archiveNote={() => { archiveNote(note); }}
        unarchiveNote={() => { unarchiveNote(note); }}
      />
    </div>
  );
};

// for comparing Date.now(), create notes with the same var, which value is date.now(), for both props 
