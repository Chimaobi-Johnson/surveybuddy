import React from 'react';
import { Modal, Input, Button } from 'reactstrap';

const renderFooterUpdateModal = props => (
        <Modal
          className="modal-dialog-centered"
          toggle={props.updateDialog}
          isOpen={props.surveyFooterUpdateDialog}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Footer Text
            </h5>
          </div>
          <div className="modal-body">
             <Input
               autoFocus
               id="SurveyFooter"
               type="text"
               value={props.surveyFooterText}
               onChange={props.changeSurveyFooterText} />
          </div>
          <div className="modal-footer">
            <Button onClick={props.updateSurveyFooterText} size="sm" color="primary" type="button">
              Update
            </Button>
          </div>
        </Modal>
)

export default renderFooterUpdateModal;
