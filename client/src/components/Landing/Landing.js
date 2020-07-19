import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  Modal
} from "reactstrap";
// import { UncontrolledCarousel } from "reactstrap";

import * as classes from './Landing.module.css';


const Landing = props => {

  // var slideIndex = 0;
  // showSlides();
  //
  // function showSlides() {
  //   var i;
  //   var slides = document.getElementsByClassName("mySlides");
  //   var dots = document.getElementsByClassName("dot");
  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";
  //   }
  //   slideIndex++;
  //   if (slideIndex > slides.length) {slideIndex = 1}
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   slides[slideIndex-1].style.display = "block";
  //   dots[slideIndex-1].className += " active";
  //   setTimeout(showSlides, 5000); // Change image every 2 seconds
  // }

  const [ formModal, setFormModal ] = useState(false);

  const toggleModal = () => setFormModal(!formModal);


    const authModal = () => (
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={formModal}
              toggle={toggleModal}
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

  return (
   <div className={classes.LandingContainer}>
       {authModal()}
      <div className={classes.LandingCarousel}>
         <div className={`${classes.carouselItem} ${classes.fade}`}>
            <img src={require('../../assets/images/person-writing-on-notebook-669615.jpg')} alt="" className={classes.carouselImage} />
            <div className={classes.CaptionBox}>
               <h3 className={classes.CaptionText}>Caption one</h3>
            </div>
         </div>
      {/*   <div className={`${classes.carouselItem} ${classes.fade}`}>
            <img src="" alt="" className={classes.carouselImage} />
            <div className={classes.CaptionBox}>
               <h3 className={classes.CaptionText}>Caption one</h3>
            </div>
         </div>
         <div className={`${classes.carouselItem} ${classes.fade}`}>
            <img src="" alt="" className={classes.carouselImage} />
            <div className={classes.CaptionBox}>
               <h3 className={classes.CaptionText}>Caption one</h3>
            </div>
         </div> */ }
         <a href="#">Prev</a>
         <a href="#">Next</a>
      </div>

      <div className={classes.LandingTextContainer}>
          <h2>a simple and powerful online survey tool</h2>
          <p>sign up now for unlimited surveys, questions and responses</p>
          { props.auth.isAuth ? <Button><Link to="/surveys">Continue</Link></Button> : <Button onClick={toggleModal}>Get Started</Button> }
      </div>

   </div>
   )
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps)(Landing);
