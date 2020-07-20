import React, { useState } from 'react';
import SideBar from './SideBar';
import { Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

import * as classes from './DashboardSideBar.module.css';

const DashboardSidebar = props => {

  const [ sidebarOpen, setOpen ] = useState(false);

  const toggleSidebarOpen = () => {
    const sidebar = document.getElementById('sidebar');
    if(sidebar.style.transform === 'translate(-100%)') {
      sidebar.style.transform = 'translate(0)';
      setOpen(true);
    } else {
      sidebar.style.transform = 'translate(-100%)';
      setOpen(false);
    }
  }

  return (
       <div id="sidebar" className={classes.SideBarContainer}>
       <Button onClick={toggleSidebarOpen} className={classes.SideBarToggle}>
        { sidebarOpen ? <i className="fa fa-close"></i> : <i className="fa fa-bars"></i> }
       </Button>
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
  )
}

export default DashboardSidebar;
