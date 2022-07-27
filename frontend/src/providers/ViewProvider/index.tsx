import { useState, useContext, createContext } from "react";

export type View = string | number;

interface ViewContextProps {
  currentView: View;
  goToView: (view: View) => void;
};

const ViewContext = createContext<ViewContextProps>({
  currentView: "",
  goToView: (view: View) => {}
});

export const useView = () => useContext(ViewContext);

interface ViewProviderProps {
  children: React.ReactNode;
  views: View[];
  defaultView: View;
};

export const ViewProvider = ({ children, views, defaultView }: ViewProviderProps) => {
  const [currentView, setCurrentView] = useState<View>(defaultView);

  const goToView = (view: View) => {
    if (views.find((v) => v === view)) setCurrentView(view);
  };
  
  const value = {
    currentView,
    goToView
  };

  return (
    <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
  );
};
