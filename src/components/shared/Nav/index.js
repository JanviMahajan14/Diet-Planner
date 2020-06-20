import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './Nav.scss';
import i18next from 'i18next';

const NavigationBar = () => {

  const handleClick = lang => {
    i18next.changeLanguage(lang)
  }
  return (
  <>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Dynamic Diet</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
    <Nav>
      <Nav.Link onClick = {() =>handleClick ('en')}>English</Nav.Link>
      <Nav.Link onClick = {() =>handleClick ('hn')}>Hindi</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Navbar>
  </>
)};

export default NavigationBar;
