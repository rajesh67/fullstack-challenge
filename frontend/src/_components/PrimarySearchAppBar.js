import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';


import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import SwipeableTemporaryDrawer from './SwipableTemporaryDrawer';
import FullScreenDialog from "./FullScreenDialog";
import HorizontalLabelPositionBelowStepper from "./HorizontalLabelPositionBelowStepper";

import { userService } from "../_services/user.service";

import { getAllCategories } from "../_actions/category.actions";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    textTransform:'uppercase',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});

class SearchAppBar extends React.Component {
  componentWillMount(){
    // this.props.getAllCategories
  }
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      left : false,
      open : false,
      auth : false,
      anchorEl: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleCartClose = this.handleCartClose.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('user')){
      this.setState({auth:true})
    }
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAccount = () => {

    this.setState({ anchorEl: null });
  }

  handleProfile = () => {

    this.setState({ anchorEl: null });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({auth : localStorage.getItem('user')? true : false, anchorEl: null })
  }

  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };

  toggleDrawer = (side, open) => () => {
    this.setState({[side] : open})
  }

  toggleDialog = (event, open) => () => {
    this.setState({dialog:open})
  } 

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCartClose = () => {
    this.setState({ open: false });
  };

  render(){
    const { classes } = this.props;
      const { value, auth } = this.state;
      const open = Boolean(this.state.anchorEl);
      const carts = Array(localStorage.getItem('cart'))

      const sideList = (
        <div className={classes.list}>
          <h5>Departments</h5>
          <List>
            {this.props.departments && this.props.departments.map((dept) => (
              <ListItem button key={dept.id}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <a href={`/#/departments/${dept.id}`} style={{textDecoration:'none', textTransform:'uppercase'}}>
                  <ListItemText primary={dept.name} />
                </a>
              </ListItem>
            ))}
          </List>
          <Divider />
          <h5>Categories</h5>
          <List>
            {this.props.categories && this.props.categories.map((category) => (
              <ListItem button key={category.id}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <a href={`/#/categories/${category.id}`} style={{textDecoration:'none', textTransform:'uppercase'}}>
                  <ListItemText primary={category.name} />
                </a>
              </ListItem>
            ))}
          </List>
        </div>
      );
    
      return (
        
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon onClick={this.toggleDrawer('left', true)}/>
                <SwipeableDrawer
                  open={this.state.left}
                  onClose={this.toggleDrawer('left', false)}
                  onOpen={this.toggleDrawer('left', true)}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                  >
                    
                    {sideList}
                  </div>
                </SwipeableDrawer>
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Shope-mate
              </Typography>
              <div className={classes.grow} >
                {/* <Tabs value={value} onChange={this.handleChange}>
                  <Tab label="Men's " />
                  <Tab label="Women's " />
                  <Tab label="Summer's " />
                  <Tab label="kids" />
                  <Tab label="Shoes " />
                  <Tab label="Brands " />
                </Tabs> */}
                {/* {value === 0 && <TabContainer>Item One</TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>} */}
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <a href="/#/shopping-cart">
                <IconButton aria-label="Cart">
                  <Badge badgeContent={this.props.carts && this.props.carts.length} color="primary" classes={{ badge: classes.badge }}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </a>
              {this.state.auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={this.handleAccount}>My account</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}

              <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleCartClose}
                TransitionComponent={Transition}
              >
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton color="inherit" onClick={this.handleCartClose} aria-label="Close">
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.flex}>
                      Sound
                    </Typography>
                    <Button color="inherit" onClick={this.handleCartClose}>
                      save
                    </Button>
                  </Toolbar>
                </AppBar>
                {/* <List>
                  <ListItem button>
                    <ListItemText primary="Phone ringtone" secondary="Titania" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                  </ListItem>
                </List> */}
                <HorizontalLabelPositionBelowStepper />
              </Dialog>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllCategories : PropTypes.func.isRequired,
  carts : PropTypes.array,
  departments : PropTypes.array,
  categories : PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  carts : state.carts.items,
  lastCartItem : state.carts.item,
  departments : state.departments.items,
  categories : state.categories.items
})

export default connect(mapStateToProps, {getAllCategories})(withStyles(styles)(SearchAppBar));