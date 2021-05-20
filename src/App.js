import React, { Component } from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import Users from './components/Users';
import AddUser from './forms/AddUser';
import UpdateUser from './forms/UpdateUser';
import NotFound from './pages/NotFound';
import {BrowserRouter as Router , Route,Switch} from "react-router-dom";
import Contribute from './pages/Contribute';
// Component oluşturma
 


class App extends Component {
  // <Navbar title ="User App"/>
  // <hr/>
  // <AddUser/>
  // <Users/>

  render(){
    return (
     <Router>
        <div className="container">
         <Navbar  title="User App" />
         <hr/>
         <Switch>
          <Route exact path = "/" component = {Users} />
          <Route exact path = "/add" component = {AddUser} />
          <Route exact path = "/github" component = {Contribute} />
          <Route exact path = "/edit/:id" component= {UpdateUser}/>
          <Route component = {NotFound}/>
         </Switch>
 
        
        </div>
    </Router>
    )

  }  
}

export default App;
