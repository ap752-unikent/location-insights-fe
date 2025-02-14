import { Main } from './pages/main';
import { Provider as ChakraUIProvider } from './components/ui/provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { LocationAnalysis } from './pages/location-analysis';
import { PrivacyPolicy } from './pages/privacy-policy';
import { PageStateProvider } from './contexts/page-state';
import { Header } from './components/header/header';
import { VotesStateProvider } from './contexts/votes';
import { Toaster } from './components/ui/toaster';
import { LocaleStateProvider } from './contexts/internationalization';
import { Votes } from './pages/votes';
import ConsentBanner from './components/analytics-consent/analytics-consent';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraUIProvider>
        <LocaleStateProvider>
          <ConsentBanner />
          <PageStateProvider>
            <VotesStateProvider>
              <Toaster />
              <Router>
                <Header />
                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/votes' element={<Votes />} />
                  <Route path='/location-analysis/:district' element={<LocationAnalysis />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
              </Router>
            </VotesStateProvider>
          </PageStateProvider>
        </LocaleStateProvider>
      </ChakraUIProvider>
    </QueryClientProvider>
  );
}

export default App;
