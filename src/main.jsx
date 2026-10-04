import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import theme from './theme/theme';
import { store } from './app/store';
import ErrorBoundary from './components/common/ErrorBoundary';
import DevDiagnostics from './components/common/DevDiagnostics';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          {import.meta.env.DEV && <DevDiagnostics />}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);