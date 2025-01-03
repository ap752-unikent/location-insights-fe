import { TabType } from '../types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PageState = {
  activeTab: TabType;
  scrollPosition: number;
  pageNumber: number;
}

type PageStateContextValue = {
  state: PageState;
  updateState: (newState: Partial<PageState>) => void;
}

const PageStateContext = createContext<PageStateContextValue | undefined>(undefined);

type PageStateProviderProps = {
  children: ReactNode;
}

export const PageStateProvider: React.FC<PageStateProviderProps> = ({ children }) => {
  const [state, setState] = useState<PageState>({
    activeTab: 'questionnaire',   
    scrollPosition: 0, 
    pageNumber: 1,
  });

  const updateState = (newState: Partial<PageState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <PageStateContext.Provider value={{ state, updateState }}>
      {children}
    </PageStateContext.Provider>
  );
};

export const usePageState = (): PageStateContextValue => {
  const context = useContext(PageStateContext);
  if (!context) {
    throw new Error('usePageState must be used within a PageStateProvider');
  }
  return context;
};
