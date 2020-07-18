import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Modal
} from "reactstrap";

import * as classes from './Navbar.module.css';

class MenuBar extends Component {

  state = {
    formModal: false
  }

  toggleModal = () => {
    this.setState({formModal: !this.state.formModal });
  }

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
         <li className={`${classes.navbarItem} ${classes.navbarProfile}`}><i style={{ fontSize: '1.5rem'}} className="fa fa-user-circle-o" aria-hidden="true"></i></li>
         <li className={`${classes.navbarItem} ${classes.navbarProfileName}`}>{this.props.auth.facebookId ? this.props.auth.displayName : this.props.auth.firstName}</li>
          <div className={classes.ProfileBox}>
             <ul>
                <li>Profile</li>
                <li>My Survey</li>
                <li>Credits</li>
                <li>Buy Credits</li>
                <li>Log out</li>
             </ul>
          </div>
          </>
       )
    } else {
      profileBox = <li className={classes.navbarItem}><Button onClick={this.toggleModal} color="primary" size="sm">Login</Button></li>
    }

    return (
      <>
      {this.renderModal()}
      <nav className={classes.navbar}>
        <h1 className={classes.Heading1}><a style={{ textDecoration: 'none', color: '#000' }} href="/">SURVEY<span style={{ color: '#f2ba36' }}>BUDDY</span></a></h1>
        <ul className={classes.navbarNav}>
           <li className={classes.navbarItem}>Pricing</li>
           <li className={classes.navbarItem}>Services</li>
           <li className={classes.navbarItem}>About</li>
           <li className={classes.navbarItem}>Contact Us</li>
           <li className={classes.navbarItem}>|</li>
           {profileBox}
        </ul>
      </nav>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps)(MenuBar);
