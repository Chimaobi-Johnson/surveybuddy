import React from 'react';
import { Modal, Input, Button } from 'reactstrap';

const renderDescriptionModal = props => (
  <Modal
    className="modal-dialog-centered"
    toggle={props.removeDialog}
    isOpen={props.surveyDescrDialog}
  >
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
      Add Description
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
      <Button onClick={props.saveComponentDialog} size="sm" color="primary" type="button">
        Save
      </Button>
    </div>
  </Modal>
)

export default renderDescriptionModal;
