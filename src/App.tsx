import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './pages/main';
import { Provider as ChakraUIProvider } from './components/ui/provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { QuestionsAnswerProvider } from './contexts/questions';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraUIProvider>
        <QuestionsAnswerProvider>
          <Main />
        </QuestionsAnswerProvider>
      </ChakraUIProvider>
    </QueryClientProvider>
  );
}

export default App;
