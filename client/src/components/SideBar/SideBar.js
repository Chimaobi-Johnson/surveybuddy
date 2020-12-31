import React from 'react';
import { useSelector } from 'react-redux';
import * as classes from './SideBar.module.css';

const Sidebar = props => {

   const authState = useSelector(state => state.authReducer);

  return (
     <div className={classes.SideBarContent}>
      <div className={classes.TopSideBar}>
         <ul>
            <li>Credits: {authState ? authState.credits : '0'}</li>
            <li>Surveys: {authState ? authState.surveyNo : '0'}</li>
         </ul>
      </div>
      <div className={classes.BottomSideBar}>
        {props.children}
      </div>
      <div className={classes.SideBarFooter}>
          <p>&copy; 2020 by Wogu Chimaobi All Rights Reserved. Powered By MarvTech</p>
      </div>
     </div>
  )
}

export default Sidebar;
