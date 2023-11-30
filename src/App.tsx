import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState, createContext } from "react";
import { AppBarTop } from './AppBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home'
import Nft from './pages/nft';
import MyNfts from './pages/myNfts';
import { } from './utils/web3auth'
import { AlertColor } from '@mui/material/Alert';


export interface AlertProps {
  text: any;
  severity: any;
  show: (value: boolean) => void;
}

export const AppContext = createContext<AlertProps | null>(null)




const App: React.FC = () => {

  //State variables
  const [alertText, setAlertText] = useState<string>();
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>();
  const [open, setOpen] = useState<boolean>(false);
  var [alert] = useState<AlertProps>({
    text: setAlertText,
    severity: setAlertSeverity,
    show: setOpen,
  })

  const handleClose = (reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <AppContext.Provider value={alert}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBarTop></AppBarTop>
          <Routes>
            <Route path="PoC-AccountAbstraction/Nft" element={<Nft />} />
            <Route path="PoC-AccountAbstraction/MyNfts" element={<MyNfts/>} />
            <Route path="PoC-AccountAbstraction/" element={<Home />} />
            <Route path="*" element={<Navigate to='PoC-AccountAbstraction/' />} />
          </Routes>
          <Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose}>
            <Alert onClose={() => handleClose} severity={alertSeverity} sx={{ width: '87vw' }}>
              {alertText}
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    </AppContext.Provider>

  );
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    /*
    black2: createColor('#2c2a29'),
    white2: createColor('#ffffff'),
    yellow: createColor('#ffd204'),
    green: createColor('#00c587'),
    orange: createColor('#ff803a'),
    purple: createColor('#9f62d2'),
    pink: createColor('#ffb8d2'),
    blue: createColor('#01cdeb'),
    */
    primary: {
      main: '#2c2a29',
      contrastText: '#ffd204',
    },
    secondary: {
      main: '#f7f7f7',
      contrastText: '#2c2a29',
    },
  },

});


export default App;