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
import RenderTitleUpdateModal from './Title/RenderTitleUpdateModal'
import RenderDescriptionUpdateModal from './Description/RenderDescriptionUpdateModal';
import RenderFooterUpdateModal from './Footer/RenderFooterUpdateModal';
import ColorPicker from '../../components/CustomModals/ColorPicker/ColorPicker';

class CreateSurveyWizard extends React.Component {

  state = {
    componentArray: [],
    surveyDataArray: [],
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
    surveyTitleArray: [],
    surveyDescrText: '',
    descriptionArray: [],
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
     const surveyTitleArray = JSON.stringify(this.state.surveyTitleArray);
     const descriptionArray = JSON.stringify(this.state.descriptionArray)
     const surveyDataArray = JSON.stringify(this.state.surveyDataArray);

     let customForm = new FormData();
     customForm.append('surveyId', this.state.surveyId);
     customForm.append('surveyName', this.state.surveyNameText);
     customForm.append('surveyTitleArray', surveyTitleArray);
     customForm.append('descriptionArray', descriptionArray);
     customForm.append('surveyFooterText', this.state.surveyFooterText);
     customForm.append('image', this.state.file);
     customForm.append('surveyInputs', surveyInputs);
     customForm.append('surveyCheckboxes', surveyCheckboxes);
     customForm.append('surveyRadioOptions', surveyRadioOptions);
     customForm.append('surveyDataArray', surveyDataArray);

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
    if(dialogName === 'surveyFooterDialog') {
      const surveyDataArray = [...this.state.surveyDataArray];
      const footerObj = {
        id: Math.random(),
        identifier: 'footer',
        text: this.state.surveyFooterText
      }
      surveyDataArray.push(footerObj)
      this.setState({[dialogName]: false, surveyDataArray, componentIndex: -1, dataIndex: -1 });
    } else {
      this.setState({[dialogName]: false, componentIndex: -1, dataIndex: -1 });
    }
  }

  changeTitleColor = (e, titleIndex) => {
    const titleArr = [ ...this.state.surveyTitleArray ];
    titleArr[titleIndex].colors.backgroundColor = e.target.value;
    this.setState({ surveyTitleArray: titleArr })
  }

  saveComponentDialog = (dialogName) => {
    let randomId, surveyDataArray;
    this.setState({[dialogName]: false});
    let inputArray = [];
    switch(dialogName) {
      case "surveyTitleDialog":
        inputArray = [ ...this.state.componentArray];
        const titleArr = [ ...this.state.surveyTitleArray]
        randomId = Math.random().toString(36).substr(2, 15);
        const titleObj = {
          id: Math.random().toString(),
          identifier: 'title',
          text: this.state.surveyTitleText,
          colors: {
            backgroundColor: '#ffffff'
          }
        }
        titleArr.push(titleObj);
        surveyDataArray = [...this.state.surveyDataArray];
        surveyDataArray.push(titleObj)
        const titleIndex = titleArr.indexOf(titleObj);
        this.setState({ surveyDataArray, surveyTitleArray: titleArr });
        break
      case "surveyDescrDialog":
        randomId = Math.random().toString(36).substr(2, 15);
        const descrArr = [ ...this.state.descriptionArray ];
        const descrObj = {
          id: Math.random().toString(),
          identifier: 'descr',
          text: this.state.surveyDescrText
        }
        surveyDataArray = [...this.state.surveyDataArray];
        surveyDataArray.push(descrObj)
        descrArr.push(descrObj);
        this.setState({ surveyDataArray, descriptionArray: descrArr });
        break
      case "surveyImageDialog":
        inputArray = [ ...this.state.componentArray];
        const surveyImage = inputArray.filter(item => item.props.id === "surveyImage");
        if(surveyImage.length > 0) {
          alert("You are allowed to add only one image")
          return
        } else {
          surveyDataArray = [...this.state.surveyDataArray];
          const imageObj = {
            id: Math.random(),
            identifier: 'image',
            imagePreviewUrl: this.state.imagePreviewUrl
          }
          surveyDataArray.push(imageObj)
          this.setState({ surveyDataArray });
        }
        break
        default:
          return
    }
  }

  // {{ INITIALIZE }}

  

  initSurveyInputDialog = () => {
    this.setState({surveyInputDialog: true});
  }


  initSurveyFooterDialog = () => {
    this.toggleSidebarOpen();
    this.setState({ surveyFooterDialog: true });
  }
  
  initSurveyDescrDialog = () => {
    this.toggleSidebarOpen();
    this.setState({surveyDescrDialog: true});
    }
  
  initSurveyImageDialog = () => {
    this.toggleSidebarOpen();
    this.setState({surveyImageDialog: true});
  }
  
  initSurveyTitleDialog = () => {
    this.toggleSidebarOpen();
    this.setState({surveyTitleDialog: true});
  }

  initSurveyCheckboxDialog = () => {
    this.toggleSidebarOpen();
    this.setState({surveyCheckboxDialog: true});
  }

  initSurveyRadioDialog = () => {
  this.toggleSidebarOpen();
  this.setState({surveyRadioDialog: true});
  }


  // {{ SAVE }}

  saveSurveyName = () => {
    this.setState({surveyNameEditingMode: false});
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
    const surveyDataArray = [...this.state.surveyDataArray];
    const inputObj = {
      id: Math.random(),
      identifier: 'input',
      text: inputLabel
    }
    surveyDataArray.push(inputObj);

    {/* <Button key={key + 'btn' + new Date().getSeconds()} size='small' style={{ fontWeight: 'bold', color: '#303f9f'}} onClick={(identifier) => this.editSurveyInputHandler(`${key}`)}>Edit</Button> */}
    this.setState({ surveyDataArray, surveyInputs: surveyInputs, surveyInputDialog: false });

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
        const surveyDataArray = [...this.state.surveyDataArray];
        const checkboxObj = {
          id: Math.random().toString(36).substr(2, 15),
          identifier: 'checkbox',
          question: this.state.surveyCheckboxTempQuestion,
          checkboxNames: checkboxNames,
        }
        surveyArr.push(checkboxObj);
        surveyDataArray.push(checkboxObj);
      this.setState({ surveyDataArray, surveyCheckboxes: surveyArr, surveyCheckboxTempQuestion: '', componentArray: inputArray, surveyCheckboxDialog: false  });
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
      const surveyDataArray = [...this.state.surveyDataArray];
      const radioObj = {
        id: Math.random(),
        identifier: 'radio',
        question: this.state.surveyRadioTempQuestion,
        options: radioOptions
      }
      surveyDataArray.push(radioObj);
      surveyRadioArr.push(radioObj);

    this.setState({ surveyDataArray, surveyRadioInitValues: surveyRadioInitValues, surveyRadioOptions: surveyRadioArr, surveyRadioTempQuestion: '', surveyRadioDialog: false  });
  }

  saveFooterText = () => {
    const surveyDataArray = [...this.state.surveyDataArray];
    const footerObj = {
      id: Math.random(),
      identifier: 'footer',
      text: this.state.surveyFooterText
    }
    surveyDataArray.push(footerObj)
    this.setState({ surveyDataArray, surveyFooterDialog: false })
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



  // {{ EDIT COMPONENTS }}

  
  editSurveyName = () => {
    this.setState({surveyNameEditingMode: true});
  }

  editSurveyTitleHandler = (obj) => {
     // get the index of array in the components array
     let surveyDataArray = [ ...this.state.surveyDataArray ];
     const titleArr = [ ...this.state.surveyTitleArray ];
     const componentIndex = surveyDataArray.map(e => e.id).indexOf(`${obj.id}`);
     const dataIndex = titleArr.map(e => e.id).indexOf(`${obj.id}`);
     // store it to state to be used for updating the component
     this.setState({ surveyTitleUpdateDialog: true, surveyTitleText: obj.text, componentIndex, dataIndex });
  }

  editSurveyDescrHandler = (obj) => {
    // get the index of array in the components array
    let surveyDataArray = [ ...this.state.surveyDataArray ];
    const descrArr = [ ...this.state.descriptionArray ];
    const componentIndex = surveyDataArray.map(e => e.id).indexOf(`${obj.id}`);
    const dataIndex = descrArr.map(e => e.id).indexOf(`${obj.id}`);
    // store it to state to be used for updating the component
    this.setState({ surveyDescrUpdateDialog: true, surveyDescrText: obj.text, componentIndex, dataIndex });
 }

  editSurveyInputHandler = (obj) => {
    // get the index of array in the components array
    let surveyDataArray = [ ...this.state.surveyDataArray ];
    const componentIndex = surveyDataArray.map(e => e.id).indexOf(obj.id);
    // store it to state to be used for updating the component
    this.setState({ surveyInputUpdateDialog: true, surveyInputLabelName: obj.text, componentIndex: componentIndex });
  }

  editSurveyImageHandler = (obj) => {
     // get the index of array in the components array
     let surveyDataArray = [ ...this.state.surveyDataArray ];
     const componentIndex = surveyDataArray.map(e => e.id).indexOf(obj.id);
     // store it to state to be used for updating the component
    this.setState({ surveyImageUpdateDialog: true, componentIndex: componentIndex })
  }

  editSurveyCheckBoxHandler = (obj) => {
    // get the index of array in the components array
    const surveyDataArray = [ ...this.state.surveyDataArray ];
    const checkboxArr = [ ...this.state.surveyCheckboxes ];
    const componentIndex = surveyDataArray.map(e => e.id).indexOf(obj.id);
    const dataIndex = checkboxArr.map(e => e.id).indexOf(obj.id);
    // store it to state to be used for updating the component
    this.setState({ surveyCheckboxUpdateDialog: true, surveyCheckboxQuestion: obj.question, componentIndex: componentIndex, dataIndex: dataIndex });
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

  editSurveyRadioOptionHandler = (obj) => {
    //update radio options
    // get the index of array in the components array
    const surveyDataArray = [ ...this.state.surveyDataArray ];
    const radioArr = [ ...this.state.surveyRadioOptions ];
    const componentIndex = surveyDataArray.map(e => e.id).indexOf(obj.id);
    const dataIndex = radioArr.map(e => e.id).indexOf(obj.id);
    // store it to state to be used for updating the component
    this.setState({ surveyRadioUpdateDialog: true, surveyRadioTempQuestion: obj.question, componentIndex: componentIndex, dataIndex: dataIndex });
  }

  editSurveyFooterHandler = () => {
    this.setState({ surveyFooterUpdateDialog: true });
  }
 

  // {{ UPDATE COMPONENTS }}

  
  updateDialog = (dialogName) => {
    this.setState({[dialogName]: false, componentIndex: -1, dataIndex: -1 });
  }

  updateSurveyTitleHandler = () => {
    const surveyDataArray = [ ...this.state.surveyDataArray ];
    const titleArr = [ ...this.state.surveyTitleArray ];  
    const titleObj = {
      id: Math.random().toString(),
      identifier: 'title',
      text: this.state.surveyTitleText
    }
    if (this.state.dataIndex !== -1) {
      titleArr[this.state.dataIndex] = titleObj
    }
    if (this.state.componentIndex !== -1) {
      surveyDataArray[this.state.componentIndex] = titleObj
    }
      this.setState({ surveyDataArray, surveyTitleArray: titleArr, componentIndex: -1, dataIndex: -1, surveyTitleUpdateDialog: false });
  }

  updateSurveyDescrHandler = () => {
    const surveyDataArray = [ ...this.state.surveyDataArray ];
    const descrArr = [ ...this.state.descriptionArray ];
    const descrObj = {
      id: Math.random().toString(),
      identifier: 'descr',
      text: this.state.surveyDescrText
    }
    if (this.state.dataIndex !== -1) {
      descrArr[this.state.dataIndex] = descrObj
    }
    if (this.state.componentIndex !== -1) {
      surveyDataArray[this.state.componentIndex] = descrObj
    }
    this.setState({ surveyDataArray, descriptionArray: descrArr, componentIndex: -1, dataIndex: -1, surveyDescrUpdateDialog: false });
  }

  updateSurveyInputHandler = () => {
    // update survey inputs object

    let inputLabel = this.state.surveyInputLabelName;

    const surveyInputs = {...this.state.surveyInputs};

    // delete surveyInputs[this.state.formerSurveyInputLabelName];
    //update obj

    Object.assign(surveyInputs, {[inputLabel]: ""})

    let surveyDataArray = []
    surveyDataArray = [...this.state.surveyDataArray];
    const inputObj = {
      id: Math.random(),
      identifier: 'input',
      text: inputLabel
    }
    if (this.state.componentIndex !== -1) {
      surveyDataArray[this.state.componentIndex] = inputObj
    }

    this.setState({ surveyDataArray, surveyInputs: surveyInputs, surveyInputDialog: false, componentIndex: -1, surveyInputUpdateDialog: false });

  }

  updateSurveyImageHandler = (e) => {
    let surveyDataArray;
    surveyDataArray = [ ...this.state.surveyDataArray ];
    const imageObj = {
      id: Math.random(),
      identifier: 'image',
      imagePreviewUrl: this.state.imagePreviewUrl
    }
    if (this.state.componentIndex !== -1) {
      surveyDataArray[this.state.componentIndex] = imageObj
    }
    this.setState({ surveyDataArray, surveyImageUpdateDialog: false, componentIndex: -1, dataIndex: -1 })
  }

  updateSurveyCheckboxHandler = () => {
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
              Object.values(checkboxObj).map(item => {
               if(item.value === '') {
                 return  // this is to prevent a checkbox with an empty name from being displayed in the form
               }
                // transfer object to as its been looped to checkboxNames obj using Object.assign method
               Object.assign(checkboxNames, {[item.value]: false});
             })
            });
            let surveyDataArray = [];
            surveyDataArray = [ ...this.state.surveyDataArray ]
            const checkboxObj = {
              id: Math.random().toString(36).substr(2, 15),
              identifier: 'checkbox',
              question: this.state.surveyCheckboxTempQuestion,
              checkboxNames: checkboxNames,
            }
            if (this.state.dataIndex !== -1) {
              surveyArr[this.state.dataIndex] = checkboxObj
            }
            if (this.state.componentIndex !== -1) {
              surveyDataArray[this.state.componentIndex] = checkboxObj
            }
            this.setState({ surveyCheckboxes: surveyArr, surveyCheckboxUpdateDialog: false, componentIndex: -1, dataIndex: -1, surveyCheckboxTempQuestion: '', surveyDataArray, surveyCheckboxDialog: false  });
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
        identifier: 'radio',
        question: this.state.surveyRadioTempQuestion,
        options: radioOptions
      }
      if (this.state.dataIndex !== -1) {
        surveyRadioArr[this.state.dataIndex] = radioObj
      }
      let surveyDataArray = [];
      surveyDataArray = [ ...this.state.surveyDataArray ]
      if (this.state.componentIndex !== -1) {
        surveyDataArray[this.state.componentIndex] = radioObj
      }

      this.setState({ surveyRadioInitValues: surveyRadioInitValues, surveyRadioOptions: surveyRadioArr, componentIndex: -1, dataIndex: -1, surveyRadioTempQuestion: '', surveyDataArray, surveyRadioUpdateDialog: false  });
  }

  updateSurveyFooterText = () => {
    this.setState({ surveyFooterUpdateDialog: false })
  }
  
  
  // {{ DELETE COMPONENTS }}

  deleteSurveyTitleHandler = (obj) => {

    const surveyDataArray = [...this.state.surveyDataArray];
    const newComponentArr = surveyDataArray.filter(item => item.id != obj.id);

    const titleArr = [ ...this.state.surveyTitleArray ];
    const filteredArr = titleArr.filter(item => item.id != obj.id);

    this.setState({ surveyDataArray: newComponentArr, surveyTitleArray: filteredArr })
  }

  deleteSurveyDescrHandler = (obj) => {
    const surveyDataArray = [...this.state.surveyDataArray];
    const newComponentArr = surveyDataArray.filter(item => item.id != obj.id);

    const descrArr = [ ...this.state.descriptionArray ];
    const filteredArr = descrArr.filter(item => item.id != obj.id);
    this.setState({ surveyDataArray: newComponentArr, descriptionArray: filteredArr })
  }

  deleteSurveyInputHandler = (obj) => {
    // delete from component array
    const surveyDataArray = [...this.state.surveyDataArray];
    const newComponentArr = surveyDataArray.filter(item => item.id != obj.id);

    // delete from surveyinputs obj
    const currentSurveyInputObj = {...this.state.surveyInputs};
    delete currentSurveyInputObj[obj.id];
    this.setState({ surveyInputs: currentSurveyInputObj, surveyDataArray: newComponentArr });
  }

  deleteSurveyImageHandler = (obj) => {
    const surveyDataArray = [...this.state.surveyDataArray];
    const newComponentArr = surveyDataArray.filter(item => item.id != obj.id);
    this.setState({ surveyDataArray: newComponentArr, file: null, imagePreviewUrl: null })
  }

  deleteSurveyCheckBoxHandler = (obj) => {
    // delete from component array
    const surveyDataArray = [...this.state.surveyDataArray];
    const newComponentArr = surveyDataArray.filter(item => item.id != obj.id);

    // delete from survey checkbox array
    const surveyArr = [ ...this.state.surveyCheckboxes ]
    const newCheckboxArr = surveyArr.filter(item => item.id != obj.id);

    this.setState({ surveyCheckboxes: newCheckboxArr, surveyDataArray: newComponentArr });
  }

  deleteSurveyRadioOptionHandler = (obj) => {
    // delete from component array
    const surveyDataArray = [...this.state.surveyDataArray];
    const newComponentArr = surveyDataArray.filter(item => item.id != obj.id);

    // delete from survey radio array
    const surveyArr = [ ...this.state.surveyRadioOptions ]
    const newRadioArr = surveyArr.filter(item => item.id != obj.id);

    this.setState({ surveyRadioOptions: newRadioArr, surveyDataArray: newComponentArr });
  }

  
  deleteSurveyFooterHandler = () => {
    this.setState({ surveyFooterText: '' })
  }

  toggleSidebarOpen = () => {
    const x = window.matchMedia("(max-width: 700px)");
    const sidebar = document.getElementById('surveySidebar');
    // sidebar will only disappear on mobile devices
    if(x.matches) {
      if(sidebar.style.transform === 'translate(-100%)') {
        sidebar.style.transform = 'translate(0)';
        this.setState({ sidebarOpen: true });
      } else {
        sidebar.style.transform = 'translate(-100%)';
        this.setState({ sidebarOpen: false });
      }
    }
  }

  // selectSurveyTitleColor = (key, randomId) => {
  //   const colorPickers = { ...this.state.colorPickers }
  //   colorPickers.heading = true;
  //   this.setState({ colorPickers: colorPickers })
  // }

  renderFooterContent() {
    if(this.state.surveyFooterText) {
    return (
      <div id="surveyFooter" className={classes.footerWrapper}>
        <div className={classes.footerLine}></div>
        <p>{this.state.surveyFooterText}</p>
        <div className={classes.footerActionsWrapper}>
            <Button size='sm' onClick={this.deleteSurveyFooterHandler}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
            <Button size='sm' onClick={this.editSurveyFooterHandler}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
        </div>
      </div>
    )
    } else {
      return
    }
  }


  titleComponent (obj) {
    return (
      <div key={obj.id} className={classes.titleWrapper}>
        <h2>{obj.text}</h2>
        <div className={classes.titleActionsWrapper}>
          <Button style={{ margin: '0 auto' }} size='sm' onClick={(arg1) => this.deleteSurveyTitleHandler(obj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button style={{ margin: '0 auto' }} size='sm' onClick={(arg1) => this.editSurveyTitleHandler(obj)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
          {/* <Input type="color" id="colorpicker" onChange={(e, arg2) => this.changeTitleColor(e, `${titleIndex}`)} value={newBgColor} /> */}
          {/* <Button style={{ margin: '0 auto' }} size='sm' onClick={(arg1, arg2) => this.selectSurveyTitleColor(`${titleObj.id}`, `${randomId}`)}><i className="fa fa-pencil-o" aria-hidden="true"></i></Button> */}
        </div>
      </div>
    )
  }

  descriptionComponent (obj) {
    return (
      <div key={obj.id} className={classes.descrWrapper}>
        <p>{obj.text}</p>
        <div className={classes.descrActionsWrapper}>
          <Button size='sm' onClick={(arg) => this.deleteSurveyDescrHandler(obj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button size='sm' onClick={(arg) => this.editSurveyDescrHandler(obj)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
        </div>
      </div>
    )
  }

  imageComponent (obj) {
    return (
      <div key={obj.id}className={classes.imageWrapper} id="surveyImage">
        {!obj.imagePreviewUrl ? null : <img src={obj.imagePreviewUrl} />}
        <br />
        <div className={classes.imageActionsWrapper}>
          <Button size='sm' id="removeImageBtn" onClick={(arg) => this.deleteSurveyImageHandler(obj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button size='sm' id="deleteImg" onClick={(arg) => this.editSurveyImageHandler(obj)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
        </div>
      </div>
    )
  }

  inputComponent (obj) {
    return (
      <div key={obj.id} className={classes.inputWrapper}>
        <FormGroup>
            <Label>{obj.text}</Label>
            <Input
              style={{ borderRadius: 0, height: '1.8rem' }}
              id={Math.random()}
              type="text"
              value=""
            />
        </FormGroup>
        <div className={classes.inputActionsWrapper}>
          <Button size='sm' onClick={(arg) => this.deleteSurveyInputHandler(obj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button size='sm' onClick={(arg) => this.editSurveyInputHandler(obj)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
        </div>
      </div>
    )
  }

  checkboxComponent (obj) {
    return (
      <div key={obj.id} className={classes.checkboxWrapper}>
        <FormGroup>
          <Label for="exampleCheckbox">{obj.question}</Label>
          <div>
          {Object.keys(obj.checkboxNames).map(key => (
            <CustomInput key={Math.random()} type="checkbox" id="exampleCustomInline2" label={`${key}`} inline />
          ))}
          </div>
        </FormGroup>
        <div className={classes.checkboxActionsWrapper}>
          <Button size='sm' onClick={(arg) => this.deleteSurveyCheckBoxHandler(obj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button size='sm' onClick={(arg) => this.editSurveyCheckBoxHandler(obj)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
        </div>
      </div>
    )
  }

  radioOptionsComponent (obj) {
    return (
      <div key={obj.id} className={classes.radioWrapper}>
        <FormGroup tag="fieldset">
          <legend style={{ fontSize: '1rem' }}></legend>
          <FormGroup>
          <Label for="exampleCheckbox">{obj.question}</Label>
          <div>
          {Object.keys(obj.options).map(key => (
            <CustomInput key={Math.random()} value={false} type="radio" id="exampleCustomRadio" name="customRadio" label={key} inline />
          ))}
        </div>
          </FormGroup>
        </FormGroup>
        <div className={classes.radioActionsWrapper}>
          <Button size='sm' onClick={(arg) => this.deleteSurveyRadioOptionHandler(obj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
          <Button size='sm' onClick={(arg) => this.editSurveyRadioOptionHandler(obj)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
        </div>
      </div>
    )
  }

  renderDashboardContent() {
   return (
     <div className={classes.dashboardContent}>
       <div>
        {this.state.componentArray.map(item => item)}
        {this.state.surveyDataArray.map(item => {
                if(item.identifier === 'title') {
                  return this.titleComponent(item);
                } else if (item.identifier === 'descr') {
                  return this.descriptionComponent(item)
                } else if (item.identifier === 'input') {
                  return this.inputComponent(item)
                } else if (item.identifier === 'image') {
                  return this.imageComponent(item)
                } else if (item.identifier === 'checkbox') {
                  return this.checkboxComponent(item)
                } else if (item.identifier === 'radio') {
                  return this.radioOptionsComponent(item)
                } else {
                  return
                }
              })}
       </div>
       <div style={{ marginTop: 'auto' }}>
        {this.renderFooterContent()}
       </div> 
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
         <RenderTitleModal saveComponentDialog={(mode) => this.saveComponentDialog('surveyTitleDialog')} surveyTitleDialog={this.state.surveyTitleDialog} surveyTitleText={this.state.surveyTitleText} changeSurveyTitle={this.changeSurveyTitle} removeDialog={(mode) => this.removeDialog('surveyTitleDialog')}/>
         <RenderDescriptionModal saveComponentDialog={(mode) => this.saveComponentDialog('surveyDescrDialog')} surveyDescrDialog={this.state.surveyDescrDialog} removeDialog={(mode) => this.removeDialog('surveyDescrDialog')} surveyDescrText={this.state.surveyDescrText} changeSurveyDescr={this.changeSurveyDescr} />
         <RenderImageModal saveComponentDialog={(mode) => this.saveComponentDialog('surveyImageDialog')} surveyImageDialog={this.state.surveyImageDialog} removeDialog={(mode) => this.removeDialog('surveyImageDialog')} surveyImagePath={this.state.surveyImagePath} changeSurveyImage={this.changeSurveyImage} imagePreviewUrl={this.state.imagePreviewUrl}/>
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
          <RenderFooterModal saveFooterText={this.saveFooterText} surveyFooterDialog={this.state.surveyFooterDialog} surveyFooterText={this.state.surveyFooterText} changeSurveyFooterText={this.changeSurveyFooterText} removeDialog={(mode) => this.removeDialog('surveyFooterDialog')}/>

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
            <RenderTitleUpdateModal updateSurveyTitleHandler={this.updateSurveyTitleHandler} surveyTitleUpdateDialog={this.state.surveyTitleUpdateDialog} surveyTitleText={this.state.surveyTitleText} changeSurveyTitle={this.changeSurveyTitle} updateDialog={(mode) => this.updateDialog('surveyTitleUpdateDialog')} />
            <RenderDescriptionUpdateModal updateSurveyDescrHandler={this.updateSurveyDescrHandler} surveyDescrUpdateDialog={this.state.surveyDescrUpdateDialog} updateDialog={(mode) => this.updateDialog('surveyDescrUpdateDialog')} surveyDescrText={this.state.surveyDescrText} changeSurveyDescr={this.changeSurveyDescr} />
            <RenderFooterUpdateModal updateSurveyFooterText={this.updateSurveyFooterText} surveyFooterUpdateDialog={this.state.surveyFooterUpdateDialog} surveyFooterText={this.state.surveyFooterText} changeSurveyFooterText={this.changeSurveyFooterText} updateDialog={(mode) => this.updateDialog('surveyFooterDialog')}/>

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
                        <h5>Heading</h5>
                      </Button>
                      <Button onClick={this.initSurveyDescrDialog} className={classes.ActionButton}>
                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        <h5>Paragraph</h5>
                      </Button>
                      <Button onClick={this.initSurveyImageDialog} className={classes.ActionButton}>
                        <i className="fa fa-file-image-o" aria-hidden="true"></i>
                        <h5>Logo/image</h5>
                      </Button>
                      <Button onClick={this.initSurveyInputDialog} className={classes.ActionButton}>
                        <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                        <h5>Input</h5>
                      </Button>
                      <Button onClick={this.initSurveyCheckboxDialog} className={classes.ActionButton}>
                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                        <h5>Checkbox</h5>
                      </Button>
                      <Button onClick={this.initSurveyRadioDialog} className={classes.ActionButton}>
                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i>
                        <h5>Radio options</h5>
                      </Button>
                      <Button onClick={this.initSurveyFooterDialog} className={classes.ActionButton}>
                        <i className="fa fa-font" aria-hidden="true"></i>
                        <h5>Footer text</h5>
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
