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

class CreateSurveyWizard extends React.Component {

  state = {
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
    surveyCheckboxes: {
      checkboxOne: {
        id: 1,
        surveyCheckboxQuestion: '',
        surveyCheckboxNames: {},
        isDisplayed: false
      },
      checkboxTwo: {
        id: 2,
        surveyCheckboxQuestion: '',
        surveyCheckboxNames: {},
        isDisplayed: false
      },
      checkboxThree: {
        id: 3,
        surveyCheckboxQuestion: '',
        surveyCheckboxNames: {},
        isDisplayed: false
      }
    },
    surveyCheckboxInitValues: {
      checkboxOne: {
        value: '',
        editingMode: false
      },
      checkboxTwo: {
        value: ''
      },
      checkboxThree: {
        value: ''
      },
      checkboxFour: {
        value: ''
      },
      checkboxFive: {
        value: ''
      },
    },
    surveyRadioOptions: {
      radioOne: {
        id: 1,
        surveyRadioQuestion: '',
        surveyRadioOptionNames: [],
        surveyRadioAnswer: '',
        isDisplayed: false
      },
      radioTwo: {
        id: 2,
        surveyRadioQuestion: '',
        surveyRadioOptionNames: [],
        surveyRadioAnswer: '',
        isDisplayed: false
      },
      radioThree: {
        id: 3,
        surveyRadioQuestion: '',
        surveyRadioOptionNames: [],
        surveyRadioAnswer: '',
        isDisplayed: false
      }
    },
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
    sidebarOpen: false
  }

  // componentDidMount () {
  //   if(this.props.location.state.surveyId) {
  //      let formdata = new FormData();
  //      formdata.append('surveyId', this.props.location.state.surveyId)
  //      axios.post('/api/surveys', formdata).then(response => {
  //        console.log(response);
  //        this.setState({
  //        surveyId: response.data.surveyForm._id,
  //        surveyNameText: response.data.surveyForm.surveyName,
  //        surveyCheckboxes: { ...response.data.surveyForm.checkboxes },
  //        file: response.data.surveyForm.file,
  //        imagePreviewUrl: response.data.surveyForm.imagePreviewUrl,
  //        surveyDescrText: response.data.surveyForm.surveyDescrText,
  //        surveyFooterText: response.data.surveyForm.surveyFooterText,
  //        surveyRadioOptions: { ...response.data.surveyForm.surveyRadioOptions },
  //        surveyTitleText: response.data.surveyForm.surveyTitleText
  //       })
  //      }).catch(err => {
  //        console.log(err);
  //      });
  //   }
  // }

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
  }

  saveSurveyName = () => {
    this.setState({surveyNameEditingMode: false});
  }

  editSurveyName = () => {
    this.setState({surveyNameEditingMode: true});
  }

  surveyNameChange = (event) => {
    this.setState({surveyNameText: event.target.value});
  }

  changeSurveyTitle = (event) => {
      this.setState({surveyTitleText: event.target.value});
  }

  initSurveyTitleDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    this.toggleSidebarOpen();
    this.setState({surveyTitleDialog: true});
  }

  changeSurveyDescr = (event) => {
    this.setState({surveyDescrText: event.target.value});
  }

  initSurveyDescrDialog = () => {
  // document.getElementById('drawer-toggle').checked = false;
  this.toggleSidebarOpen();
  this.setState({surveyDescrDialog: true});
  }

  initSurveyImageDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    this.toggleSidebarOpen();
    this.setState({surveyImageDialog: true});
  }

  changeSurveyImage = (event) => {
    event.preventDefault();

      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      }

     reader.readAsDataURL(file);
     document.getElementById('removeImageBtn').style.display = 'block';
  }

  removeSurveyImageHandler = () => {
    document.getElementById('removeImageBtn').style.display = 'none';
    this.setState({ imagePreviewUrl: null });
  }



  initSurveyInputDialog = () => {
    const surveyInputsData = {...this.state.surveyInputs};
    const surveyInputLength = Object.keys(surveyInputsData).length
    if(surveyInputLength <= 4) {
      // document.getElementById('drawer-toggle').checked = false;
      this.toggleSidebarOpen();
      this.setState({surveyInputDialog: true});
    } else {
      // document.getElementById('drawer-toggle').checked = false;
      alert('You have reached the maximum number of inputs');
    }
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
    surveyInputs[inputLabel] = '';
    this.setState({surveyInputs: surveyInputs, surveyInputDialog: false});
  }

  deleteSurveyInputHandler = (key) => {
    const currentSurveyInputObj = {...this.state.surveyInputs};
    delete currentSurveyInputObj[key];
    this.setState({surveyInputs: currentSurveyInputObj});
  }

  initSurveyCheckboxDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    this.toggleSidebarOpen();
    const surveyCheckboxes = {...this.state.surveyCheckboxes};
    this.setState({surveyCheckboxDialog: true});
  }

  changeSurveyCheckboxQuestion = event => {
    this.setState({ surveyCheckboxTempQuestion: event.target.value });
  }

  changeCheckboxNumber = (event) => {
     this.setState({surveyCheckboxNumber: event.target.value});
  }

  surveyCheckboxNameChangeHandler = (event, checkbox) => {
    const checkboxInitValues = {...this.state.surveyCheckboxInitValues};
    checkboxInitValues[checkbox].value = event.target.value;
    this.setState({surveyCheckboxInitValues: checkboxInitValues});
  }


  surveyCheckboxNameChangeHandler = (event, checkbox) => {
    const checkboxInitValues = {...this.state.surveyCheckboxInitValues};
    checkboxInitValues[checkbox].value = event.target.value;
    this.setState({surveyCheckboxInitValues: checkboxInitValues});
  }

  saveSurveyCheckboxHandler = () => {
    const surveyCheckbox = {...this.state.surveyCheckboxes};
    const surveyCheckboxInitValues = {...this.state.surveyCheckboxInitValues};
    let checkboxNames = {};
    // loop each checkbox from one to three and transfer it from the initial state which is surveyCheckboxInitValues
    // to the permanent state which is either in checkbox one, two or three depending on how many the users wants
    switch (false) {
      case !isEmpty(surveyCheckboxInitValues.checkboxOne.value):
        alert('Please Edit Survey Form Checkbox Names');
        break;
      case !isEmpty(this.state.surveyCheckboxTempQuestion):
        alert('Please Edit Survey Form Checkbox Question');
        break;
      case surveyCheckbox.checkboxOne.isDisplayed:
         surveyCheckbox.checkboxOne.surveyCheckboxQuestion = this.state.surveyCheckboxTempQuestion;
         surveyCheckbox.checkboxOne.isDisplayed = true;
         Object.values(surveyCheckboxInitValues).map(checkboxObj => {
           if(checkboxObj.value === '') {
             return  // this is to prevent a checkbox with an empty name from being displayed in the form
           }
            // transfer object to as its been looped to checkboxNames obj using Object.assign method
             return Object.assign(checkboxNames, {[checkboxObj.value]: false});
         });
         // Clear the values so as to prevent the old state from displaying on the UI
         Object.values(surveyCheckboxInitValues).map(checkboxObj => {
             checkboxObj.value = '';
         });
         surveyCheckbox.checkboxOne.surveyCheckboxNames = checkboxNames
         this.setState({surveyCheckboxes: surveyCheckbox, surveyCheckboxTempQuestion: '', surveyCheckboxInitValues: surveyCheckboxInitValues, surveyCheckboxDialog: false});
        break;
      case surveyCheckbox.checkboxTwo.isDisplayed:
        surveyCheckbox.checkboxTwo.surveyCheckboxQuestion = this.state.surveyCheckboxTempQuestion;
        surveyCheckbox.checkboxTwo.isDisplayed = true;
        Object.values(surveyCheckboxInitValues).map(checkboxObj => {
          if(checkboxObj.value === '') {
            return  // this is to prevent a checkbox with an empty name from being displayed in the form
          }
             return Object.assign(checkboxNames, {[checkboxObj.value]: false});
        });
        // Clear the values so as to prevent the old state from displaying on the UI
        Object.values(surveyCheckboxInitValues).map(checkboxObj => {
            checkboxObj.value = '';
        });
        surveyCheckbox.checkboxTwo.surveyCheckboxNames = checkboxNames
        this.setState({surveyCheckboxes: surveyCheckbox, surveyCheckboxTempQuestion: '', surveyCheckboxDialog: false });
        break;
      case surveyCheckbox.checkboxThree.isDisplayed:
        surveyCheckbox.checkboxThree.surveyCheckboxQuestion = this.state.surveyCheckboxTempQuestion;
        surveyCheckbox.checkboxThree.isDisplayed = true;
        Object.values(surveyCheckboxInitValues).map(checkboxObj => {
          if(checkboxObj.value === '') {
            return  // this is to prevent a checkbox with an empty name from being displayed in the form
          }
             return Object.assign(checkboxNames, {[checkboxObj.value]: false});
        });
        // Clear the values so as to prevent the old state from displaying on the UI
        Object.values(surveyCheckboxInitValues).map(checkboxObj => {
            checkboxObj.value = '';
        });
        surveyCheckbox.checkboxThree.surveyCheckboxNames = checkboxNames
        this.setState({surveyCheckboxes: surveyCheckbox, surveyCheckboxTempQuestion: '', surveyCheckboxDialog: false });
       break;
      default:
        return alert('You cant add more than 3 checkbox questions'); //issue here
    }
  }

    deleteSurveyCheckBoxHandler = (checkboxObj) => {
      // checkbox is an Object
      // surveyCheckboxes is spread out here and the id is used as
      // a unique identifier to compare and get the current checkbox the user wants to delete
      const surveyCheckboxes = {...this.state.surveyCheckboxes};
      Object.values(surveyCheckboxes).map(checkbox => {
        if(checkbox.id === checkboxObj.id) {
          checkbox.surveyCheckboxQuestion = '';
          checkbox.surveyCheckboxNames = {};
          checkbox.isDisplayed = false;
        }
      });
      this.setState({ surveyCheckboxes });
    }

    // if(!isEmpty(checkboxObj.surveyCheckboxNames)) {
    //   checkboxDeleteBtn = <Button onClick={(checkboxObj) => this.deleteSurveyCheckBoxHandler(checkboxObj)}>Delete</Button>;
    // }

    renderSurveyCheckbox() {
      let checkboxItems, checkboxDeleteBtn;
       return Object.values(this.state.surveyCheckboxes).map(checkboxObj => {
         if(checkboxObj.surveyCheckboxNames) {
           // To render checkbox items
           checkboxItems = Object.keys(checkboxObj.surveyCheckboxNames)
           .map(checkbox => {
             return (
               <CustomInput key={Math.random() + "-ent"} type="checkbox" id="exampleCustomInline2" label={checkbox} inline />
            )
           });
         }
         return (
           <div key={Math.random()}>
           <FormGroup>
            <Label for="exampleCheckbox">{checkboxObj.surveyCheckboxQuestion}</Label>
            <div>
            {checkboxItems}
            {checkboxObj.surveyCheckboxQuestion ? <Button size='sm' onClick={(checkbox) => this.deleteSurveyCheckBoxHandler(checkboxObj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button> : null}
            </div>
           </FormGroup>

           </div>
         )
       })
    }


    saveCheckboxNameHandler = () => {
      const checkboxInitValues = {...this.state.surveyCheckboxInitValues};
      checkboxInitValues.checkboxOne.editingMode = false;
      this.setState({surveyCheckboxInitValues: checkboxInitValues});
    }

    editCheckboxNameHandler = () => {
      const checkboxInitValues = {...this.state.surveyCheckboxInitValues};
      checkboxInitValues.checkboxOne.editingMode = true;
      this.setState({surveyCheckboxInitValues: checkboxInitValues});
    }


  initSurveyFooterDialog = () => {
    // document.getElementById('drawer-toggle').checked = false;
    this.toggleSidebarOpen();
    this.setState({ surveyFooterDialog: true });
  }

  changeSurveyFooterText = event => {
    this.setState({ surveyFooterText: event.target.value });
  }

  changeSurveyRadioName = (event, option) => {
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    surveyRadioInitValues[option].value = event.target.value;
    this.setState({ surveyRadioInitValues });
  }

  editRadioNamesHandler = () => {
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    surveyRadioInitValues.optionOne.editingMode = true;
    this.setState({ surveyRadioInitValues });
  }

  initSurveyRadioDialog = () => {
  // document.getElementById('drawer-toggle').checked = false;
  this.toggleSidebarOpen();
  this.setState({surveyRadioDialog: true});
  }

  saveRadioNamesHandler = () => {
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    surveyRadioInitValues.optionOne.editingMode = false;
    this.setState({ surveyRadioInitValues });
  }


  changeSurveyRadioQuestion = event => {
    this.setState({ surveyRadioTempQuestion: event.target.value });
  }

  saveSurveyRadioHandler = () => {

    const surveyRadioOptions = {...this.state.surveyRadioOptions};
    const surveyRadioInitValues = {...this.state.surveyRadioInitValues};
    let radioOptions = {};
    // loop each checkbox from one to three and transfer it from the initial state which is surveyCheckboxInitValues
    // to the permanent state which is either in checkbox one, two or three depending on how many the users wants
    switch (false) {
      case surveyRadioOptions.radioOne.isDisplayed:
         surveyRadioOptions.radioOne.surveyRadioQuestion = this.state.surveyRadioTempQuestion;
         surveyRadioOptions.radioOne.isDisplayed = true;
         Object.values(surveyRadioInitValues).map(radioObj => {
           surveyRadioOptions.radioOne.surveyRadioOptionNames.push(radioObj.value);
         });
         this.setState({surveyRadioOptions: surveyRadioOptions, surveyRadioTempQuestion: '', surveyRadioDialog: false });
        break;
      case surveyRadioOptions.radioTwo.isDisplayed:
         surveyRadioOptions.radioTwo.surveyRadioQuestion = this.state.surveyRadioTempQuestion;
         surveyRadioOptions.radioTwo.isDisplayed = true;
         Object.values(surveyRadioInitValues).map(radioObj => {
           surveyRadioOptions.radioTwo.surveyRadioOptionNames.push(radioObj.value);
         });
         this.setState({surveyRadioOptions: surveyRadioOptions, surveyRadioTempQuestion: '', surveyRadioDialog: false });
        break;
      case surveyRadioOptions.radioThree.isDisplayed:
         surveyRadioOptions.radioThree.surveyRadioQuestion = this.state.surveyRadioTempQuestion;
         surveyRadioOptions.radioThree.isDisplayed = true;
         Object.values(surveyRadioInitValues).map(radioObj => {
           surveyRadioOptions.radioThree.surveyRadioOptionNames.push(radioObj.value);
         });
         this.setState({surveyRadioOptions: surveyRadioOptions, surveyRadioTempQuestion: '', surveyRadioDialog: false });
        break;
      default:
        return alert('You cant add more than 3 Radio Options'); //issue here
    }

  }

  deleteSurveyRadioOptionHandler = (radio) => {
    // radio is an Object
    // surveyRadioOptions is spread out here and the surveyRadioQuestion is used as
    // a unique identifier to compare and get the current radio the user wants to delete
    const surveyRadioOptions = {...this.state.surveyRadioOptions};
    Object.values(surveyRadioOptions).map(radioObj => {
      if(radioObj.id === radio.id) {
        radioObj.surveyRadioQuestion = '';
        radioObj.surveyRadioOptionNames.length = 0;
        radioObj.isDisplayed = false;
      }
    });
    this.setState({ surveyRadioOptions });
    console.log(radio);
  }


  renderSurveyRadioOptions() {
      return Object.values(this.state.surveyRadioOptions).map(radioObj => {
        if(radioObj.surveyRadioOptionNames.length !== 0) {
          return (
            <div key={Math.random()}>
            <FormGroup tag="fieldset">
              <legend style={{ fontSize: '1rem' }}></legend>
              <FormGroup>
              <Label for="exampleCheckbox">{radioObj.surveyRadioQuestion}</Label>
              <div>
                <CustomInput value={radioObj.surveyRadioOptionNames[0]} type="radio" id="exampleCustomRadio" name="customRadio" label={radioObj.surveyRadioOptionNames[0]} inline />
                <CustomInput value={radioObj.surveyRadioOptionNames[1]} type="radio" id="exampleCustomRadio2" name="customRadio" label={radioObj.surveyRadioOptionNames[1]} inline />
                <Button size='sm' onClick={(radio) => this.deleteSurveyRadioOptionHandler(radioObj)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
              </div>
              </FormGroup>
            </FormGroup>
            </div>)
        }
      });
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
       <h2 style={{textAlign: 'center',fontSize: '1.2rem', paddingTop: '1rem'}}>{this.state.surveyTitleText}</h2>
       <p style={{textAlign: 'center', fontSize: '.9rem'}}>{this.state.surveyDescrText}</p>
       <div className={classes.SurveyImageBox}>
          {!this.state.imagePreviewUrl ? null : <img src={this.state.imagePreviewUrl} />}
          <br />
          <Button style={{ display: 'none', margin: '0 auto' }} size='sm' id="removeImageBtn" onClick={this.removeSurveyImageHandler}>Remove Image</Button>
       </div>
       <div id="inputArea" className={classes.InputArea}>
       {
         Object.keys(this.state.surveyInputs).map(key => {
                return (<>
                  <FormGroup>
                      <Label>{key}</Label>
                        <Input
                         style={{ borderRadius: 0, height: '1.8rem' }}
                         key={key + new Date().getMilliseconds()}
                         id={key}
                         type="text"
                         value={this.state.surveyInputs[key]}
                         onChange={(event, key) => this.surveyInputChangeHandler(event, {key})}
                       />
                     <Button size='sm' key={key + 'btn' + new Date().getMilliseconds()} onClick={(identifier) => this.deleteSurveyInputHandler(`${key}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
                  </FormGroup>
                    </>)
                 {/* <Button key={key + 'btn' + new Date().getSeconds()} size='small' style={{ fontWeight: 'bold', color: '#303f9f'}} onClick={(identifier) => this.editSurveyInputHandler(`${key}`)}>Edit</Button> */}
       })
       }
       </div>
       <div style={{ textAlign: 'center' }}>
         {this.renderSurveyCheckbox()}
         {this.renderSurveyRadioOptions()}
       </div>
       <div className={classes.SurveyFooterText}>{this.state.surveyFooterText ? this.state.surveyFooterText : null}</div>
     </div>
   )
 }

  render() {
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
                   surveyCheckboxInitValues={this.state.surveyCheckboxInitValues.checkboxOne.editingMode} editCheckboxNameHandler={this.editCheckboxNameHandler}
                   checkboxOneInitValue={this.state.surveyCheckboxInitValues.checkboxOne.value}
                   checkboxTwoInitValue={this.state.surveyCheckboxInitValues.checkboxTwo.value}
                   checkboxThreeInitValue={this.state.surveyCheckboxInitValues.checkboxThree.value}
                   checkboxFourInitValue={this.state.surveyCheckboxInitValues.checkboxFour.value}
                   checkboxFiveInitValue={this.state.surveyCheckboxInitValues.checkboxFive.value}
                   surveyCheckboxNumber={this.state.surveyCheckboxNumber}
                   />
          <RenderRadioModal surveyRadioDialog={this.state.surveyRadioDialog} removeDialog={(mode) => this.removeDialog('surveyRadioDialog')}
                   surveyRadioTempQuestion={this.state.surveyRadioTempQuestion} changeSurveyRadioQuestion={this.changeSurveyRadioQuestion} saveSurveyRadioHandler={this.saveSurveyRadioHandler}
                   optionOne={this.state.surveyRadioInitValues.optionOne.value} optionTwo={this.state.surveyRadioInitValues.optionTwo.value}
                   editingMode={this.state.surveyRadioInitValues.optionOne.editingMode} changeSurveyRadioName={this.changeSurveyRadioName}
                   editRadioNamesHandler={this.editRadioNamesHandler} saveRadioNamesHandler={this.saveRadioNamesHandler}
                   />
          <RenderFooterModal surveyFooterDialog={this.state.surveyFooterDialog} surveyFooterText={this.state.surveyFooterText} changeSurveyFooterText={this.changeSurveyFooterText} removeDialog={(mode) => this.removeDialog('surveyFooterDialog')}/>

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
