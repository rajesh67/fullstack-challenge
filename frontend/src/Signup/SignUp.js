import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import { registerUser } from "../_actions/user.actions";
import { stat } from 'fs';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

  
class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            username : '',
            first_name : '',
            last_name : '',
            password : '',
            open: true,
            vertical: 'top',
            horizontal: 'center',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        
    }

    handleClick = () => () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state)
        this.props.registerUser({
            'username':this.state.username,
            'email':this.state.email,
            'first_name':this.state.first_name,
            'last_name':this.state.last_name,
            'password': this.state.password
        })
        this.handleClick({ vertical: 'top', horizontal: 'center' })
        
    }

    render() {
        const { classes } = this.props;
        const { vertical, horizontal ,open } = this.state;
        
        // if(this.props.alertMessage){
        //     // this.setState({open:true})
            
        // }

        console.log(this.props.user)

        // if(this.props.user && this.props.user.id){
        //     localStorage.setItem('user', JSON.stringify(this.props.user));
        // }

        if(localStorage.getItem('user')){
            return (
                <Redirect to="/"/>
            )
        }

        return (
          <main className={classes.main}>
            <CssBaseline />
            
            <Paper className={classes.paper}>
            <div>
                {this.props.alertMessage && <Snackbar
          key={this.props.alertMessage}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.alertMessage}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />}
            </div>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" onChange={this.handleChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">User Name</InputLabel>
                  <Input id="username" name="username" autoComplete="username" onChange={this.handleChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="first_name">First Name</InputLabel>
                  <Input id="first_name" name="first_name" autoComplete="first_name" onChange={this.handleChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="last_name">Last Name</InputLabel>
                  <Input id="last_name" name="last_name" autoComplete="last_name" onChange={this.handleChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                </FormControl>
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                //   type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                    Register
                </Button>
              </form>
            </Paper>
          </main>
        );
      }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    alertType : state.alerts.type,
    alertMessage : state.alerts.message,
    user : state.users.item
})



export default connect(mapStateToProps, {registerUser, })(withStyles(styles)(SignUp));