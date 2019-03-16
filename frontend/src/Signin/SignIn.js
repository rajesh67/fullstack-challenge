import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { loginUser } from "../_actions/user.actions";

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

class SignIn extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        username : '',
        password : '',
        loggedIn : false,
        error : '',
        open : true,
      }
      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);

      this.handleClose = this.handleClose.bind(this);
    }

    handleFormChange(e){
      this.setState({[e.target.name]:e.target.value});
    }

    handleFormSubmit(e){
      e.preventDefault();
      console.log(this.state)
      this.props.loginUser({
        "username":this.state.username,
        "password":this.state.password
      });
      // this.props.location.reload(true)
      if(this.props.user && this.props.user.error){
        this.setState({loggedIn:false, error : this.props.user.error, open:true})
        
      }else{
        this.setState({loggedIn:true, error : '', open:true})
      }
      
    }

    handleClose = () => {
      this.setState({ open: !this.state.open });
    };

    render() {
        const { classes } = this.props;
        console.log(this.props.user)
        
        // console.log(this.props.user)
        var error = '';
        if(this.props.user && this.props.user.error){
          error=this.props.user.error
          // alert(error)
        }

        if(this.props.user && this.props.user.token){
          // console.log(this.props.user)
          localStorage.setItem('user', JSON.stringify(this.props.user));
          return (
            <Redirect to="/"/>
          )
        }

        return (
          <main className={classes.main}>
            <CssBaseline />
            { error && <Snackbar
          key={error}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{error}</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            //   UNDO
            // </Button>,
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

            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">User name</InputLabel>
                  <Input id="username" name="username" autoComplete="username" onChange={this.handleFormChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleFormChange}/>
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleFormSubmit}
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </main>
        );
      }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser : PropTypes.func.isRequired,
  user : PropTypes.object.isRequired,
  alertMessage : PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  user : state.users.item,
  // alertMessage : state.alers.message
})


export default connect(mapStateToProps, {loginUser, })(withStyles(styles)(SignIn));