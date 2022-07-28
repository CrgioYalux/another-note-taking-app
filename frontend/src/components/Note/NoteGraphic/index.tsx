import './NoteGraphic.css';
import { NoteState } from '../types';

interface NoteGraphicProps {
  noteState: NoteState;
};

export const NoteGraphic = ({ noteState }: NoteGraphicProps) => {
  return (
      <div className={`NoteGraphic ${noteState}`}></div>
  );
};
