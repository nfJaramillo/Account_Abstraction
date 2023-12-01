import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { initWeb3Auth } from './utils/web3auth.js';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Main = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeWeb3Auth = async () => {
      await initWeb3Auth();
      setIsInitialized(true);
    }
    initializeWeb3Auth();
  }, []);

  if (!isInitialized) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
)

