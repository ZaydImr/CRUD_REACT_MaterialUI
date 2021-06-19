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
import NavbarHome from './Navbars/NavbarHome'

const api = axios.create({
      baseURL:`http://localhost:5000/weatherforecast`
})
const useStyles = makeStyles({
      table: {
            minWidth: 650,
      },
});

const Home = () => {
      const [addUser,setAddUser] = useState(false);
      const [data,setData] = useState([]);
      const classes = useStyles();

      useEffect(()=>{
            api.get('/').then(res=>{
                  setData(res.data);
            })
      })
      const handleAdd = ()=>{
            setAddUser(true);
      }
      const handleDelete = (username)=>{
            api.delete('/'+username);
      }

      return (
      <>
      <NavbarHome/>
      <AddUser open={addUser} setOpen={setAddUser}/>
      <Button variant='contained'  color='primary' onClick={handleAdd} style={{marginBottom:10}}>Add user</Button>
      <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                        <TableRow>
                              <TableCell>User</TableCell>
                              <TableCell align="right">Pass</TableCell>
                              <TableCell align="right">Fullname</TableCell>
                              <TableCell align="right">Email</TableCell>
                              <TableCell align="right">Phone Number</TableCell>
                              <TableCell align="right">Delete</TableCell>
                        </TableRow>
                  </TableHead>
                  <TableBody>
                              {data.map((user)=>{
                                    return(
                                          <TableRow key={user.username}>
                                                <TableCell component="th" scope="row">{user.username}</TableCell>
                                                <TableCell align="right">{user.password}</TableCell>
                                                <TableCell align="right">{user.Fullname}</TableCell>
                                                <TableCell align="right">{user.email}</TableCell>
                                                <TableCell align="right">{user.phoneNumber}</TableCell>
                                                <TableCell align="right">
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
