import React, { Component } from 'react';
import axios from 'axios';
import Paginator from '../../../components/Paginator/Paginator';
import { withRouter } from 'react-router-dom';
import { Modal, Input, Button, Table } from 'reactstrap';

import * as classes from './SurveyList.module.css';


class SurveyList extends Component {

  state = {
    surveys: null,
    surveyPage: 1,
    totalItems: 0,
    modalOpen: false
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
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  renderModal () {
    return (
    <Modal
      className="modal-dialog-centered"
      toggle={this.closeModal}
      isOpen={this.state.modalOpen}
    >
      <div className="modal-body">
           <h1> What do you want to do? </h1>
      </div>
      <div className="modal-footer">
        <Button size="sm">
          Delete Survey
        </Button>
        <Button size="sm">Submit Survey</Button>
      </div>
    </Modal>)
  }

  renderSurveyList() {
    if(this.state.surveys) {
      if(this.state.surveys.length !== 0) {
       return this.state.surveys.map(survey => {
             return (
               <tr className={classes.TableRow} onClick={(surveyId) => this.initSurveyDialog(survey._id)} key={this.state.surveys.indexOf(survey)}>
                 <td>{this.state.surveys.indexOf(survey) + 1}</td>
                 <td>{survey.surveyName}</td>
                 <td>No</td>
                 <td>{survey.emailRecipients.length}</td>
                 <td>{survey.noOfRespondents}</td>
                 <td>25/01/2020</td>
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
      <Paginator
         onPrevious={this.loadSurveys.bind(this, 'previous')}
         onNext={this.loadSurveys.bind(this, 'next')}
         lastPage={Math.ceil(this.state.totalItems / 2)}
         currentPage={this.state.surveyPage}
         >
        <div className={classes.SurveyList}>
        <h5 style={{ color: 'rgba(0,0,0,.8)' }}>LIST OF SURVEYS</h5>
        <Table striped>
           <thead>
             <tr>
               <th>S/N</th>
               <th>Survey Name</th>
               <th>Sent</th>
               <th>No of Recipients</th>
               <th>No of Respondents</th>
               <th>Date Sent</th>
             </tr>
           </thead>
           <tbody>
               {this.renderSurveyList()}
           </tbody>
          </Table>
        </div>
        </Paginator>
    )
  }
}

export default withRouter(SurveyList);
