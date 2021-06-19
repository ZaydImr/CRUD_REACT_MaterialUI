import React from 'react'
import Container from '@material-ui/core/Container'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const Login = () => {
      return (
                  <Container style={{width:400,margin:'auto',backgroundColor:'#fff',padding:16,borderRadius:8}}>
                        <h2 style={{textAlign:'center'}}>Sign in</h2>
                        <FormGroup>
                              <TextField
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    required
                                    id='txtUsername'
                                    label='Username'
                                    autoFocus
                                    autoComplete='Username'
                              />
                              <TextField
                                    variant='outlined'
                                    margin='normal'
                                    label='Password'
                                    type='password'
                                    required
                                    fullWidth
                                    id='txtPass'
                                    autoComplete='current-password'
                              />
                              <FormControlLabel
                                    control={<Checkbox value='remember' color='primary'/>}
                                    label='Remember me'
                              />
                              <Button
                                    type='button'
                                    color='primary'
                                    variant='contained'
                                    size='large'>
                                          Sign in
                              </Button>
                              <Grid container style={{marginTop:5}}>
                                    <Grid item xs>
                                          <Link to='/'>
                                                Forgot password?
                                          </Link>
                                    </Grid>
                                    <Grid item>
                                          <Link to='register'>
                                                Don't have an account? Sign up
                                          </Link>
                                    </Grid>
                              </Grid>
                        </FormGroup>
                  </Container>
      )
}

export default Login
