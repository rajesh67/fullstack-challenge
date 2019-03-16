import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getAllCategories } from "../_actions/category.actions";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: '/images/category_images/French.jpg',
    title: 'Breakfast',
    width: '40%',
  },
  {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Burgers',
    width: '30%',
  },
  {
    url: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    width: '30%',
  },
];

class CategoryButtonBases extends React.Component{
    constructor(props){
        super(props);
        this.props.getAllCategories();
        this.handleClick = this.handleClick.bind(this);


    }

    handleClick(category){

      return (
        <Redirect to={`/categories/${category.id}`}/>
      )
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.categories)
        
        return (
          <div className={classes.root}>
            {this.props.categories && this.props.categories.slice(0,6).map(image => (
              <ButtonBase
                focusRipple
                key={image.name}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: '33.33%',
                 
                }}
                // onClick={this.handleClick}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(/images/category_images/${image.name}.jpg)`,
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Link to={`/categories/${image.id}`} style={{textTransform:'none', textDecoration:'none', color:'none',color:'white'}}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {image.name}
                    <span className={classes.imageMarked} />
                  </Typography>
                  </Link>
                </span>
              </ButtonBase>
            ))}
          </div>
        );
      }
}

CategoryButtonBases.propTypes = {
    classes: PropTypes.object.isRequired,
    getAllCategories : PropTypes.func.isRequired,
    categories : PropTypes.array
  };
  
  const mapStateToProps = state => ({
      categories : state.categories.items,
      loading : state.categories.loading,
      error : state.categories.error
  })

export default connect(mapStateToProps, {getAllCategories, })(withStyles(styles)(CategoryButtonBases));