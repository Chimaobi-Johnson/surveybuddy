import React from 'react';
import { Modal, Input, Button } from 'reactstrap';
const renderTitleModal = props => (
        <Modal
          className="modal-dialog-centered"
          toggle={props.removeDialog}
          isOpen={props.surveyTitleDialog}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
             Add a Title
            </h5>
          </div>
          <div className="modal-body">
             <Input
               autoFocus
               id="SurveyTitle"
               type="text"
               value={props.surveyTitleText}
               onChange={props.changeSurveyTitle} />
          </div>
          <div className="modal-footer">
            <Button onClick={props.removeDialog} size="sm" color="primary" type="button">
              Save
            </Button>
          </div>
        </Modal>
)

export default renderTitleModal;
