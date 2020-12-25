import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import { Input, FormGroup, Label, Button, CustomInput } from 'reactstrap';
import SurveyName from './SurveyName/SurveyName';
import RenderTitleModal from './Title/RenderTitleModal'
import RenderDescriptionModal from './Description/RenderDescriptionModal';
import RenderImageModal from './Image/RenderImageModal';
import RenderInputModal from './Input/RenderInputModal';
import RenderCheckboxModal from './Checkbox/RenderCheckboxModal';
import RenderRadioModal from './Radio/RenderRadioModal';
import RenderFooterModal from './Footer/RenderFooterModal';
import MessageModal from './MessageModal/MessageModal';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';
import loader from '../../assets/images/gifs/pulse.gif';
import axios from 'axios';

import * as classes from './CreateSurveyWizard.module.css';
import RenderUpdateInputModal from './Input/RenderUpdateInputModal';
import RenderUpdateCheckboxModal from './Checkbox/RenderUpdateCheckboxModal';
import RenderRadioUpdateModal from './Radio/RenderRadioUpdateModal';
import RenderImageUpdateModal from './Image/RenderImageUpdateModal';

class CreateSurveyWizard extends React.Component {

  state = {
    componentArray: [],
    surveyPage: null,
    surveyId: null,
    surveyNameEditingMode: false,
    surveyNameText: 'my survey 1',
    surveyTitleDialog: false,
    surveyDescrDialog: false,
    surveyImageDialog: false,
    surveyInputDialog: false,
    surveyCheckboxDialog: false,
    surveyRadioDialog: false,
    surveyFooterDialog: false,
    surveyTitleUpdateDialog: false,
    surveyDescrUpdateDialog: false,
    surveyImageUpdateDialog: false,
    surveyInputUpdateDialog: false,
    surveyCheckboxUpdateDialog: false,
    surveyRadioUpdateDialog: false,
    surveyFooterUpdateDialog: false,
    surveyCheckboxes: [],
    surveyCheckboxInitValues: [
      {checkboxOne: {
        value: '',
        editingMode: false
      }},
      {checkboxTwo: {
        value: ''
      }},
      {checkboxThree: {
        value: ''
      }},
      {checkboxFour: {
        value: ''
      }},
      {checkboxFive: {
        value: ''
      }},
    ],
    surveyRadioOptions: [],
    surveyRadioInitValues: {
      optionOne: {
        value: 'Option 1',
        editingMode: false
      },
      optionTwo: {
        value: 'Option 2',
        editingMode: false
      }
    },
    surveyCheckboxTempQuestion: '',
    surveyRadioTempQuestion: '',
    surveyCheckboxNumber: 0,
    surveyCheckboxTempValue: '',
    surveyTitleText: '',
    surveyDescrText: '',
    surveyFooterText: '',
    surveyInputLabelName: '',
    surveyInputs: {},
    imagePreviewUrl: '',
    file: null,
    saving: false,
    responseStatus: null,
    responseData: null,
    modalOpen: true,
    sidebarOpen: false,
    componentIndex: -1,
    dataIndex: -1,
    formerSurveyInputLabelName: ''
  }

  cancelNewSurvey = () => {
    this.props.history.push('/surveys');
  }

  closeMessageModalHandler = () => {
    this.setState({ modalOpen: false });
  }

  storeCustomSurveyFormHandler = () => {
     this.setState({ saving: true });

     const surveyInputs = JSON.stringify(this.state.surveyInputs);
     const surveyCheckboxes = JSON.stringify(this.state.surveyCheckboxes);
     const surveyRadioOptions = JSON.stringify(this.state.surveyRadioOptions);

     let customForm = new FormData();
     customForm.append('surveyId', this.state.surveyId);
     customForm.append('surveyName', this.state.surveyNameText);
     customForm.append('surveyTitleText', this.state.surveyTitleText);
     customForm.append('surveyDescrText', this.state.surveyDescrText);
     customForm.append('surveyFooterText', this.state.surveyFooterText);
     customForm.append('image', this.state.file);
     customForm.append('surveyInputs', surveyInputs);
     customForm.append('surveyCheckboxes', surveyCheckboxes);
     customForm.append('surveyRadioOptions', surveyRadioOptions);

     axios.post('/api/store_survey_form', customForm)
     .then(response => {
       console.log(response);
       this.setState({ responseStatus: response.status, savedData: response.data, saving: false, modalOpen: true, surveyId: response.data.surveyForm._id })
     })
     .catch(err => {
       console.log(err);
       this.setState({ responseStatus: err.status, saving: false, modalOpen: true })

     });

     // const customForm = this.props.customSurvey;
     // this.props.saveUserSurveyForm(customForm);
     // this.setState({ saving: true });


     // this.props.history.push('/surveys/confirm');
  }

  removeDialog = (dialogName) => {
    this.setState({[dialogName]: false});
    let inputArray = [];
    switch(dialogName) {
      case "surveyTitleDialog":
        inputArray = [ ...this.state.componentArray];
        inputArray.push(<div id="surveyTitle" componentIdenifier={Math.random()} onClick={this.deleteSurveyTitleComponent}><h2 style={{textAlign: 'center',fontSize: '1.2rem', paddingTop: '1rem'}}>{this.state.surveyTitleText}</h2></div>)
        this.setState({ componentArray: inputArray });
        break
      case "surveyDescrDialog":
        inputArray = [ ...this.state.componentArray];
        inputArray.push(<div id="surveyDescription" componentIdenifier={Math.random()}><p style={{textAlign: 'center', fontSize: '.9rem'}}>{this.state.surveyDescrText}</p></div>)
        this.setState({ componentArray: inputArray });
        break
      case "surveyImageDialog":
        inputArray = [ ...this.state.componentArray];
        const surveyImage = inputArray.filter(item => item.props.id === "surveyImage");
        console.log(surveyImage);
        if(surveyImage.length > 0) {
          alert("You are allowed to add only one image")
          return
        } else {
          inputArray.push(<div id="surveyImage" componentIdenifier={Math.random()} className={classes.SurveyImageBox}>
          {!this.state.imagePreviewUrl ? null : <img src={this.state.imagePreviewUrl} />}
          <br />
          <Button style={{ margin: '0 auto' }} size='sm' id="removeImageBtn" onClick={this.deleteSurveyImageHandler}>Remove Image</Button>
          <Button style={{ margin: '0 auto' }} size='sm' id="deleteImg" onClick={this.editSurveyImageHandler}>Edit Image</Button>
       </div>)
        this.setState({ componentArray: inputArray });
        }
        break
      case "surveyFooterDialog":
        inputArray = [ ...this.state.componentArray];
        inputArray.push(<div className={classes.SurveyFooterText}>{this.state.surveyFooterText ? this.state.surveyFooterText : null}</div>)
        this.setState({ componentArray: inputArray });
        break
        default:
          return
    }
  }

  // {{ INITIALIZE }}

  

  initSurveyInputDialog = () => {
    const surveyInputsData = {...this.state.surveyInputs};
    const surveyInputLength = Object.keys(surveyInputsData).length
    if(surveyInputLength <= 4) {
      // document.getElementById('drawer-toggle').checked = false;
      // this.toggleSidebarOpen();
      this.setState({surveyInputDialog: true});
    } else {
      // document.getElementById('drawer-toggle').checked = false;
      alert('You have reached the maximum number of inputs');
    }
  }


  initSurveyFooterDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    // this.toggleSidebarOpen();
    this.setState({ surveyFooterDialog: true });
  }
  
  initSurveyDescrDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    // this.toggleSidebarOpen();
    this.setState({surveyDescrDialog: true});
    }
  
  initSurveyImageDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    // this.toggleSidebarOpen();
    this.setState({surveyImageDialog: true});
  }
  
  initSurveyTitleDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    // this.toggleSidebarOpen();
    this.setState({surveyTitleDialog: true});
  }

  initSurveyCheckboxDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    // this.toggleSidebarOpen();
    // const surveyCheckboxes = {...this.state.surveyCheckboxes};
    this.setState({surveyCheckboxDialog: true});
  }

  initSurveyRadioDialog = () => {
  // document.getElementById('drawer-toggle').checked = false;
  // this.toggleSidebarOpen();
  this.setState({surveyRadioDialog: true});
  }


  // {{ SAVE }}

  saveSurveyName = () => {
    this.setState({surveyNameEditingMode: false});
  }

  saveSurveyCheckboxHandler = () => {
    // const surveyCheckbox = {...this.state.surveyCheckboxes};
    const surveyArr = [...this.state.surveyCheckboxes];
    const surveyCheckboxInitValues = [...this.state.surveyCheckboxInitValues];
    let checkboxNames = {};
    // loop each checkbox from one to three and transfer it from the initial state which is surveyCheckboxInitValues
    // to the permanent state which is either in checkbox one, two or three depending on how many the users wants
    
      if(isEmpty(surveyCheckboxInitValues[0].checkboxOne.value)) {
        alert('Please Edit Survey Form Checkbox Names');
      } else if (isEmpty(this.state.surveyCheckboxTempQuestion)) {
        alert('Please Edit Survey Form Checkbox Question');
      } else {
         surveyCheckboxInitValues.map(checkboxObj => {
           console.log(checkboxObj)
           Object.values(checkboxObj).map(item => {
            if(item.value === '') {
              return  // this is to prevent a checkbox with an empty name from being displayed in the form
            }
             // transfer object to as its been looped to checkboxNames obj using Object.assign method
            Object.assign(checkboxNames, {[item.value]: false});
          })
         });

        let inputArray = [];
        inputArray = [ ...this.state.componentArray ]
        const randomId = Math.random().toString(36).substr(2, 15);
        const checkboxObj = {
          id: Math.random().toString(36).substr(2, 15),
          question: this.state.surveyCheckboxTempQuestion,
          checkboxNames: checkboxNames,
        }
        surveyArr.push(checkboxObj);
        inputArray.push(
          <div id={randomId} key={Math.random()} componentIdentifier={Math.random()}>
            <FormGroup>
              <Label for="exampleCheckbox">{this.state.surveyCheckboxTempQuestion}</Label>
              <div>
              {Object.keys(checkboxNames).map(key => (
                <CustomInput key={Math.random()} type="checkbox" id="exampleCustomInline2" label={`${key}`} inline />
              ))}
              <Button size='sm' onClick={(arg1, arg2) => this.deleteSurveyCheckBoxHandler(`${checkboxObj.id}`, `${randomId}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
              <Button size='sm' onClick={(arg1, arg2) => this.editSurveyCheckBoxHandler(`${checkboxObj.id}`, `${randomId}`)}><i className="fa fa-pen-o" aria-hidden="true"></i></Button>
              </div>
            </FormGroup>
          </div>
        )
      this.setState({ surveyCheckboxes: surveyArr, surveyCheckboxTempQuestion: '', componentArray: inputArray, surveyCheckboxDialog: false  });
    }
  }

  saveCheckboxNameHandler = () => {
    const checkboxInitValues = [...this.state.surveyCheckboxInitValues];
    checkboxInitValues[0].checkboxOne.editingMode = false;
    this.setState({surveyCheckboxInitValues: checkboxInitValues});
  }
  
  saveRadioNamesHandler = () => {
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    surveyRadioInitValues.optionOne.editingMode = false;
    this.setState({ surveyRadioInitValues });
  }

  saveSurveyRadioHandler = () => {

    const surveyRadioArr = [...this.state.surveyRadioOptions];
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    let radioOptions = {};

      Object.values(surveyRadioInitValues).map(radioObj => {
         if(radioObj.value === '') {
           return  // this is to prevent a checkbox with an empty name from being displayed in the form
         }
          // transfer object to as its been looped to checkboxNames obj using Object.assign method
           return Object.assign(radioOptions, {[radioObj.value]: false});
       });

       surveyRadioInitValues.optionOne.value = "Option 1"
       surveyRadioInitValues.optionTwo.value = "Option 2"

      const radioObj = {
        id: Math.random(),
        options: radioOptions
      }
      surveyRadioArr.push(radioObj);
      let inputArray = [];
      inputArray = [ ...this.state.componentArray ]
      const randomId = Math.random().toString(36).substr(2, 15);
      inputArray.push(
          <div id={randomId} componentIdentifier={Math.random()} key={Math.random()}>
            <FormGroup tag="fieldset">
              <legend style={{ fontSize: '1rem' }}></legend>
              <FormGroup>
              <Label for="exampleCheckbox">{this.state.surveyRadioTempQuestion}</Label>
              <div>
            {Object.keys(radioOptions).map(key => (
              <CustomInput key={Math.random()} value={false} type="radio" id="exampleCustomRadio" name="customRadio" label={key} inline />
            ))}
          {/* {surveyRadioNames.map(item => (
            item === undefined ? null : <CustomInput key={Math.random()} value="" type="radio" id="exampleCustomRadio" name="customRadio" label="" inline />
          ))} */}
           <Button size='sm' onClick={(radio) => this.deleteSurveyRadioOptionHandler(`${radioObj.id}`, `${randomId}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
           <Button size='sm' onClick={(radio) => this.editSurveyRadioOptionHandler(`${radioObj.id}`, `${randomId}`)}><i className="fa fa-pen-o" aria-hidden="true"></i></Button>
            </div>
              </FormGroup>
            </FormGroup>
            </div>
      )
    this.setState({ surveyRadioInitValues: surveyRadioInitValues, surveyRadioOptions: surveyRadioArr, surveyRadioTempQuestion: '', componentArray: inputArray, surveyRadioDialog: false  });
  }


  // {{ NAME CHANGE }}


  changeSurveyCheckboxQuestion = event => {
    this.setState({ surveyCheckboxTempQuestion: event.target.value });
  }

  changeCheckboxNumber = (event) => {
     this.setState({surveyCheckboxNumber: event.target.value});
  }

  surveyCheckboxNameChangeHandler = (event, checkbox) => {
    const checkboxNo = this.state.surveyCheckboxNumber;
    // remove remaining objs from surveyCheckboxInitValues
    const checkboxInitValues = [...this.state.surveyCheckboxInitValues];
    // checkboxInitValues.substr(checkboxNo, 0);
    // const newCheckboxInitVal = checkboxInitValues.splice(checkboxNo, 1);
    // checkboxInitValues.splice(checkboxNo, checkboxNo - 5, "Lemon", "Kiwi");
    // console.log(newCheckboxInitVal)
    let index;
    switch(checkbox) {
      case "checkboxOne":
       index = 0
       break;
       case "checkboxTwo":
       index = 1
       break;
       case "checkboxThree":
       index = 2
       break;
       case "checkboxFour":
       index = 3
       break;
       case "checkboxFive":
       index = 4
       break;
       default:
         return
    }
    checkboxInitValues[index][checkbox].value = event.target.value;
    // checkboxInitValues[checkbox].value = event.target.value;
    this.setState({surveyCheckboxInitValues: checkboxInitValues});
  }


  changeSurveyFooterText = event => {
    this.setState({ surveyFooterText: event.target.value });
  }

  changeSurveyRadioQuestion = event => {
    this.setState({ surveyRadioTempQuestion: event.target.value });
  }

  changeSurveyRadioName = (event, option) => {
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    surveyRadioInitValues[option].value = event.target.value;
    this.setState({ surveyRadioInitValues });
  }

  
  surveyNameChange = (event) => {
    this.setState({surveyNameText: event.target.value});
  }

  changeSurveyTitle = (event) => {
      this.setState({surveyTitleText: event.target.value});
  }

  changeSurveyDescr = (event) => {
    this.setState({surveyDescrText: event.target.value});
  }

  changeSurveyImage = (e) => {
    e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      }

     reader.readAsDataURL(file);
    //  document.getElementById('removeImageBtn').style.display = 'block';
  }

  changeSurveyInputLabelName = (event) => {
    this.setState({surveyInputLabelName: event.target.value});
  }

  surveyInputChangeHandler = (event, inputLabel) => {
    alert('You cant write on this form now');
  }

  addInputHandler = () => {
    let inputLabel = this.state.surveyInputLabelName;
    const surveyInputs = {...this.state.surveyInputs};
    // clear inputs
    surveyInputs[inputLabel] = '';

    // add to components array

    let inputArray = []
    // this method of generating random ids is used for simplicity sake
    let randomId = Math.random().toString(36).substr(2, 15);
    inputArray = [...this.state.componentArray];
    inputArray.push(
      <div id={randomId} key={inputLabel + new Date().getMilliseconds()} componentIdentifier={Math.random()} className={classes.InputArea}>
        <FormGroup>
            <Label>{inputLabel}</Label>
            <Input
              style={{ borderRadius: 0, height: '1.8rem' }}
              id={inputLabel}
              type="text"
              value=""
              onChange={(event, key) => this.surveyInputChangeHandler(event, inputLabel)}
            />
          <Button size='sm' onClick={(arg1, arg2) => this.deleteSurveyInputHandler(`${inputLabel}`, `${randomId}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button size='sm' onClick={(arg1, arg2) => this.editSurveyInputHandler(`${inputLabel}`, `${randomId}`)}><i className="fa fa-pen-o" aria-hidden="true"></i></Button>
        </FormGroup>
      </div>
    )
    {/* <Button key={key + 'btn' + new Date().getSeconds()} size='small' style={{ fontWeight: 'bold', color: '#303f9f'}} onClick={(identifier) => this.editSurveyInputHandler(`${key}`)}>Edit</Button> */}
    this.setState({ componentArray: inputArray, surveyInputs: surveyInputs, surveyInputDialog: false });

  }


  // {{ EDIT COMPONENTS }}

  
  editSurveyName = () => {
    this.setState({surveyNameEditingMode: true});
  }

  editSurveyInputHandler = (key, randomId) => {
    // get the index of array in the components array
    let inputArray = [ ...this.state.componentArray ];
    const componentIndex = inputArray.map(e => e.props.id).indexOf(`${randomId}`);
    // store it to state to be used for updating the component
    this.setState({ surveyInputUpdateDialog: true, formerSurveyInputLabelName: key, surveyInputLabelName: key, componentIndex: componentIndex });
  }

  editSurveyImageHandler = () => {
     // get the index of array in the components array
     let inputArray = [ ...this.state.componentArray ];
     const componentIndex = inputArray.map(e => e.props.id).indexOf("surveyImage");
     // store it to state to be used for updating the component
    this.setState({ surveyImageUpdateDialog: true, componentIndex: componentIndex })
  }

  editSurveyCheckBoxHandler = (key, randomId) => {
    // get the index of array in the components array
    const inputArray = [ ...this.state.componentArray ];
    const checkboxArr = [ ...this.state.surveyCheckboxes ];
    const componentIndex = inputArray.map(e => e.props.id).indexOf(`${randomId}`);
    const dataIndex = checkboxArr.map(e => e.id).indexOf(`${key}`);
    // store it to state to be used for updating the component
    this.setState({ surveyCheckboxUpdateDialog: true, componentIndex: componentIndex, dataIndex: dataIndex });
  }

  editCheckboxNameHandler = () => {
    const checkboxInitValues = [...this.state.surveyCheckboxInitValues];
    checkboxInitValues[0].checkboxOne.editingMode = true;
    this.setState({surveyCheckboxInitValues: checkboxInitValues});
  }

  editRadioNamesHandler = () => {
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    surveyRadioInitValues.optionOne.editingMode = true;
    this.setState({ surveyRadioInitValues });
  }

  editSurveyRadioOptionHandler = (key, randomId) => {
    //update radio options
    // get the index of array in the components array
    const inputArray = [ ...this.state.componentArray ];
    const radioArr = [ ...this.state.surveyRadioOptions ];
    const componentIndex = inputArray.map(e => e.props.id).indexOf(`${randomId}`);
    const dataIndex = radioArr.map(e => e.id).indexOf(`${key}`);
    // store it to state to be used for updating the component
    this.setState({ surveyRadioUpdateDialog: true, componentIndex: componentIndex, dataIndex: dataIndex });
  }
 

  // {{ UPDATE COMPONENTS }}

  
  updateDialog = (dialogName) => {
    this.setState({[dialogName]: false, componentIndex: -1, dataIndex: -1 });
  }

  updateSurveyInputHandler = () => {
    // update survey inputs object

    let inputLabel = this.state.surveyInputLabelName;

    const surveyInputs = {...this.state.surveyInputs};

    delete surveyInputs[this.state.formerSurveyInputLabelName];
    //update obj

    Object.assign(surveyInputs, {[inputLabel]: ""})
    // add to components array

    let inputArray = []
    // this method of generating random ids is used for simplicity sake
    let randomId = Math.random().toString(36).substr(2, 15);
    inputArray = [...this.state.componentArray];
    if (this.state.componentIndex !== -1) {
      inputArray[this.state.componentIndex] = (
        <div id={randomId} componentIdentifier={Math.random()} key={inputLabel + new Date().getMilliseconds()} className={classes.InputArea}>
          <FormGroup>
              <Label>{inputLabel}</Label>
              <Input
                style={{ borderRadius: 0, height: '1.8rem' }}
                id={inputLabel}
                type="text"
                value=""
                onChange={(event, key) => this.surveyInputChangeHandler(event, inputLabel)}
              />
            </FormGroup>
            <div>
            <Button size='sm' onClick={(arg1, arg2) => this.deleteSurveyInputHandler(`${inputLabel}`, `${randomId}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
            <Button size='sm' onClick={(arg1, arg2) => this.editSurveyInputHandler(`${inputLabel}`, `${randomId}`)}><i className="fa fa-pen-o" aria-hidden="true"></i></Button>
            </div>
        </div>
      );
    }

    this.setState({ componentArray: inputArray, surveyInputs: surveyInputs, surveyInputDialog: false, componentIndex: -1, surveyInputUpdateDialog: false });

  }

  updateSurveyImageHandler = (e) => {
    let inputArray;
    inputArray = [ ...this.state.componentArray ];
    if (this.state.componentIndex !== -1) {
      inputArray[this.state.componentIndex] = (
        <div id="surveyImage" componentIdenifier={Math.random()} className={classes.SurveyImageBox}>
          {!this.state.imagePreviewUrl ? null : <img src={this.state.imagePreviewUrl} />}
          <br />
          <Button style={{ margin: '0 auto' }} size='sm' id="removeImageBtn" onClick={this.deleteSurveyImageHandler}>Remove Image</Button>
          <Button style={{ margin: '0 auto' }} size='sm' id="deleteImg" onClick={this.editSurveyImageHandler}>Edit Image</Button>
       </div>
      )
    }
    this.setState({ componentArray: inputArray, surveyImageUpdateDialog: false, componentIndex: -1, dataIndex: -1 })
  }

  updateSurveyCheckboxHandler = () => {
        // const surveyCheckbox = {...this.state.surveyCheckboxes};
        const surveyArr = [...this.state.surveyCheckboxes];
        const surveyCheckboxInitValues = {...this.state.surveyCheckboxInitValues};
        let checkboxNames = {};
        // loop each checkbox from one to three and transfer it from the initial state which is surveyCheckboxInitValues
        // to the permanent state which is either in checkbox one, two or three depending on how many the users wants
        
          if(isEmpty(surveyCheckboxInitValues[0].checkboxOne.value)) {
            alert('Please Edit Survey Form Checkbox Names');
          } else if (isEmpty(this.state.surveyCheckboxTempQuestion)) {
            alert('Please Edit Survey Form Checkbox Question');
          } else {
            const checkBoxNames = Object.values(surveyCheckboxInitValues).map(checkboxObj => {
               if(checkboxObj.value === '') {
                 return  // this is to prevent a checkbox with an empty name from being displayed in the form
               }
                // transfer object to as its been looped to checkboxNames obj using Object.assign method
                 return Object.assign(checkboxNames, {[checkboxObj.value]: false});
             });
            let inputArray = [];
            inputArray = [ ...this.state.componentArray ]
            const randomId = Math.random().toString(36).substr(2, 15);
            const checkboxObj = {
              id: Math.random().toString(36).substr(2, 15),
              question: this.state.surveyCheckboxTempQuestion,
              checkBoxNames: checkBoxNames,
            }
            if (this.state.dataIndex !== -1) {
              surveyArr[this.state.dataIndex] = checkboxObj
            }
            if (this.state.componentIndex !== -1) {
              inputArray[this.state.componentIndex] = (
                <div id={randomId} key={Math.random()} componentIdentifier={Math.random()}>
                <FormGroup>
                  <Label for="exampleCheckbox">{this.state.surveyCheckboxTempQuestion}</Label>
                  <div>
                  {checkBoxNames.map(item => (
                    item === undefined ? null : <CustomInput key={Math.random() + "-ent"} type="checkbox" id="exampleCustomInline2" label={`${item}`} inline />
                  ))}
                  <Button size='sm' onClick={(arg1, arg2) => this.deleteSurveyCheckBoxHandler(`${checkboxObj.id}`, `${randomId}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
                  <Button size='sm' onClick={(arg1, arg2) => this.editSurveyCheckBoxHandler(`${checkboxObj.id}`, `${randomId}`)}><i className="fa fa-pen-o" aria-hidden="true"></i></Button>
                  </div>
                </FormGroup>
              </div>
              )
            }
            this.setState({ surveyCheckboxes: surveyArr, surveyCheckboxUpdateDialog: false, componentIndex: -1, dataIndex: -1, surveyCheckboxTempQuestion: '', componentArray: inputArray, surveyCheckboxDialog: false  });
          }
  }

  updateSurveyRadioOptionHandler = () => {
    const surveyRadioArr = [...this.state.surveyRadioOptions];
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    let radioOptions = {};

      Object.values(surveyRadioInitValues).map(radioObj => {
         if(radioObj.value === '') {
           return  // this is to prevent a checkbox with an empty name from being displayed in the form
         }
          // transfer object to as its been looped to checkboxNames obj using Object.assign method
           return Object.assign(radioOptions, {[radioObj.value]: false});
       });

       surveyRadioInitValues.optionOne.value = "Option 1"
       surveyRadioInitValues.optionTwo.value = "Option 2"

      const radioObj = {
        id: Math.random(),
        options: radioOptions
      }
      if (this.state.dataIndex !== -1) {
        surveyRadioArr[this.state.dataIndex] = radioObj
      }
      let inputArray = [];
      inputArray = [ ...this.state.componentArray ]
      const randomId = Math.random().toString(36).substr(2, 15);
      if (this.state.componentIndex !== -1) {
        inputArray[this.state.componentIndex] = (
          <div id={randomId} componentIdentifier={Math.random()} key={Math.random()}>
            <FormGroup tag="fieldset">
              <legend style={{ fontSize: '1rem' }}></legend>
              <FormGroup>
              <Label for="exampleCheckbox">{this.state.surveyRadioTempQuestion}</Label>
              <div>
            {Object.keys(radioOptions).map(key => (
              <CustomInput key={Math.random()} value={false} type="radio" id="exampleCustomRadio" name="customRadio" label={key} inline />
            ))}
           <Button size='sm' onClick={(radio) => this.deleteSurveyRadioOptionHandler(`${radioObj.id}`, `${randomId}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
           <Button size='sm' onClick={(radio) => this.editSurveyRadioOptionHandler(`${radioObj.id}`, `${randomId}`)}><i className="fa fa-pen-o" aria-hidden="true"></i></Button>
            </div>
              </FormGroup>
            </FormGroup>
            </div>
        )
      }

      this.setState({ surveyRadioInitValues: surveyRadioInitValues, surveyRadioOptions: surveyRadioArr, componentIndex: -1, dataIndex: -1, surveyRadioTempQuestion: '', componentArray: inputArray, surveyRadioUpdateDialog: false  });
  }
  
  
  // {{ DELETE COMPONENTS }}

  deleteSurveyTitleComponent = () => {
    const key = document.getElementById("surveyTitle").getAttribute("componentIdenifier")
    let inputArray = [ ...this.state.componentArray ];
    const newArr = inputArray.filter(item => item.props.componentIdenifier != key);
    this.setState({ componentArray: newArr })
  }

  deleteSurveyInputHandler = (key, randomId) => {
    // delete from component array
    const identifier = document.getElementById(`${randomId}`).getAttribute("componentIdentifier")
    let inputArray = [ ...this.state.componentArray ];
    const newArr = inputArray.filter(item => item.props.componentIdentifier != identifier);

    // delete from surveyinputs obj
    const currentSurveyInputObj = {...this.state.surveyInputs};
    delete currentSurveyInputObj[key];
    this.setState({ surveyInputs: currentSurveyInputObj, componentArray: newArr });
  }

  deleteSurveyImageHandler = () => {
    const identifier = document.getElementById("surveyImage").getAttribute("componentIdentifier")
    let inputArray = [ ...this.state.componentArray ];
    const newArr = inputArray.filter(item => item.props.componentIdentifier != identifier);
    this.setState({ componentArray: newArr, file: null, imagePreviewUrl: null })
  }

  deleteSurveyCheckBoxHandler = (key, randomId) => {
    // delete from component array
    const identifier = document.getElementById(`${randomId}`).getAttribute("componentIdentifier")
    let inputArray = [ ...this.state.componentArray ];
    const newArr = inputArray.filter(item => item.props.componentIdentifier != identifier);

    // delete from survey checkbox array
    const surveyArr = [ ...this.state.surveyCheckboxes ]
    const newCheckboxArr = surveyArr.filter(item => item.id != key);

    this.setState({ surveyCheckboxes: newCheckboxArr, componentArray: newArr });
  }

  deleteSurveyRadioOptionHandler = (key, randomId) => {
    // delete from component array
    const identifier = document.getElementById(`${randomId}`).getAttribute("componentIdentifier")
    let inputArray = [ ...this.state.componentArray ];
    const newArr = inputArray.filter(item => item.props.componentIdentifier != identifier);

    // delete from survey radio array
    const surveyArr = [ ...this.state.surveyRadioOptions ]
    const newRadioArr = surveyArr.filter(item => item.id != key);

    this.setState({ surveyRadioOptions: newRadioArr, componentArray: newArr });
  }


  toggleSidebarOpen = () => {
    const sidebar = document.getElementById('surveySidebar');
    if(sidebar.style.transform === 'translate(-100%)') {
      sidebar.style.transform = 'translate(0)';
      this.setState({ sidebarOpen: true });
    } else {
      sidebar.style.transform = 'translate(-100%)';
      this.setState({ sidebarOpen: false });
    }
  }


  renderDashboardContent() {
   return (
     <div className={classes.DashboardContent}>
       {this.state.componentArray.map(item => item)}
     </div>
   )
 }

  render() {
    
  console.log(this.state);

    return (
       <div className={classes.SurveyContainer}>
         {this.state.saving ? <div className={classes.LoadingBox}><img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px'}} src={loader} alt="" /><p style={{display: 'block', fontWeight: 'bold',  position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)'}}>Saving..</p></div> : null }
         {/* <Button onClick={this.cancelNewSurvey} className={classes.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i></Button> */}
         <Button onClick={this.storeCustomSurveyFormHandler} className={classes.goForward}><span>Save</span><i class="fa fa-floppy-o" aria-hidden="true"></i></Button>
         <MessageModal responseStatus={this.state.responseStatus} surveyName={this.state.savedData ? this.state.savedData.surveyForm.surveyName : null} surveyId={this.state.savedData ? this.state.savedData.surveyForm._id : null} modalOpen={this.state.modalOpen} closeModal={this.closeMessageModalHandler}/>
         <RenderTitleModal surveyTitleDialog={this.state.surveyTitleDialog} surveyTitleText={this.state.surveyTitleText} changeSurveyTitle={this.changeSurveyTitle} removeDialog={(mode) => this.removeDialog('surveyTitleDialog')}/>
         <RenderDescriptionModal surveyDescrDialog={this.state.surveyDescrDialog} removeDialog={(mode) => this.removeDialog('surveyDescrDialog')} surveyDescrText={this.state.surveyDescrText} changeSurveyDescr={this.changeSurveyDescr} />
         <RenderImageModal surveyImageDialog={this.state.surveyImageDialog} removeDialog={(mode) => this.removeDialog('surveyImageDialog')} surveyImagePath={this.state.surveyImagePath} changeSurveyImage={this.changeSurveyImage} imagePreviewUrl={this.state.imagePreviewUrl}/>
         <RenderInputModal surveyInputDialog={this.state.surveyInputDialog} removeDialog={(mode) => this.removeDialog('surveyInputDialog')} surveyInputLabelName={this.state.surveyInputLabelName} changeSurveyInputLabelName={this.changeSurveyInputLabelName} addInputHandler={this.addInputHandler}/>
         <RenderCheckboxModal surveyCheckboxDialog={this.state.surveyCheckboxDialog} removeDialog={(mode) => this.removeDialog('surveyCheckboxDialog')}
                   surveyCheckboxTempQuestion={this.state.surveyCheckboxTempQuestion} changeSurveyCheckboxQuestion={this.changeSurveyCheckboxQuestion} surveyCheckboxNumber={this.state.surveyCheckboxNumber}
                   changeCheckboxNumber={this.changeCheckboxNumber} saveSurveyCheckboxHandler={this.saveSurveyCheckboxHandler} saveCheckboxNameHandler={this.saveCheckboxNameHandler} surveyCheckboxNameChangeHandler={this.surveyCheckboxNameChangeHandler}
                   surveyCheckboxInitValues={this.state.surveyCheckboxInitValues[0].checkboxOne.editingMode} editCheckboxNameHandler={this.editCheckboxNameHandler}
                   checkboxOneInitValue={this.state.surveyCheckboxInitValues[0].checkboxOne.value}
                   checkboxTwoInitValue={this.state.surveyCheckboxInitValues[1].checkboxTwo.value}
                   checkboxThreeInitValue={this.state.surveyCheckboxInitValues[2].checkboxThree.value}
                   checkboxFourInitValue={this.state.surveyCheckboxInitValues[3].checkboxFour.value}
                   checkboxFiveInitValue={this.state.surveyCheckboxInitValues[4].checkboxFive.value}
                   surveyCheckboxNumber={this.state.surveyCheckboxNumber}
                   />
          <RenderRadioModal surveyRadioDialog={this.state.surveyRadioDialog} removeDialog={(mode) => this.removeDialog('surveyRadioDialog')}
                   surveyRadioTempQuestion={this.state.surveyRadioTempQuestion} changeSurveyRadioQuestion={this.changeSurveyRadioQuestion} saveSurveyRadioHandler={this.saveSurveyRadioHandler}
                   optionOne={this.state.surveyRadioInitValues.optionOne.value} optionTwo={this.state.surveyRadioInitValues.optionTwo.value}
                   editingMode={this.state.surveyRadioInitValues.optionOne.editingMode} changeSurveyRadioName={this.changeSurveyRadioName}
                   editRadioNamesHandler={this.editRadioNamesHandler} saveRadioNamesHandler={this.saveRadioNamesHandler}
                   />
          <RenderFooterModal surveyFooterDialog={this.state.surveyFooterDialog} surveyFooterText={this.state.surveyFooterText} changeSurveyFooterText={this.changeSurveyFooterText} removeDialog={(mode) => this.removeDialog('surveyFooterDialog')}/>

          <RenderUpdateInputModal updateSurveyInputHandler={this.updateSurveyInputHandler} changeSurveyInputLabelName={this.changeSurveyInputLabelName} surveyInputLabelName={this.state.surveyInputLabelName} surveyInputUpdateDialog={this.state.surveyInputUpdateDialog} updateDialog={(mode) => this.updateDialog('surveyInputUpdateDialog')} />
          <RenderUpdateCheckboxModal surveyCheckboxUpdateDialog={this.state.surveyCheckboxUpdateDialog} updateDialog={(mode) => this.updateDialog("surveyCheckboxUpdateDialog")}
                  surveyCheckboxTempQuestion={this.state.surveyCheckboxTempQuestion} changeSurveyCheckboxQuestion={this.changeSurveyCheckboxQuestion} surveyCheckboxNumber={this.state.surveyCheckboxNumber}
                  changeCheckboxNumber={this.changeCheckboxNumber} updateSurveyCheckboxHandler={this.updateSurveyCheckboxHandler} saveCheckboxNameHandler={this.saveCheckboxNameHandler} surveyCheckboxNameChangeHandler={this.surveyCheckboxNameChangeHandler}
                  surveyCheckboxInitValues={this.state.surveyCheckboxInitValues[0].checkboxOne.editingMode} editCheckboxNameHandler={this.editCheckboxNameHandler}
                  checkboxOneInitValue={this.state.surveyCheckboxInitValues[0].checkboxOne.value}
                  checkboxTwoInitValue={this.state.surveyCheckboxInitValues[1].checkboxTwo.value}
                  checkboxThreeInitValue={this.state.surveyCheckboxInitValues[2].checkboxThree.value}
                  checkboxFourInitValue={this.state.surveyCheckboxInitValues[3].checkboxFour.value}
                  checkboxFiveInitValue={this.state.surveyCheckboxInitValues[4].checkboxFive.value}
                  surveyCheckboxNumber={this.state.surveyCheckboxNumber} 
              />
            <RenderRadioUpdateModal surveyRadioUpdateDialog={this.state.surveyRadioUpdateDialog} updateDialog={(mode) => this.updateDialog("surveyRadioUpdateDialog")}
              surveyRadioTempQuestion={this.state.surveyRadioTempQuestion} changeSurveyRadioQuestion={this.changeSurveyRadioQuestion} updateSurveyRadioOptionHandler={this.updateSurveyRadioOptionHandler}
              optionOne={this.state.surveyRadioInitValues.optionOne.value} optionTwo={this.state.surveyRadioInitValues.optionTwo.value}
              editingMode={this.state.surveyRadioInitValues.optionOne.editingMode} changeSurveyRadioName={this.changeSurveyRadioName}
              editRadioNamesHandler={this.editRadioNamesHandler} saveRadioNamesHandler={this.saveRadioNamesHandler}
            />
            <RenderImageUpdateModal surveyImageUpdateDialog={this.state.surveyImageUpdateDialog} updateDialog={(mode) => this.updateDialog("surveyImageUpdateDialog")} 
              surveyImagePath={this.state.surveyImagePath} updateSurveyImageHandler={this.updateSurveyImageHandler} changeSurveyImage={this.changeSurveyImage} imagePreviewUrl={this.state.imagePreviewUrl}
            />

          <div id="surveySidebar" className={classes.SideBarContainer}>
             <Button onClick={this.toggleSidebarOpen} className={classes.SideBarToggle}>
               { this.state.sidebarOpen ? <i className="fa fa-close"></i> : <i className="fa fa-bars"></i> }
             </Button>
             <SideBar>
                <div className={classes.SideBarContent}>
                  <SurveyName surveyNameEditingMode={this.state.surveyNameEditingMode} surveyNameText={this.state.surveyNameText} surveyNameChange={this.surveyNameChange} saveSurveyName={this.saveSurveyName} editSurveyName={this.editSurveyName} />
                  <h4>INSERT</h4>
                  <div className={classes.SurveyControls}>
                      <Button onClick={this.initSurveyTitleDialog} className={classes.ActionButton}>
                        <i className="fa fa-text-width" aria-hidden="true"></i>
                        <h5>Title</h5>
                      </Button>
                      <Button onClick={this.initSurveyDescrDialog} className={classes.ActionButton}>
                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        <h5>description</h5>
                      </Button>
                      <Button onClick={this.initSurveyImageDialog} className={classes.ActionButton}>
                        <i className="fa fa-file-image-o" aria-hidden="true"></i>
                        <h5>logo/image</h5>
                      </Button>
                      <Button onClick={this.initSurveyInputDialog} className={classes.ActionButton}>
                        <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                        <h5>input</h5>
                      </Button>
                      <Button onClick={this.initSurveyCheckboxDialog} className={classes.ActionButton}>
                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                        <h5>checkbox</h5>
                      </Button>
                      <Button onClick={this.initSurveyRadioDialog} className={classes.ActionButton}>
                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i>
                        <h5>radio options</h5>
                      </Button>
                      <Button onClick={this.initSurveyFooterDialog} className={classes.ActionButton}>
                        <i className="fa fa-font" aria-hidden="true"></i>
                        <h5>footer text</h5>
                      </Button>
                  </div>
                </div>

             </SideBar>
          </div>
          <div className={classes.SurveyFormContainer}>
              <div className={classes.SurveyForm}>
                 {this.renderDashboardContent()}
              </div>
          </div>

       </div>
    )
  }
}

export default withRouter(CreateSurveyWizard);
