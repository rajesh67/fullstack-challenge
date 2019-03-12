import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import CommonLayout from "../CommonLayout/CommonLayout";
import HorizontalLabelPositionBelowStepper from "../_components/HorizontalLabelPositionBelowStepper";
import Footer from "../_components/Footer";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  root: {
      width: '100%',
      
      flexGrow: 1,
      marginTop : 85,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
    button: {
      margin: theme.spacing.unit,
      display : 'block'
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
});

class Checkout extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <CommonLayout>
          <div style={{marginTop:75}}>
            
            <div className={classes.root}>
                <div className={classNames( classes.layout)}>
                  <div style={{marginTop:50}}>
                    <h1>Checkout Page</h1>
                    <Grid container spacing={40}>
                      <Grid item xs={12}>
                          <Paper className={classes.paper} style={{height:'500px'}}>
                              <HorizontalLabelPositionBelowStepper />
                          </Paper>
                      </Grid>
                      <Grid item xs={4}>
                          {/* <Paper className={classes.paper}>
                              
                            
                          </Paper> */}
                      </Grid>
                      <Grid item xs={4}>
                          {/* <Paper className={classes.paper}>
                              
                              xs-4
                          </Paper> */}
                      </Grid>
                    </Grid>
                  </div>

                  {/* Footer */}
                <Footer />
                </div> 
                {/* /Layout End */}
          </div> 
          </div>
      </CommonLayout>
    )
  }
}

export default connect(null, {})(withStyles(styles)(Checkout));