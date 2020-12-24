import React from 'react';
import { Modal, Input, Button } from 'reactstrap';
import * as classes from './RenderCheckboxModal.module.css';


const renderUpdateCheckboxModal = props => {

  const renderCheckBoxesOnModal = () => {
    let checkboxOne, checkboxTwo, checkboxThree, checkboxFour, checkboxFive;
    if(props.surveyCheckboxInitValues) {
      checkboxOne = (<>
        <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox One" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxOne')} value={props.checkboxOneInitValue} />
        <Button size='sm' onClick={(checkbox) => props.saveCheckboxNameHandler('checkboxOne')}>Save Names</Button></>);
      checkboxTwo = (<>
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox One" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxOne')} value={props.checkboxOneInitValue} />
          <Input type="text" label="Checkbox Two" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxTwo')} value={props.checkboxTwoInitValue} />
          <Button size='sm' onClick={(checkbox) => props.saveCheckboxNameHandler('checkboxTwo')}>Save Names</Button></>);
      checkboxThree = (<>
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox One" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxOne')} value={props.checkboxOneInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Two" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxTwo')} value={props.checkboxTwoInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Three" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxThree')} value={props.checkboxThreeInitValue} />
          <Button size='sm' onClick={(checkbox) => props.saveCheckboxNameHandler('checkboxThree')}>Save Names</Button></>);
      checkboxFour = (<>
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox One" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxOne')} value={props.checkboxOneInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Two" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxTwo')} value={props.checkboxTwoInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Three" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxThree')} value={props.checkboxThreeInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Four" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxFour')} value={props.checkboxFourInitValue} />
          <Button size='sm' onClick={(checkbox) => props.saveCheckboxNameHandler('checkboxFour')}>Save Names</Button></>);
      checkboxFive = (<>
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox One" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxOne')} value={props.checkboxOneInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Two" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxTwo')} value={props.checkboxTwoInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Three" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxThree')} value={props.checkboxThreeInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Four" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxFour')} value={props.checkboxFourInitValue} />
          <Input type="text" placeholder="Enter Checkbox Name" label="Checkbox Five" onChange={(event, checkbox) => props.surveyCheckboxNameChangeHandler(event, 'checkboxFive')} value={props.checkboxFiveInitValue} />
          <Button size='sm' onClick={(checkbox) => props.saveCheckboxNameHandler('checkboxFive')}>Save Names</Button></>);
    } else {
      checkboxOne = (<>
        <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
        <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxOneInitValue === '' ? 'checkbox 1' : props.checkboxOneInitValue}</label></div>
        <Button size='sm' onClick={(checkbox) => props.editCheckboxNameHandler('checkboxOne')}>Edit Names</Button></>);
      checkboxTwo = (<>
        <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
        <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxOneInitValue === '' ? 'checkbox 1' : props.checkboxOneInitValue}</label></div>
        <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
        <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxTwoInitValue === '' ? 'checkbox 2' : props.checkboxTwoInitValue}</label></div>
        <Button size='sm' onClick={(checkbox) => props.editCheckboxNameHandler('checkboxTwo')}>Edit Names</Button></>);
      checkboxThree = (<>
        <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
        <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxOneInitValue === '' ? 'checkbox 1' : props.checkboxOneInitValue}</label></div>
        <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
        <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxTwoInitValue === '' ? 'checkbox 2' : props.checkboxTwoInitValue}</label></div>
        <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
        <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxThreeInitValue === '' ? 'checkbox 3' : props.checkboxThreeInitValue}</label></div>
        <Button size='sm' onClick={(checkbox) => props.editCheckboxNameHandler('checkboxThree')}>Edit Names</Button></>);
        checkboxFour = (<>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxOneInitValue === '' ? 'checkbox 1' : props.checkboxOneInitValue}</label></div>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxTwoInitValue === '' ? 'checkbox 2' : props.checkboxTwoInitValue}</label></div>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxThreeInitValue === '' ? 'checkbox 3' : props.checkboxThreeInitValue}</label></div>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxFourInitValue === '' ? 'checkbox 4' : props.checkboxFourInitValue}</label></div>
          <Button size='sm' onClick={(checkbox) => props.editCheckboxNameHandler('checkboxFour')}>Edit Names</Button></>);
        checkboxFive = (<>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxOneInitValue === '' ? 'checkbox 1' : props.checkboxOneInitValue}</label></div>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxTwoInitValue === '' ? 'checkbox 2' : props.checkboxTwoInitValue}</label></div>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxThreeInitValue === '' ? 'checkbox 3' : props.checkboxThreeInitValue}</label></div>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxFourInitValue === '' ? 'checkbox 4' : props.checkboxFourInitValue}</label></div>
          <div className="custom-control custom-checkbox mb-3"><input className="custom-control-input" id="customCheck1" type="checkbox" defaultChecked={false} />
          <label className="custom-control-label" htmlFor="customCheck1">{props.checkboxFiveInitValue === '' ? 'checkbox 5' : props.checkboxFiveInitValue}</label></div>
          <Button size='sm' onClick={(checkbox) => props.editCheckboxNameHandler('checkboxFive')}>Edit Names</Button></>);
    }
    switch (props.surveyCheckboxNumber) {

     case "1":
        return checkboxOne;
     case "2":
        return checkboxTwo;
     case "3":
        return checkboxThree;
     case "4":
        return checkboxFour;
     case "5":
        return checkboxFive;
      default:
         return null;
    }
  }


  return (
    <Modal
      className="modal-dialog-centered"
      toggle={props.updateDialog}
      isOpen={props.surveyCheckboxUpdateDialog}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
         Input Checkbox Question
        </h5>
      </div>
      <div className="modal-body">
         <Input
           autoFocus
           id="SurveyCheckboxQuestion"
           type="text"
           value={props.surveyCheckboxTempQuestion}
           onChange={props.changeSurveyCheckboxQuestion}
            />
          <h4>Input Number of Checkboxes</h4>
          <div className={classes.CheckboxContainer}>
          <Input type="select" value={props.surveyCheckboxNumber} onChange={props.changeCheckboxNumber}>
          <option value={0}>select</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          </Input>
          {renderCheckBoxesOnModal()}
          </div>
      </div>
      <div className="modal-footer">
        <Button onClick={props.updateSurveyCheckboxHandler} size="sm" color="primary" type="button">
          Update
        </Button>
      </div>
    </Modal>
  )
}

export default renderUpdateCheckboxModal;
