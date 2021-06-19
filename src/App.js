import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact  path='/' component={Home}/>
        <Route  path='/login' component={Login}/>
        <Route  path='/register' component={Register}/>
        <Route path='*' component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
