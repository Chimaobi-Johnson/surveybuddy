import React from 'react';
import { Modal, Input, Button } from 'reactstrap';

const renderUpdateInputModal = props => (
  <Modal
    className="modal-dialog-centered"
    toggle={props.updateDialog}
    isOpen={props.surveyInputUpdateDialog}
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
      <Button onClick={props.updateSurveyInputHandler} size="sm" color="primary" type="button">
        Update
      </Button>
    </div>
  </Modal>
)

export default renderUpdateInputModal;
