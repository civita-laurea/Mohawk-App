import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import routes from './routes';
import 'react-perfect-scrollbar/dist/css/styles.css';
import theme from './theme';
import GlobalStyles from './components/GlobalStyles';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';

// Main component that checks the users state. (Logged in or Logged out)
const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const routing = useRoutes(routes(user));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
      document.body.style.display = 'block';
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
