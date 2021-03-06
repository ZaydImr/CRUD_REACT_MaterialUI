import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link,useHistory } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'fixed',
    width:'100%',
    left:0,
    top:-38,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color:'rgb(57, 19, 107)',
    fontWeight:'800'
  },
  title: {
    flexGrow: 1,
  },
  appBar:{
        backgroundColor:'white',
        color:'#222'
  },
  loginIcon:{
    gap:10
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history =  useHistory();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =()=>{
    ReactSession.setStoreType('Cookie');
    if(ReactSession.get('username')!=null){
      ReactSession.Cookie.removeItem('username');
      history.push('/login');
    }
    else{
      ReactSession.setStoreType('sessionStorage');
      ReactSession.sessionStorage.removeItem('username');
      history.push('/login');
    }
  }

  return (
    <div className={classes.root}>
      <FormGroup >
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            CRUD
          </IconButton>
            <Typography className={classes.title}>
                  <Link to='/'>Home</Link>
            </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle color="action" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} className={classes.loginIcon}><PermIdentityIcon/>My account</MenuItem>
                <MenuItem onClick={handleLogout} className={classes.loginIcon}><ExitToAppIcon/>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}