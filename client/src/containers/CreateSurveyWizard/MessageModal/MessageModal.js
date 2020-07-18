import React, { Component } from 'react';
import { Modal, Input, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import loader from '../../../assets/images/gifs/pulse.gif';


class MessageModal extends Component {

  state = {
    modalOpen: false
  }

  closeModalHandler = () => {
    this.setState({ modalOpen: false })
  }

  continueToNextStep = () => {
    this.props.history.push('/surveys/customize_email', {surveyId: this.props.surveyId, surveyName: this.props.surveyName });
  }

  render () {
    let saveStatus;

      if(this.props.responseStatus === null) {
        saveStatus = null;
      }
      else if(this.props.responseStatus === 200) {
         saveStatus = (
           <Modal
             className="modal-dialog-centered"
             toggle={this.props.closeModal}
             isOpen={this.props.modalOpen}
           >
             <div className="modal-body">
                  <h1> Your Form Has been Saved Successfully </h1>
             </div>
             <div className="modal-footer">
               <Button onClick={this.props.closeModal} size="sm">
                 Continue Editing
               </Button>
               <Button size="sm" onClick={this.continueToNextStep}>Proceed to Next Step</Button>
             </div>
           </Modal>
        )
      } else {
         saveStatus = (
           <Modal
             className="modal-dialog-centered"
             toggle={this.props.closeModal}
             isOpen={this.props.modalOpen}
           >
             <div className="modal-body">
                 <h1> Error Saving Form. Check Connection Settings and try again </h1>
             </div>
             <div className="modal-footer">
               <Button size="sm" onClick={this.props.closeModal}>Okay</Button>
             </div>
           </Modal>
        )
      }

    return (
      <div>
      {saveStatus}
      </div>
    )
  }
}

export default withRouter(MessageModal);
