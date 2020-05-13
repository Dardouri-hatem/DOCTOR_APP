import React from 'react';
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/header'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Users from './components/login/users'
import DoctorLogin from './components/login/doctorLogin'
import Home from './components/home'
import ProfileUser from "./components/profileUser/profileUser"
import DoctorCard from "./components/doctors/doctorCard"
import Appointments from "./components/appointment/appointment"
import AppointmentApp  from "./components/modalAddAppointment/AppointmentApp"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";




function App() {
  return (
    
    <Router>
     <div className="App">
        <Header />
        <Route path='/' exact component ={Home}/>
        <Route path='/login' exact component ={Users}/>
        <Route path='/doctor_login' exact component ={DoctorLogin}/>
        <Route path="/profile" exact component = {ProfileUser}/>
        <Route path="/doctors" exact component={DoctorCard} />
        <Route path = "/appointments" exact component = {Appointments} />
        <MuiThemeProvider>
        <Route path = "/appointment/:doctorId" exact component = {AppointmentApp} />
        </MuiThemeProvider>
     </div>
    </Router>
    
  );
}

export default App;
