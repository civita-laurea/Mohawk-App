import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { auth, db } from '../firebase';
import { selectUser } from '../features/userSlice';

function HomeScreen() {
  const user = useSelector(selectUser);

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  db.collection('users')
    .doc(user.uid)
    .get()
    .then((doc) => {
      const html = `
      <h3>First Name: ${doc.data().fname}</h3>
      <h3>Last Name: ${doc.data().lname}</h3>
      <h3>Account Type: ${doc.data().accountType}</h3>
      `;
      document.getElementById('accountInfo').innerHTML = html;
    });

  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <h1>Welcome!</h1>
        <h2>Email: {user.email}</h2>
        <div id="accountInfo" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      </Container>
    </div>
  );
}

export default HomeScreen;
