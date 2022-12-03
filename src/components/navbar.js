import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Logo from '../images/Logo.png'


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)
  const [admindetails, updateadmindetails] = useState(localStorage.getItem('admindetails') ? JSON.parse(localStorage.getItem('admindetails')) : null)

  const toggle = () => setIsOpen(!isOpen);

  const logoutuser = (event) => {
    event.preventDefault();
    localStorage.setItem("userdetails", null)
    window.location.href = "/login";
  }

  const logoutadmin = (event) => {
    event.preventDefault();
    localStorage.setItem("admindetails", null)
    window.location.href = "/";
  }

  return (
    <div className='position-relative'>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img className='logoImage' src={Logo} alt='AirFare serves every province and its domestic schedule includes service to 51 Canadian airports.' /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                flights
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/flights'>AirFare Flights</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href='/externalflights'>Aviation Stack Flights</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/flightprediction">Flight Prediction</NavLink>
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
              <NavItem>
                <NavLink href="/adminsignin">Admin Portal</NavLink>
              </NavItem>
            </React.Fragment> : <React.Fragment>
              <NavItem>
                <NavLink href='/managebookings'>Manage Bookings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(event) => logoutuser(event)}>Logout</NavLink>
              </NavItem>
            </React.Fragment>}
            {admindetails ? <React.Fragment>
              <NavItem>
                <NavLink href="/createflight">Create Flight</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(event) => logoutadmin(event)}>Logout</NavLink>
              </NavItem>
            </React.Fragment> : null}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar