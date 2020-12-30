import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Modal, Input, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';


import * as classes from '../../SurveyList/SurveyList.module.css';
import Dashboard from '../../Dashboard';


class ResponseList extends Component {

  state = {
    response: null,
    headerNames: null
  }

  componentDidMount() {
    const surveyId = window.location.pathname.split("/")[3];
    this.fetchResponse(surveyId)
  }

  fetchResponse = (surveyId) => {
    axios.get(`/api/survey/responses/${surveyId}`)
    .then(result => {
        this.setState({ response: result.data })
    }).catch(err => {
        console.log(err)
    })
 }

//   loadSurveys = direction => {
//     // if (direction) {
//     //   this.setState({ postsLoading: true, posts: [] });
//     // }
//     let page = this.state.surveyPage;
//     if (direction === 'next') {
//       page++;
//       this.setState({ surveyPage: page });
//     }
//     if (direction === 'previous') {
//       page--;
//       this.setState({ surveyPage: page });
//     }
//     axios.get('/api/surveys?page=' + page).then(result => {
//       this.setState({ surveys: result.data.surveys, totalItems: result.data.totalItems });
//       console.log(result);
//     }).catch(err => {
//       console.log(err);
//     })
//   };


  renderResponseList() {
    if(this.state.response) {
      if(this.state.response.responseList.length !== 0) {
       return this.state.response.responseList.map(item => {
           return (
            <tr className={classes.TableRow}>
                {/* <td>{this.state.response.responseList.indexOf(item) + 1}</td> */}
                {item.surveyDataArray.map(val => {
                    if (val.identifier === 'checkbox') {
                        return <td>{Object.keys(val.checkboxNames).map(i => {
                            if(val.checkboxNames[i] === true) {
                                return i.length === 1 ? i : `${i} `
                            } else {
                                return
                            }
                        })}</td>
                    } else {
                        return <td>{val.value}</td>
                    }
                 })}
            </tr>)
           })
     } else {
      return <h6 style={{ color: 'rgba(0,0,0,.8)' }}>You have not created any surveys, goto menu and start!</h6>
    }
  } else {
    return <h6 style={{ color: 'rgba(0,0,0,.8)' }}>Loading...</h6>
  }
  }

 renderTableHeading () {
     let result;
     if(this.state.response) {
         result = this.state.response.responseList[0].surveyDataArray.map(item => {
             if(item.identifier === 'title' || item.identifier === 'footer') {
                 return
             }
             return <th>{item.text ? item.text : item.question}</th>
         })
     }
    return result
 }

  render () {

    // let renderSurveyList = <h3>You have not created any surveys, goto menu and start!</h3>
    // if(this.state.surveys) {
    //
    // }

    console.log(this.state)

    return (
        <Dashboard>
            <div className={classes.SurveyList}>
            <h5 style={{ color: 'rgba(0,0,0,.8)' }}>LIST OF RESPONSES FOR <strong>{this.state.response ? this.state.response.responseList[0].surveyName : ''}</strong> SURVEY</h5>
            <Table striped responsive>
            <thead>
                <tr>
                    <th>S/N</th>
                    {this.renderTableHeading()}
                </tr>
            </thead>
            <tbody>
                {this.renderResponseList()}
            </tbody>
            </Table>
            </div>
        </Dashboard>
    )
  }
}

export default withRouter(ResponseList);
