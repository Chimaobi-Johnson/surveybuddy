import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Modal,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import * as classes from './Navbar.module.css';

class MenuBar extends Component {

  state = {
    formModal: false,
    isOpen: false
  }

  toggleModal = () => {
    this.setState({formModal: !this.state.formModal });
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  renderModal() {
    return (<Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={this.state.formModal}
              toggle={this.toggleModal}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>Continue with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="/auth/facebook"
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-facebook-official" aria-hidden="true"></i>
                        </span>
                        <span className="btn-inner--text">Facebook</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="/auth/google"
                      >
                        <span className="btn-inner--icon">
                          <img
                            alt="..."
                            src={require("../../assets/images/icons/common/google.svg")}
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Modal>
          )
      }


  render() {
    let profileBox;
    if(this.props.auth.isAuth) {
       profileBox = (
         <>
         <UncontrolledDropdown nav inNavbar>
           <DropdownToggle nav caret>
             <span style={{ fontWeight: 'bold' }}>{this.props.auth.facebookId ? this.props.auth.displayName : this.props.auth.firstName}</span>
           </DropdownToggle>
           <DropdownMenu right>
             <DropdownItem>
               My Profile
             </DropdownItem>
             <DropdownItem>
               My Survey
             </DropdownItem>
             <DropdownItem>
               Buy Credits
             </DropdownItem>
             <DropdownItem divider />
             <DropdownItem>
               Logout
             </DropdownItem>
           </DropdownMenu>
         </UncontrolledDropdown>
         {/*<li className={`${classes.navbarItem} ${classes.navbarProfile}`}><i style={{ fontSize: '1.5rem'}} className="fa fa-user-circle-o" aria-hidden="true"></i></li>
         <li className={`${classes.navbarItem} ${classes.navbarProfileName}`}>{this.props.auth.facebookId ? this.props.auth.displayName : this.props.auth.firstName}</li>
          <div className={classes.ProfileBox}>
             <ul>
                <li>Profile</li>
                <li>My Survey</li>
                <li>Credits</li>
                <li>Buy Credits</li>
                <li>Log out</li>
             </ul>
          </div> */}
          </>
       )
    } else {
      profileBox = (
        <NavItem>
          <NavLink onClick={this.toggleModal}><Button  color="primary" size="sm">Login</Button></NavLink>
        </NavItem>
      )
    }

    return (
      <>
      {this.renderModal()}
      <Navbar className={classes.navbar} color="light" light expand="md">
        <NavbarBrand className={classes.Heading1} href="/">SURVEY<span style={{ color: '#f2ba36' }}>BUDDY</span></NavbarBrand>
        <NavbarToggler style={{ border: '1px solid' }} onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Pricing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Contact</NavLink>
            </NavItem>
            {profileBox}
          </Nav>
        </Collapse>
      </Navbar>
      </>
    );
  }
}
// <nav className={classes.navbar}>
//
//   <h1 className={classes.Heading1}><Link style={{ textDecoration: 'none', color: '#000' }} to="/">SURVEY<span style={{ color: '#f2ba36' }}>BUDDY</span></Link></h1>
//   <ul className={classes.navbarNav}>
//      <li className={classes.navbarItem}>Pricing</li>
//      <li className={classes.navbarItem}>Services</li>
//      <li className={classes.navbarItem}>About</li>
//      <li className={classes.navbarItem}>Contact Us</li>
//      <li className={classes.navbarItem}>|</li>
//      {profileBox}
//   </ul>
// </nav>
const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps)(MenuBar);
