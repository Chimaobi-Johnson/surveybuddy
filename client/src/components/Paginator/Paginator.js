import React from 'react';
import { Button } from 'reactstrap';

import * as classes from './Paginator.module.css';

const paginator = props => (
  <div className={classes.Paginator}>
    {props.children}
    <div className={classes.PaginatorControls}>
      {props.currentPage > 1 && (
        <Button size='sm' className={classes.PaginatorControl} onClick={props.onPrevious}>
          Previous
        </Button>
      )}
      {props.currentPage < props.lastPage && (
        <Button size='sm' className={classes.PaginatorControl} onClick={props.onNext}>
          Next
        </Button>
      )}
    </div>
  </div>
);

export default paginator;
