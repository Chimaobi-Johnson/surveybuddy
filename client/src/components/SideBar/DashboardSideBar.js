import React from 'react';
import SideBar from './SideBar';
import { Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

import * as classes from './DashboardSideBar.module.css';

const dashboardsidebar = props => {

  const toggleSidebarOpen = () => {
    const sidebar = document.getElementById('sidebar');
    if(sidebar.style.display === 'block') {
      sidebar.style.display = 'none';
    } else {
      sidebar.style.display = 'block';
    }
  }

  return (
       <>
       <Button onClick={toggleSidebarOpen} className={classes.SideBarToggle}>T</Button>
       <div id="sidebar" className={classes.SideBarContainer}>
           <SideBar>
             <div className={classes.CreateSurveyBtn}>
               <Button><Link to="/surveys/new">Create New Survey</Link></Button>
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
        </>
  )
}

export default dashboardsidebar;
