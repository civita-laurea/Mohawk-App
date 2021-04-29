import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

// Displays copyright in the footer.
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://civitalaurea.com/">
        Civita Laurea
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Styles for register form.
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

// Registers the user using firebase authentication.
export default function Register() {
  const classes = useStyles();

  const [signUp, setSignUp] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [emailListingValue, setEmailListingValue] = useState('false');
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((authUser) => {
        db.collection('users').doc(authUser.user.uid).set({
          fname: firstNameValue,
          lname: lastNameValue,
          accountType: roleValue,
          emailListing: emailListingValue,
          courses: [],
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      {signUp ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={(e) => setFirstNameValue(e.target.value)}
                      value={firstNameValue}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={(e) => setLastNameValue(e.target.value)}
                      value={lastNameValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => setEmailValue(e.target.value)}
                      value={emailValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Account Role</FormLabel>
                      <RadioGroup
                        aria-label="Account Role"
                        name="student"
                        required
                        value={roleValue}
                        onChange={(e) => setRoleValue(e.target.value)}
                      >
                        <FormControlLabel
                          value="Student"
                          control={<Radio />}
                          label="Student"
                        />
                        <FormControlLabel
                          value="Instructor"
                          control={<Radio />}
                          label="Instructor"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => setPasswordValue(e.target.value)}
                      value={passwordValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="true"
                          color="primary"
                          onChange={(e) => setEmailListingValue(e.target.value)}
                        />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={register}
                >
                  Register
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5} />
            <Copyright />
          </Container>
        </>
      )}
    </div>
  );
}
