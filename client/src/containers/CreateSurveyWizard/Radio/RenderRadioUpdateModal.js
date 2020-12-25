import React from 'react';
import { Modal, Input, FormGroup, Label, Button } from 'reactstrap';


const renderRadioUpdateModal = props => {
let optionItems;
if(props.editingMode) {
  optionItems = (
    <>
     <Input
        autoFocus
        id="SurveyRadioName"
        type="text"
        value={props.optionOne}
        onChange={(event, option) => props.changeSurveyRadioName(event, 'optionOne')}
      />
      <Input
          margin="dense"
          id="SurveyRadioName"
          type="text"
          value={props.optionTwo}
          onChange={(event, option) => props.changeSurveyRadioName(event, 'optionTwo')}
      />
      <Button size='sm' onClick={props.saveRadioNamesHandler}>Save Option Names</Button>
    </>
  )
} else {
  optionItems = (
    <FormGroup tag="fieldset">
        <legend>Radio Buttons</legend>
        <FormGroup check>
          <Label check>
            <Input value={props.optionOne} type="radio" name="radio1" />{' '}
            {props.optionOne}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input value={props.optionTwo} type="radio" name="radio1" />{' '}
            {props.optionTwo}
          </Label>
          <Button size='sm' onClick={props.editRadioNamesHandler}>Edit Names</Button>
        </FormGroup>
    </FormGroup>
  )
}

     return (
       <Modal
         className="modal-dialog-centered"
         toggle={props.updateDialog}
         isOpen={props.surveyRadioUpdateDialog}
       >
         <div className="modal-header">
           <h5 className="modal-title" id="exampleModalLabel">
             Input Radio Option Question
           </h5>
         </div>
         <div className="modal-body">
            <Input
              autoFocus
              id="SurveyRadioQuestion"
              type="text"
              value={props.surveyRadioTempQuestion}
              onChange={props.changeSurveyRadioQuestion} />
              {optionItems}
         </div>
         <div className="modal-footer">
           <Button onClick={props.updateSurveyRadioOptionHandler} size="sm" color="primary" type="button">
             Update
           </Button>
         </div>
       </Modal>
)

}

export default renderRadioUpdateModal;
