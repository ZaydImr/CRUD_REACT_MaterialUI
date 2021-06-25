import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import InputField from './TextField'
import { Formik,Form} from 'formik'
import * as Yup from 'yup'

const api = axios.create({
      baseURL:process.env.REACT_APP_API
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
      const validate = Yup.object({
            Fullname : Yup.string().min(3,'Must be at least 3 characters').required('Required') ,
            email : Yup.string().email('Email is invalid').required('Email required') ,
            username : Yup.string().min(6,'Must be at least 6 characters').max(30,'Must be less than 30 characters').required('Username required') ,
            password : Yup.string().min(8,'Must be at least 8 characters').max(30,'Must be less than 30 characters').required('Password required') ,
            repass : Yup.string().oneOf([Yup.ref('password'),null],'Password doesn\'t match').required('Re-password required'),
            phoneNumber : Yup.number('Number phone must be a number').min(10,'Must be 10 characters').required('Phone number required')
      })

      const handleClose = () => {
            setOpen(false);
      };

      const handleAdd =(dat)=>{
            if(dat.isValid&&dat.dirty)
                  api.post('/',dat.values).then(setOpen(false));
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
                                    <div className={classes.paper} >
                                          <Formik
                                                
                                                initialValues={{
                                                      Fullname:'',
                                                      username:'',
                                                      email:'',
                                                      password:'',
                                                      repass:'',
                                                      phoneNumber:''
                                                }}
                                                validationSchema={validate}
                                          >     
                                          {formik=>(
                                                
                                                <Form>
                                                      <h2>Add user</h2>
                                                      <div>
                                                            <div className={classes.frmControl}>
                                                                  <InputField
                                                                        name='Fullname'
                                                                        label='Fullname'
                                                                        type='text'
                                                                  />
                                                                  <InputField
                                                                        name='username'
                                                                        label='Username'
                                                                        type='text'
                                                                  />
                                                            </div>
                                                            <InputField
                                                                        label='Email'
                                                                        type='email'
                                                                        name='email'
                                                                  />
                                                            <div className={classes.frmControl}>
                                                                  <InputField
                                                                        label='Password'
                                                                        type='password'
                                                                        name='password'
                                                                  />
                                                                  <InputField
                                                                        label='Password'
                                                                        type='password'
                                                                        name='repass'
                                                                  />
                                                            </div>
                                                            <div className={classes.frmControl}>
                                                                  <InputField
                                                                        label='Phone number'
                                                                        type='tel'
                                                                        name='phoneNumber'
                                                                  />
                                                            </div>
                                                            <div className={classes.frmControl}>
                                                                  <Button
                                                                        type='submit'
                                                                        color='primary'
                                                                        variant='contained'
                                                                        size='large'
                                                                        className={classes.btn}
                                                                        onClick={()=>handleAdd(formik)}>
                                                                              Add
                                                                  </Button>
                                                            </div>
                                                      </div>
                                                </Form>
                                                )}
                                          </Formik>
                                    </div>
                              </Fade>
            </Modal>
      );
}