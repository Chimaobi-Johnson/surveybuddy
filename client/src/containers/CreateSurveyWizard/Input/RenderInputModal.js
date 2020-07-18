import React from 'react';
import { Modal, Input, Button } from 'reactstrap';

const renderInputModal = props => (
  <Modal
    className="modal-dialog-centered"
    toggle={props.removeDialog}
    isOpen={props.surveyInputDialog}
  >
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Input Label Name
      </h5>
    </div>
    <div className="modal-body">
       <Input
         autoFocus
         id="SurveyInputLabelName"
         type="text"
         value={props.surveyInputLabelName}
         onChange={props.changeSurveyInputLabelName} />
    </div>
    <div className="modal-footer">
      <Button onClick={props.addInputHandler} size="sm" color="primary" type="button">
        Save
      </Button>
    </div>
  </Modal>
)

export default renderInputModal;
