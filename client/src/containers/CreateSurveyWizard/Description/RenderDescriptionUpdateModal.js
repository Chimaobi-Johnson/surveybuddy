import React from 'react';
import { Modal, Input, Button } from 'reactstrap';

const renderDescriptionUpdateModal = props => (
  <Modal
    className="modal-dialog-centered"
    toggle={props.updateDialog}
    isOpen={props.surveyDescrUpdateDialog}
  >
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
          Update Description
      </h5>
    </div>
    <div className="modal-body">
       <Input
         autoFocus
         id="SurveyName"
         type="text"
         value={props.surveyDescrText}
         onChange={props.changeSurveyDescr} />
    </div>
    <div className="modal-footer">
      <Button onClick={props.updateSurveyDescrHandler} size="sm" color="primary" type="button">
        Update
      </Button>
    </div>
  </Modal>
)

export default renderDescriptionUpdateModal;
