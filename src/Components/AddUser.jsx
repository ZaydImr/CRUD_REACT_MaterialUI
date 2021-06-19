import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

const api = axios.create({
      baseURL:`http://localhost:5000/weatherforecast`
})

const useStyles = makeStyles((theme) => ({
      modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
      },
      paper: {
            textAlign:'center',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius:5,
      },
      frmGroup:{

      },
      frmControl:{
            display:'flex',
            gap:20
      },
      btn:{
            margin:'10px auto 0',
      }
}));

export default function TransitionsModal({open,setOpen}) {
      const classes = useStyles();

      const handleOpen = () => {
            setOpen(true);
      };

      const handleClose = () => {
            setOpen(false);
      };

      const handleAdd =()=>{
            //api.post('/',);
            api.post('/',{username:'wahya',password:'way7ak',Fullname:'wahya3',email:'way7ak4',phoneNumber:'way7ak5'}).then(setOpen(false));
      }

      return (
      <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                  timeout: 500,
                  }}
            >
                  <Fade in={open}>
                        <div className={classes.paper}>
                              <h2>Add user</h2>
                              <div className={classes.frmGroup}>
                                    <div className={classes.frmControl}>
                                          <TextField
                                                variant='outlined'
                                                margin='normal'
                                                fullWidth
                                                required
                                                id='txtFullname'
                                                label='Fullname'
                                                autoFocus
                                                autoComplete='Username'
                                          />
                                          <TextField
                                                variant='outlined'
                                                margin='normal'
                                                fullWidth
                                                required
                                                id='txtUsername'
                                                label='Username'
                                                autoComplete='Username'
                                          />
                                    </div>
                                    <TextField
                                                variant='outlined'
                                                margin='normal'
                                                label='Email'
                                                type='email'
                                                required
                                                fullWidth
                                                id='txtRePass'
                                                autoComplete='current-password'
                                          />
                                    <div className={classes.frmControl}>
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
                                          <TextField
                                                variant='outlined'
                                                margin='normal'
                                                label='Re-password'
                                                type='password'
                                                required
                                                fullWidth
                                                id='txtRePass'
                                                autoComplete='current-password'
                                          />
                                    </div>
                                    
                                    <div className={classes.frmControl}>
                                          <Button
                                                type='button'
                                                color='primary'
                                                variant='contained'
                                                size='large'
                                                className={classes.btn}
                                                onClick={handleAdd}>
                                                      Add
                                          </Button>
                                    </div>
                                    
                              </div>
                        </div>
                  </Fade>
      </Modal>
      );
}