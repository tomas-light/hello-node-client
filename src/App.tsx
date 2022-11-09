import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnotherPage } from './AnotherPage';
import { HomePage } from './HomePage';
import { PageWithButtonFacade } from './PageWithButtonFacade';

// тут можно поменять цвета дефолтной темы для библиотеки material-ui
// читай подробнее на https://mui.com/material-ui/experimental-api/css-theme-variables/overview/#main-content
const theme = createTheme({});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route
            path={'/buttons'} // по этому урлу показывать AnotherPage компонент
            element={<PageWithButtonFacade />}
          />

          <Route
            path={'/another-page'} // по этому урлу показывать AnotherPage компонент
            element={<AnotherPage />}
          />

          <Route
            path={'/'} // по этому урлу показывать HomePage компонент
            element={<HomePage />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export { App };
