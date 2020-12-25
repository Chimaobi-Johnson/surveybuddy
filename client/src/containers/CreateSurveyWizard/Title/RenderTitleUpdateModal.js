import React from 'react';
import { Modal, Input, Button } from 'reactstrap';

const renderTitleUpdateModal = props => (
        <Modal
          className="modal-dialog-centered"
          toggle={props.updateDialog}
          isOpen={props.surveyTitleUpdateDialog}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
             Edit Heading
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
            <Button onClick={props.updateSurveyTitleHandler} size="sm" color="primary" type="button">
              Update
            </Button>
          </div>
        </Modal>
)

export default renderTitleUpdateModal;
