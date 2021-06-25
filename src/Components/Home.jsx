import React,{useState} from 'react'
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import AddUser from './AddUser'
import EditUser from './EditUser'
import NavbarHome from './Navbars/NavbarHome'

const api = axios.create({
      baseURL:process.env.REACT_APP_API
})
const useStyles = makeStyles({
      table: {
            minWidth: 650,
      },
      actionCell:{
            minWidth:'fit-content',
            display:'flex',
            gap:15,
            flexDirection: 'unset'
      }
});

const Home = () => {
      const [addUser,setAddUser] = useState(false);
      const [editUser,setEditUser] = useState(false);
      const [userForEdit,setUser] = useState({});
      const [data,setData] = useState([]);
      const classes = useStyles();

      useEffect(()=>{
            //api.get('/','aa')
            axios({
                  method:'GET',
                  params:{token:process.env.REACT_APP_TOK},
                  url:process.env.REACT_APP_API
            }).then(res=>{
                  setData(res.data);
            })
      })

      const handleAdd = ()=>{
            setAddUser(true);
      }

      const handleEdit = (user)=>{
            setUser(user);
            setEditUser(true);
      }

      const handleDelete = (username)=>{
            api.delete('/'+username);
      }

      return (
      <>
      <NavbarHome/>
      <AddUser open={addUser} setOpen={setAddUser}/>
      <EditUser open={editUser} setOpen={setEditUser} user={userForEdit}/>
      <Button variant='contained'  color='primary' onClick={handleAdd} style={{marginBottom:10}}>Add user</Button>
      <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                        <TableRow>
                              <TableCell component="th">Fullname</TableCell>
                              <TableCell align="right" component="th">User</TableCell>
                              <TableCell align="right" component="th">Pass</TableCell>
                              <TableCell align="center" component="th">Email</TableCell>
                              <TableCell align="right" component="th">Phone Number</TableCell>
                              <TableCell align="center" component="th">Action</TableCell>
                        </TableRow>
                  </TableHead>
                  <TableBody>
                              {data.map((user)=>{
                                    return(
                                          <TableRow key={user.username}>
                                                <TableCell component="th" scope="row">{user.Fullname}</TableCell>
                                                <TableCell align="right">{user.username}</TableCell>
                                                <TableCell align="right">{user.password}</TableCell>
                                                <TableCell align="center">{user.email}</TableCell>
                                                <TableCell align="right">{user.phoneNumber}</TableCell>
                                                <TableCell align="right" className={classes.actionCell}>
                                                      <Button variant='contained' color='primary' onClick={()=>handleEdit(user)}>Edit</Button>
                                                      <Button variant='contained' color='secondary' onClick={()=>handleDelete(user.username)}>Delete</Button>
                                                </TableCell>
                                          </TableRow>
                                    )
                              })}
                  </TableBody>
            </Table>
      </TableContainer>
      </>
      )
}

export default Home
