import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';



import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getAllProducts, productActions } from "../_actions/product.actions";
import { getAllCategories } from "../_actions/category.actions";
import { addtoCart } from "../_actions/cart.actions";

import DepartmentButtons from "./DepartmentButtons";
import CategoryButtons from "./CategoryButtons";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    margin: '0 auto',
    padding: `${theme.spacing.unit * 30}px 0 ${theme.spacing.unit * 25}px`,
    backgroundImage : 'url(https://thumbs.dreamstime.com/b/shopping-woman-holding-red-bag-black-friday-holiday-beautiful-young-make-girl-dark-background-104350636.jpg)',
    backgroundRepeat : 'none',
    backgroundSize : 'cover',
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing.unit * 6,

    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },

  icon: {
    color: 'white',
  },

  //Signup link
  Links : {
    textDecoration : 'none'
  },

  // Departments butoons
  departmentButtons : {
    margin : '50px auto 50px auto',
  },

  sectionTitle :{
    // textDecoration:'uppercase',
    textTransform : 'uppercase'
  }
});

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class Album extends React.Component{

    constructor(props){
        super(props);
        this.props.getAllProducts();
        this.props.getAllCategories();
    }

    handleAddToCart = (product)=>{
      this.props.addtoCart(product); 
      console.log("ADd to cart clicked");
      
    }

    render() {
    const { classes } = this.props;
    console.log(this.props.products)
    console.log(this.props.categories)
    return (
        <React.Fragment>
        <CssBaseline />
        
        <main>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" style={{color:'white', textTransform:'uppercase', fontWeight:'bold'}} gutterBottom>
                Shop mate
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" style={{color:'white', textTransform:'uppercase'}} paragraph>
                We fullfill the need of our customers since last 50+ yrs.
                </Typography>
                
                <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                    <Grid item>
                    <a href="/#/login" className={classes.Links}>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                    </a>
                    </Grid>
                    <Grid item>
                    <a href="/#/signup" className={classes.Links}>
                      <Button variant="outlined" color="primary">
                          Signup
                      </Button>
                    </a>
                    </Grid>
                </Grid>
                </div>
            </div>
            </div>
            <div cols={12} style={{marginTop:50}}>
                
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)} id="departments">

            <div className={classes.departmentButtons} >
              <h1 className={classes.sectionTitle}>Departments</h1>
              <DepartmentButtons />
            </div>

            <div className={classes.departmentButtons}>
              <h1 className={classes.sectionTitle}>Categories</h1>
              <CategoryButtons />
            </div>
            {/* <GridList cellHeight={200} spacing={1} className={classes.gridList}>
              {this.props.products && this.props.products.map(tile => (
                <GridListTile key={tile.image} cols={1} rows={ 1}>
                  <img src={`/images/product_images/${tile.image}`} alt={tile.name} />
                  <GridListTileBar
                    title={tile.name}
                    titlePosition="top"
                    actionIcon={
                      <IconButton className={classes.icon}>
                        <StarBorderIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </GridListTile>))}
            </GridList>     */}
            {/* End hero unit */}
            <h1 className={classes.sectionTitle}>Top products</h1>
            <Grid container spacing={40}>
                
                {this.props.loading && <CircularProgress className={classes.progress} />}
                {this.props.products && this.props.products.map(card => (
                <Grid item key={card.id} sm={6} md={4} lg={3}>
                    
                    <Card className={classes.card}>
                    <CardActionArea >
                      <CardMedia
                          className={classes.cardMedia}
                          image={`/images/product_images/${card.image}`} // eslint-disable-line max-len
                          title={card.name}
                      />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        <a href="" style={{textDecoration:'none'}}>{card.name}</a>
                        </Typography>
                        <Typography>
                        {card.description}
                        </Typography>
                        <Typography>
                          <h5>Price : <s>{card.price}</s></h5>
                          <h5>Discounted Price : {card.discounted_price}</h5>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" variant="outlined" onClick={(e)=>{
                          this.handleAddToCart(card);
                        }}>
                        Add to cart
                        </Button>
                        <Button size="small" color="primary">
                        View
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
            {/* New Footer */}
            <Grid container spacing={32} justify="space-evenly">
            {footers.map(footer => (
              <Grid item xs key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map(item => (
                  <Typography key={item} variant="subtitle1" color="textSecondary">
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            @copyrights reserved, shopmate techno solution pvt. ltd., Canada, USA
            </Typography>
        </footer>
        {/* End footer */}
        </React.Fragment>
    );
    }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
  products : PropTypes.array,
  getAllProducts : PropTypes.func.isRequired,
  getAllCategories : PropTypes.func.isRequired,
  addtoCart : PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    products : state.products.items,
    error : state.products.error,
    loading : state.products.loading,
    categories : state.categories.items
})

export default connect(mapStateToProps, {getAllProducts, getAllCategories, addtoCart})(withStyles(styles)(Album));