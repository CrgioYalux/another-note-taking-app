import './App.css'; 
import { useTheme } from './providers/ThemeProvider';
import { useView } from './providers/ViewProvider';
import { MyNotesView } from './views/MyNotesView';
import { ArchivedNotesView } from './views/ArchivedNotesView';
import { DeletedNotesView } from './views/DeletedNotesView';
import { View } from './types';
import { NavMenu } from './components/NavMenu';
import { ToggleThemeButton } from './components/ToggleThemeButton';
import { useCreateEditMode } from './providers/CreateEditNoteProvider';
import { CreateEditNoteMode } from './components/CreateEditNote';

function App() {
  const { currentView } = useView();
  const { useMode } = useCreateEditMode();

  return (
    <div className="App">
      <div className="AppMenu">
        <NavMenu />
        <ToggleThemeButton />
        <button onClick={() => useMode(CreateEditNoteMode.Create, null)}>Create note</button>
      </div>
      <h1>{currentView}</h1>
      {currentView === View.MyNotes && <MyNotesView />}
      {currentView === View.ArchivedNotes && <ArchivedNotesView />}
      {currentView === View.DeletedNotes && <DeletedNotesView />}
    </div>
  );
};

export default App;
