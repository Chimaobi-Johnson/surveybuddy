import React from 'react';
import SideBar from './SideBar';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import * as classes from './DashboardSideBar.module.css';

const dashboardsidebar = props => {

  return (
       <div className={classes.SideBarContainer}>
           <SideBar>
             <div className={classes.CreateSurveyBtn}>
               <Button>Create New Survey</Button>
             </div>
             <div className={classes.SideBarMenuItems}>
                <ul>
                 <li><NavLink style={{ textDecorarion: 'none', color: '#fff' }} activeClassName="selectedLink" to="/surveys"><i className="fa fa-file-text-o" aria-hidden="true"></i> MY SURVEYS</NavLink></li>
                 <li><NavLink style={{ textDecorarion: 'none', color: '#fff' }} activeClassName="selectedLink" to="/surveys/credits"><i className="fa fa-money" aria-hidden="true"></i> CREDITS</NavLink></li>
                 <li><NavLink style={{ textDecorarion: 'none', color: '#fff' }} activeClassName="selectedLink" to="/surveys/credits/new"><i className="fa fa-cc-visa" aria-hidden="true"></i> BUY CREDITS</NavLink></li>
                 <li><NavLink style={{ textDecorarion: 'none', color: '#fff' }} activeClassName="selectedLink" to="#"><i className="fa fa-question-circle-o" aria-hidden="true"></i> HOW IT WORKS</NavLink></li>
                </ul>
             </div>
           </SideBar>
           </div>
  )
}

export default dashboardsidebar;
