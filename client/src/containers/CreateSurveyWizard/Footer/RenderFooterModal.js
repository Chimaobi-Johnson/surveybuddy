import React from 'react';
import { Modal, Input, Button } from 'reactstrap';
const renderFooterModal = props => (
        <Modal
          className="modal-dialog-centered"
          toggle={props.removeDialog}
          isOpen={props.surveyFooterDialog}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
             Add Footer Text
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
            <Button onClick={props.removeDialog} size="sm" color="primary" type="button">
              Save
            </Button>
          </div>
        </Modal>
)

export default renderFooterModal;
