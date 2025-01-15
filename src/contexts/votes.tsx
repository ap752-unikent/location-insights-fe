import { TOTAL_VOTES, VoteCategory } from '../constants';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { categories } from '../constants';
import { allVotesUsed } from '../utils/all-votes-used';
import { usePageState } from './page-state';
import { useEditable } from '@chakra-ui/react';

export type VotesState = {
  votes: VoteCategory[];
}

type Direction = "increment" | "decrement";

type VotesStateContextValue = {
  state: VotesState;
  updateCategory: (category: VoteCategory, direction: Direction) => void;
  clearVotes: () => void;
}

const VotesStateContext = createContext<VotesStateContextValue | undefined>(undefined);

type VotesStateProviderProps = {
  children: ReactNode;
}

const initialVotes = categories;

export const VotesStateProvider: React.FC<VotesStateProviderProps> = ({ children }) => {

  const { updateState } = usePageState();
  const [state, setState] = useState<VotesState>({
    votes: initialVotes
  });

  useEffect(() => {
    updateState({ pageNumber: 1 });
  }, [state.votes]);

  const updateCategory = (category: VoteCategory, direction: Direction) => {

    if (allVotesUsed({ votes: state.votes }) && direction === "increment") {
      return;
    }

    const existingCategory = state.votes.find((c) => c.id === category.id);

    if (!existingCategory) {
      setState((prevState) => ({ ...prevState, votes: [...prevState.votes, category] }));
      return;
    }

    const updatedCategories = state.votes.map((c) => c.id === category.id ? category : c);

    setState((prevState) => ({ ...prevState, votes: updatedCategories }));
    return;
  };

  const clearVotes = () => {
    setState((prevState) => ({ ...prevState, votes: initialVotes }));
  }

  return (
    <VotesStateContext.Provider value={{ state, updateCategory, clearVotes }}>
      {children}
    </VotesStateContext.Provider>
  );
};

export const useVotesContext = (): VotesStateContextValue => {
  const context = useContext(VotesStateContext);
  if (!context) {
    throw new Error('useVotesState must be used within a VotesStateProvider');
  }
  return context;
};
