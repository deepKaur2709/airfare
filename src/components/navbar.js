import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';
import Logo from '../images/Logo.png'


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)

  const toggle = () => setIsOpen(!isOpen);

  const logoutuser = (event) => {
    event.preventDefault();
    localStorage.setItem("userdetails", null)
    window.location.href = "/login";
  }
  return (
    <div className='position-relative'>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img className='logoImage' src={Logo} alt='logo' /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/flights">Flights</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/flightprediction">Flight Delay Prediction</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/aboutus">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contactus">Contact Us</NavLink>
            </NavItem>
            {!userdetails ? <React.Fragment>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            </React.Fragment> : <React.Fragment>
            <NavItem>
                <NavLink href='/managebookings'>Manage Bookings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(event) => logoutuser(event)}>Logout</NavLink>
              </NavItem>
            </React.Fragment>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar