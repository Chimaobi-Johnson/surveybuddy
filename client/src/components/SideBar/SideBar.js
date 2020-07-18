import React from 'react';
import * as classes from './SideBar.module.css';

const sidebar = props => {

  return (
     <div className={classes.SideBarContent}>
      <div className={classes.TopSideBar}>
         <ul>
            <li>Credits: 200</li>
            <li>Surveys: 3</li>
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

export default sidebar;
