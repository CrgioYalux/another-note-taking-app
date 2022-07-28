import { ThemeProvider } from '../../providers/ThemeProvider';
import { ExecModeProvider } from '../../providers/ExecModeProvider';
import { NoteDatabaseProvider } from '../../providers/NoteDatabaseProvider';
import { ViewProvider } from '../../providers/ViewProvider';
import { CreateEditModeProvider } from '../../providers/CreateEditNoteProvider';
import { View } from '../../types';

interface ProvidersWrapperProps {
  children: React.ReactNode;
};

export const ProvidersWrapper = ({ children }: ProvidersWrapperProps) => {
  return (
    <ExecModeProvider>
      <NoteDatabaseProvider>
        <CreateEditModeProvider>
        <ThemeProvider>
          <ViewProvider views={Object.values(View)} defaultView={View.MyNotes}>
            {children}
          </ViewProvider>
        </ThemeProvider>
        </CreateEditModeProvider>
      </NoteDatabaseProvider>
    </ExecModeProvider>
  );
};
