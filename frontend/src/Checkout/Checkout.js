import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

import CommonLayout, {  } from "../CommonLayout/CommonLayout";
// import PaypalExpressBtn from "./PaypalButton";
import scriptLoader from 'react-async-script-loader';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import { onError, onCancel, onSuccess } from "../_actions/payment.actions";
import { synchronizeUserState } from "../_actions/user.actions";
import { removeCartItems } from "../_actions/cart.actions";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginTop:85,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    // this.props.synchronizeUserState();

    if(this.props.carts.length ===0 ){
      return (
        <Redirect to="/shopping-cart"/>
      )
    }

    if(!localStorage.getItem('user')){
      return (
        <Redirect to="/login"/>
      )
    }

    console.log("==== User LoggedIN");
    console.log(this.props.user);

    const { classes, paypal } = this.props;
    const { activeStep } = this.state;
    
    // console.log(paypal)
    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
                console.log("The payment was succeeded!", payment);
                this.props.onSuccess(payment);
                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        this.props.onCancel(data);
        // this.props.removeCartItems();
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        this.props.onError(err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
        sandbox:    'AR8fXEL-HwcbzERJ7qoqnnXnszi2LmSG-8-ugm7uzPpyi2xO3QB4DMf4mLhS5fXqcxOR3XyGJUXEEwIt',
        production: 'YOUR-PRODUCTION-APP-ID',
    }; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout

    console.log("=========================Payment Details ====================")
    console.log(this.props.data);
    console.log(this.props.status);
    if(this.props.data && this.props.status!=='REQUESTED'){
      // this.handleNext();
      if(activeStep === steps.length - 1){
        this.handleNext();

        //remove product from cart
        
      }
    }

    return (
      <React.Fragment>
        
        <CommonLayout >
            <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                    <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
                </Stepper>
                <React.Fragment>
                {activeStep === steps.length ? (
                    <React.Fragment>
                      
                    {this.props.data && this.props.status === 'CANCELLED' && <Typography variant="h5" gutterBottom>
                        Sorry we could not process your order.
                        Your order number is #{this.props.data.paymentID}. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                    </Typography>
                    
                  }
                    {this.props.data && this.props.status === 'SUCCESS' && <Typography variant="h5" gutterBottom>
                        Thank you for this order!. Your order number is #{this.props.data.paymentID}. We have emailed your order confirmation, and will
                      send you an update when your order has shipped.
                    </Typography>}
                    
                    {this.props.data && this.props.status === 'FAILURE' && <Typography variant="h5" gutterBottom>
                        Sorry, Something went wrong while processing your payment.
                    </Typography>}
                    
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>

                        {activeStep !== 0 && (
                        <Button onClick={activeStep <= steps.length -1 ? this.handleBack : null} className={classes.button}>
                            Back
                        </Button>
                        )}
                        {activeStep<=steps.length-2 && <Button
                        variant="contained"
                        color="primary"
                        // primary="Next"
                        onClick={this.handleNext}
                        className={classes.button}
                        >
                        Next
                        </Button>}
                        <div style={{ alignItems:'center', paddingTop:"20px", position:"relative",top:"10px"}}>
                        {activeStep === steps.length - 1 ? <PaypalExpressBtn size="lg" env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> : <div></div>}
                        </div>
                    </div>
                    </React.Fragment>
                )}
                </React.Fragment>
            </Paper>
            </main>
        </CommonLayout>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  onCancel : PropTypes.func.isRequired,
  onSuccess : PropTypes.func.isRequired,
  onError : PropTypes.func.isRequired,
  synchronizeUserState : PropTypes.func.isRequired,
  removeCartItems : PropTypes.func.isRequired,

  classes: PropTypes.object.isRequired,
  data : PropTypes.object.isRequired,
  status : PropTypes.object.isRequired,

  user : PropTypes.object.isRequired,
  carts : PropTypes.array.isRequired
};

const mapStateToProps = state =>({
  data : state.payment.data,
  status : state.payment.status,
  user : state.users.item,

  carts : state.carts.items
})


// export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(withStyles(styles)(Checkout));
export default connect(mapStateToProps, {onCancel, onError, onSuccess, synchronizeUserState, removeCartItems})(withStyles(styles)(Checkout));