import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../JS/actions/authActions";
import "./header.css";
function Header(props) {
  return (
    <div>
      <Navbar variant="dark" className="navbar">
        <Link to="/" className="nav-brand">
          <Navbar.Brand>Doctor App</Navbar.Brand>
        </Link>
        {!props.token ? (
          <>
            <Nav className="mr-auto"></Nav>
            <Nav.Link href="/doctor_login" className="spanLink">
            <i class="fa fa-user-md mr-2" aria-hidden="true"></i>
            health professional ?
            </Nav.Link>
            <Nav.Link href="/login" className="navLink">
              Login
            </Nav.Link>
          </>
        ) : (
          <>
          { props.userType === "doctor" ? null :
            <Nav className="mr-auto">
              <Link to="/doctors" className="navLink">
                Acceuil
              </Link>
            </Nav>
            }
            <Nav.Link  className="navLink" href = "/appointments"> 
              My Appointments
            </Nav.Link>
            <Nav.Link href="#" className="navLink">
              <Dropdown>
                <Dropdown.Toggle className="bg-transparent border-0">{props.user.name}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='#' >
                  <Link to ="/Profile">
                  <i class="fa fa-user mr-1" aria-hidden="true"> Profile </i>
                  </Link>
                    </Dropdown.Item>
                  
                  <Dropdown.Item href="#">
                  <Link to ="/login" onClick={()=>props.logout()}>
                  <i class="fa fa-sign-out mr-1" aria-hidden="true"> Logout</i> 
                  </Link>
                  </Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </>
        )}
      </Navbar>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { token: state.auth.token, user: state.auth.user, userType : state.auth.userType };
};
export default connect(mapStateToProps, { logout })(Header);
