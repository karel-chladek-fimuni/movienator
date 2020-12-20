import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { signIn, signUp, useLoggedInUser } from '../utils/firebase';
import image from './Movienator-01.svg';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: "5rem",
        maxHeight: "5rem",
        marginTop: "3rem"
    },
  }));

export const Login: FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  // Since firebase returns informative error messages we can show them directly
  const [error, setError] = useState<string>();

  const isLoggedIn = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <Grid
        container
        direction="row"
        alignItems="stretch"
        justify="space-evenly"
        spacing={3}
        className={classes.wrapper}
        >
        <Grid item xs={10} sm={8} md={6} lg={5}>
            <Card>
            <CardContent>
                <Typography style={{ marginLeft: 5 }} color="primary" variant='h5' component='h1'>
                Sign in
                </Typography>
                <Typography style={{ marginLeft: 15 }} variant='subtitle1'>Use your Account</Typography>
                <TextField
                label='Email'
                type='email'
                name='email'
                fullWidth
                autoComplete='email'
                margin='normal'
                variant='outlined'
                value={user}
                onChange={e => setUser(e.target.value)}
                />
                <TextField
                label='Password'
                type='password'
                name='password'
                fullWidth
                margin='normal'
                variant='outlined'
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                {error && (
                <Typography variant='subtitle2' align='left' color='error' paragraph>
                    <b>{error}</b>
                </Typography>
                )}
                
            </CardContent>
            <CardActions>
                <Button
                variant='text'
                size='large'
                color='primary'
                // Handling promise with async/await
                onClick={async () => {
                    try {
                    await signUp(user, password);
                    } catch (err) {
                    setError(err.message);
                    }
                }}
                >
                Create account
                </Button>
                <Button
                variant='text'
                size='large'
                color='primary'
                // Handling promise with chained handlers
                onClick={() =>
                    signIn(user, password).catch(err => setError(err.message))
                }
                >
                Login
                </Button>
            </CardActions>
            </Card>
        </Grid>
    </Grid>
  );
};

// export default Login;