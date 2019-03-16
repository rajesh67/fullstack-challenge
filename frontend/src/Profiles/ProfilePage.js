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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import CommonLayout from "../CommonLayout/CommonLayout";
import Footer from "../_components/Footer";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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

class ProfilePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      value : 0,
    }
  }
  handleChange = (event,value) => {
    this.setState({value})
  }
  render() {
    const { classes } = this.props
    const { value } = this.state;

    if(!localStorage.getItem('user')){
        return (
            <Redirect to="/login"/>
        )
    }
    
    return (
      <CommonLayout style={{marginTop:75}}>
            <div className={classes.root}>
                <div className={classNames( classes.layout)}>
                    
                    {/* Cart Details */}
                    <div style={{marginTop:65}}>
                        <h1>Profile</h1>
                        {/* <CartProductsTable /> */}

                    </div>
                    
                    {/* Checkout buttons */}
                    <div style={{marginTop:50}}>
                      <Grid container spacing={40}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                          
                            <AppBar position="static" color="default">
                              <Tabs value={value} onChange={this.handleChange}>
                                <Tab label="Open orders" />
                                <Tab label="Completed orders" />
                                <Tab label="Cancelled orders" />
                              </Tabs>
                            </AppBar>
                            {value === 0 && <TabContainer>Item One</TabContainer>}
                            {value === 1 && <TabContainer>Item Two</TabContainer>}
                            {value === 2 && <TabContainer>Item Three</TabContainer>}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            {/* <Paper className={classes.paper}>
                            </Paper> */}
                            
                            
                        </Grid>
                        <Grid item xs={2}> </Grid>
                        
                        <Grid item xs={4} style={{textAlign:'right'}}>
                            {/* <Paper className={classes.paper}>
                                
                                xs-4
                            </Paper> */}
                            
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

ProfilePage.propTypes ={
    getCartById : PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    
})


export default connect(mapStateToProps, { })(withStyles(styles)(ProfilePage));