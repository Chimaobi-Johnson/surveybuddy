import React from 'react';
import { Modal, Input, Button } from 'reactstrap';

import * as classes from './RenderImageModal.module.css';

const renderImageUpdateModal = props => (
  <Modal
    className="modal-dialog-centered"
    toggle={props.updateDialog}
    isOpen={props.surveyImageUpdateDialog}
  >
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Add a Logo/Image
      </h5>
    </div>
    <div className="modal-body">
       <Input
         autoFocus
         id="SurveyImage"
         type="file"
         value={props.surveyImagePath}
         onChange={props.changeSurveyImage} />
    </div>
    <div className={classes.SurveyImageBox}>
       {!props.imagePreviewUrl ? null : <img style={{margin: '0'}} src={props.imagePreviewUrl} />}
    </div>
    <div className="modal-footer">
      <Button onClick={props.updateSurveyImageHandler} size="sm" color="primary" type="button">
        Update
      </Button>
    </div>
  </Modal>
)

export default renderImageUpdateModal;
