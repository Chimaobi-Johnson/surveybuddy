import React, { Component } from 'react';
import axios from 'axios';
import Paginator from '../../../components/Paginator/Paginator';
import { withRouter } from 'react-router-dom';
import { Modal, Input, Button, Table, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import loader from '../../../assets/images/gifs/pulse.gif';

import * as classes from './SurveyList.module.css';
import Dashboard from '../Dashboard';


class SurveyList extends Component {

  state = {
    surveys: null,
    surveyId: null,
    surveyPage: 1,
    totalItems: 0,
    modalOpen: false,
    surveyDeleting: false,
    deletingErrorMessage: null,
    deletingMessage: null,
    messageModal: true,
    tooltipOpen: false,
    tooltipOpen2: false
  }

  componentDidMount() {
    this.loadSurveys();
  }

  loadSurveys = direction => {
    // if (direction) {
    //   this.setState({ postsLoading: true, posts: [] });
    // }
    let page = this.state.surveyPage;
    if (direction === 'next') {
      page++;
      this.setState({ surveyPage: page });
    }
    if (direction === 'previous') {
      page--;
      this.setState({ surveyPage: page });
    }
    axios.get('/api/surveys?page=' + page).then(result => {
      this.setState({ surveys: result.data.surveys, totalItems: result.data.totalItems });
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  };

  initSurveyDialog = (surveyId) => {
    this.setState({ modalOpen: true, surveyId: surveyId });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  closeMessageModal = () => {
    this.setState({ messageModal: !this.state.messageModal });
  }

  deleteSurveyHandler = () => {
     this.setState({ surveyDeleting: true, modalOpen: false });
     axios.post("/api/survey/delete", { surveyId: this.state.surveyId })
     .then(response => {
        this.setState({ surveyDeleting: false, deletingErrorMessage: null, deletingMessage: 'Survey has been deleted successfully' });
        this.loadSurveys();
     })
     .catch(err => {
       console.log(err);
       this.setState({ surveyDeleting: false, deletingErrorMessage: 'Deleting failed check connection settings or try again later', deletingMessage: null })
     })
  }

  renderModal () {
    return (
    <Modal
      className="modal-dialog-centered"
      toggle={this.closeModal}
      isOpen={this.state.modalOpen}
    >
      <div className="modal-body">
           <h1> Are you sure you want to delete this survey? </h1>
      </div>
      <div className="modal-footer">
        <Button onClick={this.deleteSurveyHandler} size="sm">
          Yes
        </Button>
        <Button size="sm" onClick={this.closeModal}>No</Button>
      </div>
    </Modal>)
  }

  renderMessageModal () {
    if(this.state.deletingErrorMessage !== null) {
      return (
      <Modal
        className="modal-dialog-centered"
        toggle={this.closeMessageModal}
        isOpen={this.state.messageModal}
      >
        <div className="modal-body">
             <h1>{this.state.deletingErrorMessage}</h1>
        </div>
        <div className="modal-footer">
          <Button onClick={this.closeMessageModal} size="sm">
            Okay
          </Button>
        </div>
      </Modal>)
    } else if (this.state.deletingMessage !== null) {
        return (
        <Modal
          className="modal-dialog-centered"
          toggle={this.closeMessageModal}
          isOpen={this.state.messageModal}
        >
          <div className="modal-body">
               <h1>{this.state.deletingMessage}</h1>
          </div>
          <div className="modal-footer">
            <Button onClick={this.closeMessageModal} size="sm">
              Okay
            </Button>
          </div>
        </Modal>)
    } else {
      return;
    }
  }

  gotoResponsePage = (survey) => {
    if(survey.noOfRespondents === 0) {
      alert("No one has responded to this survey yet!")
    } else {
      this.props.history.push(`/survey/responses/${survey._id}`)
    }
  }

  toggleToolTip = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  toggleToolTip2 = () => {
    this.setState({ tooltipOpen2: !this.state.tooltipOpen2 })
  }

  renderSurveyList() {
    if(this.state.surveys) {
      if(this.state.surveys.length !== 0) {
       return this.state.surveys.map(survey => {
             return (
                 <tr className={classes.TableRow} key={this.state.surveys.indexOf(survey)}>
                   <td>{this.state.surveys.indexOf(survey) + 1}</td>
                   <td><Link onClick={(arg) => this.gotoResponsePage(survey)} to="#">{survey.surveyName}</Link></td>
                   <td>{survey.isSent ? "Yes" : "No"}</td>
                   <td>{survey.emailRecipients.length}</td>
                   <td>{survey.noOfRespondents}</td>
                   <td>25/01/2020</td>
                   <td>
                     <p onClick={(surveyId) => this.initSurveyDialog(survey._id)} className={classes.iconContainer} id="deleteSurvey"><i className="fa fa-trash" aria-hidden="true"></i></p>
                      {/* <Tooltip placement="left" isOpen={this.state.tooltipOpen} target="deleteSurvey" toggle={this.toggleToolTip}>
                        Delete Survey
                      </Tooltip> */}
                     <p onClick={() => this.props.history.push(`/surveys/review_final/${survey._id}`)} className={classes.iconContainer} id="previewSurvey"><i className="fa fa-eye" aria-hidden="true"></i></p>
                      {/* <Tooltip placement="left" isOpen={this.state.tooltipOpen2} target="previewSurvey" toggle={this.toggleToolTip2}>
                        Preview/Send 
                      </Tooltip> */}
                   </td>
                 </tr>
             )
           })
     } else {
      return <h6 style={{ color: 'rgba(0,0,0,.8)' }}>You have not created any surveys, goto menu and start!</h6>
    }
  } else {
    return <h6 style={{ color: 'rgba(0,0,0,.8)' }}>Loading...</h6>
  }
  }

  render () {

    // let renderSurveyList = <h3>You have not created any surveys, goto menu and start!</h3>
    // if(this.state.surveys) {
    //
    // }

    return (
      <Dashboard>
        <Paginator
          onPrevious={this.loadSurveys.bind(this, 'previous')}
          onNext={this.loadSurveys.bind(this, 'next')}
          lastPage={Math.ceil(this.state.totalItems / 2)}
          currentPage={this.state.surveyPage}
          >
          {this.renderModal()}
          {this.renderMessageModal()}
          <div className={classes.SurveyList}>
          {this.state.surveyDeleting ? <div className={classes.LoaderBox}><img src={loader} alt="loading..." /></div> : null }
          <h5 style={{ color: 'rgba(0,0,0,.8)' }}>LIST OF SURVEYS</h5>
          <Table striped responsive>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Survey Name</th>
                <th>Sent</th>
                <th>No of Recipients</th>
                <th>No of Respondents</th>
                <th>Date Sent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {this.renderSurveyList()}
            </tbody>
            </Table>
          </div>
          </Paginator>  
      </Dashboard>
    )
  }
}

export default withRouter(SurveyList);
