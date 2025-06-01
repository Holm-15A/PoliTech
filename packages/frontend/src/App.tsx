import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { KokkaiSearchPage } from './pages/KokkaiSearchPage';
// import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/kokkai-search"
                element={<KokkaiSearchPage />}
              />
            </Routes>
          </Layout>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
