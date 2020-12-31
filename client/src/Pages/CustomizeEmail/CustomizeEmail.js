import React, { Component } from 'react';
import { Modal, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { APP_URL } from '../../config';

import SideBar from '../../components/SideBar/SideBar';
import * as actions from '../../store/actions';

import * as classes from './CustomizeEmail.module.css';

class CustomizeEmail extends Component {

   state = {
     emailSubject: '',
     emailBody: '',
     emailFrom: '',
     emailRecipients: '',
     surveyId: null,
     loading: false,
     modalOpen: false,
     errorModalOpen: false,
     successMessage: '',
     errorMessage: ''
   }

   componentDidMount () {
     this.setState({ surveyId: this.props.location.state.surveyId });
   }

    // if(this.props.emailDetailsFail === true) {
    //   this.setState({ loading: false, errorModal: true});
    // }

    textFieldChangeHandler = (event, textfield) => {
        this.setState({ [textfield]: event.target.value });
    }

    submitSurveyEmailHandler = event => {
       event.preventDefault();
       this.setState({ loading: true });

       let formdata = {
         emailSubject: this.state.emailSubject,
         emailBody: this.state.emailBody + ' ' + `<p>Please click on the link below to start survey <a href='${APP_URL}/survey/respond/${this.state.surveyId}'>Start Survey</a></p>`,
         emailFrom: this.state.emailFrom,
         emailRecipients: this.state.emailRecipients,
         surveyId: this.state.surveyId
       }

        axios.post('/api/store_survey_email_details', formdata)
        .then(response => {
          this.setState({ successMessage: 'Form Submitted Successfully', modalOpen: true });
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err.response);
          if(err.response.status === 501) {
            this.setState({ errorMessage: err.response.data.message, errorModalOpen: true })
          } else {
            this.setState({ errorMessage: "Server error. Check connection settings", errorModalOpen: true })
          }
        })

       }

      closeModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
      }
    
      closeErrorModal = () => {
        this.setState({ errorModalOpen: !this.state.errorModalOpen });
      }
    
      renderModal () {
      return (
      <Modal
        className="modal-dialog-centered"
        toggle={this.closeModal}
        isOpen={this.state.modalOpen}
      >
        <div className="modal-body">
              <h1>{this.state.successMessage}</h1>
        </div>
        <div className="modal-footer">
          <Button onClick={() => this.props.history.push(`/surveys/review_final/${this.state.surveyId}`)} size="sm">
            Okay
          </Button>
        </div>
      </Modal>)
    }

    renderErrorModal () {
      return (
      <Modal
        className="modal-dialog-centered"
        toggle={this.closeErrorModal}
        isOpen={this.state.errorModalOpen}
      >
        <div className="modal-body">
              <h1>{this.state.errorMessage}</h1>
        </div>
        <div className="modal-footer">
          <Button onClick={this.closeErrorModal} size="sm">
            Okay
          </Button>
          <Button size="sm" onClick={() => this.props.history.push('/surveys/credits/new')}>Buy Credits</Button>
        </div>
      </Modal>)
    }

  render () {

  

    return (
      <div className={classes.Container}>
        {this.renderModal()}
        {this.renderErrorModal()}
         <div className={classes.SideBarContainer}>
           <SideBar>
              <div className={classes.SideBarContent}>
               <h4 style={{ color: '#fff' }}>{this.props.location.state.surveyName}</h4>
               <p>Please fill in the mailing details for your survey. Also make sure to cross-check your spelling in order not to get errors while sending your survey<i class="fa fa-thumbs-o-up" aria-hidden="true"></i></p>
              <h5 style={{ color: '#fff' }}>Email Body:</h5>
               <div className={classes.EmailContentBox}>
                   {this.state.emailBody} <br />
                   <p style={{ fontStyle: "italic", fontSize: ".7rem" }}>Please click on the link below to start survey <a href={`${APP_URL}/survey/respond/${this.state.surveyId}`}>Start Survey</a></p>
               </div>
              </div>
           </SideBar>
         </div>
         <div className={classes.FormContainer}>
           <h2>Please Fill in all the inputs</h2>
               <Input
                  id="emailSubject"
                  placeholder="Name of the Email Subject "
                  onChange={(event, textfield) => this.textFieldChangeHandler(event, 'emailSubject')}
                  required
                />
                 <Input
                    id="emailFrom"
                    placeholder="This is the E-mail your recipients will see"
                    onChange={(event, textfield) => this.textFieldChangeHandler(event, 'emailFrom')}
                    required
                  />
                  <Input
                    id="emailBody"
                    placeholder="Message the Body of the Email will Contain"
                    onChange={(event, textfield) => this.textFieldChangeHandler(event, 'emailBody')}
                    required
                  />
                <Input
                    id="emailRecipients"
                    placeholder="List of Email Recipients Sparated With a Comma"
                    helperText="Please make sure the emails are separated with a comma"
                    onChange={(event, textfield) => this.textFieldChangeHandler(event, 'emailRecipients')}
                    required
                  />
              <Button onClick={this.submitSurveyEmailHandler} size="sm">{this.state.loading ? 'loading...' : 'Proceed' }</Button>


         </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    emailDetails: state.surveysReducer.emailDetails,
    emailDetailsFail: true
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveSurveyEmail: (formdata) => dispatch(actions.saveSurveyEmailDetails(formdata))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeEmail);
