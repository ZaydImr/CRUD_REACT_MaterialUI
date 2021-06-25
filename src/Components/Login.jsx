import React,{ useState } from 'react'
import Container from '@material-ui/core/Container'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useEffect } from 'react'
import axios from 'axios'
import ReactSession from 'react-client-session'

const Login = () => {
      const [username,setUsername]=useState('');
      const [password,setPassword]=useState('');
      const [check,setCheck] = useState(false);
      const [tst,setTst] = useState(false);

      const handleSubmit=()=>{
            axios({
                  method:'GET',
                  params:{user:username,password:password},
                  url:process.env.REACT_APP_API+'/'+username
            }).then((res)=>{
                  if(res.data!=='Boom')
                  {
                        if(check){
                              ReactSession.setStoreType('Cookie');
                              ReactSession.set('username',username);
                        }
                        else{

                        }
                  }
                  else
                        setTst(true);
            })
      }
      useEffect(()=>{
            setTst(false);
      },[username,password])
      return (
                  <Container style={{width:400,margin:'auto',backgroundColor:'#fff',padding:16,borderRadius:8}}>
                        {tst&& (<Alert severity="error">
                                          <AlertTitle><strong>Error</strong></AlertTitle>
                                          The informations bellow incorrect !! <strong>Try Again.</strong>
                                    </Alert>)}
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
                                    value={username}
                                    onChange={(e)=>{setUsername(e.target.value)}}
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
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                              />
                              <FormControlLabel
                                    control={<Checkbox value='remember' color='primary' value={check} onChange={e=>setCheck(!check)}/>}
                                    label='Remember me'
                              />
                              <Button
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    size='large'
                                    onClick={handleSubmit}>
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
