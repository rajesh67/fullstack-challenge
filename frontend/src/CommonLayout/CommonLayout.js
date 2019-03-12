import React, { Component } from 'react'


import PrimarySearchAppBar from "../_components/PrimarySearchAppBar";
import Footer from '../_components/Footer';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class CommonLayout extends Component {
  
    constructor(props){
      super(props);
  }

  render() {
      const { classes } = this.props;
    return (
      <div>
        <PrimarySearchAppBar />
        {this.props.children}
        
      </div>
    )
  }
}

export default withStyles(styles)(CommonLayout);