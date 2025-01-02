import './App.css';
import { Main } from './pages/main';
import { Provider as ChakraUIProvider } from './components/ui/provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { QuestionsAnswerProvider } from './contexts/questions';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { LocationAnalysis } from './pages/location-analysis';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraUIProvider>
        <QuestionsAnswerProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/location-analysis/:district' element={<LocationAnalysis />} />
            </Routes>
          </Router>
        </QuestionsAnswerProvider>
      </ChakraUIProvider>
    </QueryClientProvider>
  );
}

export default App;
