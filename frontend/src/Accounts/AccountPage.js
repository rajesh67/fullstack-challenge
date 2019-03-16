import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import CommonLayout from "../CommonLayout/CommonLayout";
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

class AccountPage extends Component {

constructor(props){
    super(props);
    this.state = {
        auth : false
    };
}
  
  render() {
    const { classes } = this.props

    if(!localStorage.getItem('user')){
        return (
          <Redirect to="/login" />
        )
      }
    
    return (
      <CommonLayout style={{marginTop:75}}>
            <div className={classes.root}>
                <div className={classNames( classes.layout)}>
                    
                    {/* Cart Details */}
                    <div style={{marginTop:65}}>
                        <h1>Account Page</h1>
                        {/* <CartProductsTable /> */}

                    </div>
                    
                    {/* Checkout buttons */}
                    <div style={{marginTop:50}}>
                      <Grid container spacing={40}>
                        {/* <Grid item xs={12}>
                            <Paper className={classes.paper}>
                          
                            xs-12
                            </Paper>
                        </Grid> */}
                        <Grid item xs={6}>
                            {/* <Paper className={classes.paper}>
                            </Paper> */}
                            <a href="/#/" style={{textDecoration:'none'}}>
                              <Button variant="contained" size="large" color="primary" className={classes.button} style={{display:'block'}}>
                                  Continue shopping 
                                </Button>
                            </a>
                        </Grid>
                        <Grid item xs={2}> </Grid>
                        
                        <Grid item xs={4} style={{textAlign:'right'}}>
                            {/* <Paper className={classes.paper}>
                                
                                xs-4
                            </Paper> */}
                            <a href="/#/checkout" style={{textDecoration:'none', textAlign:"right"}}>
                              <Button variant="contained" size="large" color="primary" className={classes.button} style={{display:'block'}}>
                                  Proceed to checkout 
                                </Button>
                            </a>
                        </Grid>
                        
                    </Grid>
                    </div>
                    {/* Footer */}
                    <Footer />
                </div>
            </div>

          
      </CommonLayout>
    )
  }
}

AccountPage.propTypes ={
    // getCartById : PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    
})


export default connect(mapStateToProps, { })(withStyles(styles)(AccountPage));