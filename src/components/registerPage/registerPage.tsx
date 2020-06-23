import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RegisterForm, { RegisterFormDefaultValue } from '../../interface/RegisterForm'
import { access } from 'fs';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface RegisterPageProps {
  isDisplay?: boolean;
  registerForm?:RegisterForm;
  onSubmit: (registerForm: RegisterForm) => void;
  changePage(page:string):void;
}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const classes = useStyles();
  const [registerForm, setRegisterForm] = useState(RegisterFormDefaultValue);

  return (
    <Container component="main" maxWidth="xs" style={props.isDisplay ? {} : { display: 'none' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          註冊
        </Typography>
        <form className={classes.form} noValidate onSubmit={
          (event) => {
            event.preventDefault();

            props.onSubmit(registerForm);
          }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="account"
            label="User Account"
            name="account"
            autoComplete="account"
            autoFocus
            onChange={(event) => {
               setRegisterForm({...registerForm, account: event.target.value})
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
                setRegisterForm({...registerForm, password: event.target.value})
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={(event) => {
                setRegisterForm({...registerForm, email: event.target.value})
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            onChange={(event) => {
                setRegisterForm({...registerForm, name: event.target.value})
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="phone"
            id="phone"
            onChange={(event) => {
                setRegisterForm({...registerForm, phone: event.target.value})
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            註冊
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => {
                props.changePage("LoginPage");
              }}>
                {"已有帳號"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default RegisterPage;