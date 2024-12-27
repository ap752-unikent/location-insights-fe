import React, { createContext, useContext, useState, ReactNode, useReducer } from 'react';
import { Question, questions } from '../constants';

type State = {
    questionsAnswers: QuestionAnswer[],
}

const initialState: State = {
    questionsAnswers: []
}

export type QuestionAnswer = {
    id: string,
    value: number
}

type QuestionContextType = {
    state: State;
    actions: {
        setQuestionAnswer: (id: string, value: number) => void;
    }
}

type Action =
    | { type: 'SET_QUESTION_ANSWER'; payload: { id: string, value: number } }

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

type QuestionContextProviderProps = {
    children: ReactNode;
}

const questionAnswersSelectedReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_QUESTION_ANSWER':
            const question = questions.find((question) => question.id === action.payload.id);
            if (!question) {
                return state;
            }

            let questionsAnswers = Array.from(state.questionsAnswers);
            const existingAnswer = questionsAnswers.find((answer) => answer.id === action.payload.id);

            if (existingAnswer) {
                existingAnswer.value = action.payload.value;
                questionsAnswers = questionsAnswers.map((answer) => answer.id === action.payload.id ? existingAnswer : answer);
            } else {
                questionsAnswers.push({
                    id: action.payload.id,
                    value: action.payload.value
                });
            }

            return { ...state, questionsAnswers };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const QuestionsAnswerProvider: React.FC<QuestionContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(questionAnswersSelectedReducer, initialState);

    const setQuestionAnswer = (id: string, value: number) => {
        dispatch({ type: 'SET_QUESTION_ANSWER', payload: { id, value } });
    }

    return (
        <QuestionContext.Provider value={{ state, actions: {
            setQuestionAnswer
        }}}>
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestionsAnswersContext = (): QuestionContextType => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error('useQuestionsAnswers must be used within a QuestionsAnswerProvider');
    }
    return context;
};