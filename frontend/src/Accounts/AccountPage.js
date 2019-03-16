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
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

class AccountPage extends Component {

  constructor(props){
      super(props);
      this.state = {
          auth : false,
          value : 0,
          shipping_region : "Select"
      };
  }

  handleChange = (event,value) => {
    this.setState({value})
  }

  handleSelectChange = name => event => {
    console.log(name);
    console.log(event.target.value)
    this.setState({ [name] : event.target.value });
    console.log(this.state);
  };
  
  render() {
    const { classes } = this.props
    const { value } = this.state;
    const user = localStorage.getItem('user');
    console.log(user.user)

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
                        <h1>Settings</h1>
                        {/* <CartProductsTable /> */}

                    </div>
                    
                    {/* Checkout buttons */}
                    <div style={{marginTop:50}}>
                      <Grid container spacing={40}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                          
                            <AppBar position="static" color="default">
                              <Tabs value={value} onChange={this.handleChange}>
                                <Tab label="Basic information" />
                                <Tab label="Shipping details" />
                                
                              </Tabs>
                            </AppBar>
                            {value === 0 && <TabContainer>
                              
                              <Typography variant="h6" gutterBottom>
                                    Basic Information
                                </Typography>
                                <Grid container spacing={24}>
                                  <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        autoComplete="username"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="first_name"
                                        name="first_name"
                                        label="First name"
                                        fullWidth
                                        autoComplete="first_name"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="second_name"
                                        name="second_name"
                                        label="Second name"
                                        fullWidth
                                        autoComplete="second_name"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        label="Email address"
                                        fullWidth
                                        autoComplete="email"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Button
                                        // type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                      >
                                        Save changes
                                      </Button>
                                    </Grid>
                                </Grid>
                            </TabContainer>}
                            {value === 1 && <TabContainer>

                                <Typography variant="h6" gutterBottom>
                                    Shipping address
                                </Typography>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        autoComplete="fname"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        autoComplete="lname"
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address1"
                                        name="address1"
                                        label="Address line 1"
                                        fullWidth
                                        autoComplete="billing address-line1"
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField
                                        id="address2"
                                        name="address2"
                                        label="Address line 2"
                                        fullWidth
                                        autoComplete="billing address-line2"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="billing address-level2"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal code"
                                        fullWidth
                                        autoComplete="billing postal-code"
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="country"
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        autoComplete="billing country"
                                    />
                                    </Grid>
                                    
                                </Grid>
                                <Grid item xs={12} sm={6} style={{marginTop:50}}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-native-simple">Shipping Region</InputLabel>
                                    <Select
                                      native
                                      value={this.state.shipping_region}
                                      onChange={this.handleSelectChange('shipping_region')}
                                      inputProps={{
                                        name: 'shipping_region',
                                        id: 'age-native-simple',
                                      }}
                                    >
                                      <option value="" />
                                      <option value={`Select`}>Select</option>
                                      <option value={`US /Canada`}>US / Canada</option>
                                      <option value={`Europe`}>Europe</option>
                                      <option value={`Rest of the world`}>Rest of the world</option>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                        label="Use this address for payment details"
                                    />
                                    </Grid>

                                <Grid item xs={12} sm={6} style={{marginTop:50}}>
                                  <Button
                                    // type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                  >
                                    Save changes
                                  </Button>
                                </Grid>
                                
                            </TabContainer>}
                            
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

AccountPage.propTypes ={
    // getCartById : PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    
})


export default connect(mapStateToProps, { })(withStyles(styles)(AccountPage));