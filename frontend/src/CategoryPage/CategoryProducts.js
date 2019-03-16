import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

import CommonLayout from "./CommonLayout";
import BreadCrumb from "../_components/BreadCrumb";
import Footer from "../_components/Footer";
import CategorySidebarList from "./CategorySidebarList";
import MediaCard from "../_components/MediaCard";

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCategoryById, getCategoryProducts } from "../_actions/category.actions";
import { addtoCart, updateCart } from "../_actions/cart.actions";

import { Icon } from '@material-ui/core';
import Filters from "./Filters";

const styles = theme => ({
    appBar: {
      position: 'relative',
    },
    root: {
        width: '100%',
        
        flexGrow: 1,
        marginTop : 50,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing.unit * 4,
      },
    icon: {
      marginRight: theme.spacing.unit * 2,
    },
    progress: {
      margin: theme.spacing.unit * 1,
    },
    heroUnit: {
      backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
      margin: '0 auto',
      padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    //   backgroundImage : 'url(https://thumbs.dreamstime.com/b/shopping-woman-holding-red-bag-black-friday-holiday-beautiful-young-make-girl-dark-background-104350636.jpg)',
    //   backgroundRepeat : 'none',
    //   backgroundSize : 'cover',
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
  
    sectionTitle :{
      // textDecoration:'uppercase',
      textTransform : 'uppercase'
    }
  });

  const pagination_theme = createMuiTheme();


class CategoryProducts extends Component {

    constructor(props){
        super(props);
        this.state={
            offset:0,
            limit : 10,
            catId : 1,
            products : [],
        }
    }

    // componentWillMount(){
    //     const {id} = this.props.match.parms;
    //     console.log(" sdfasf asfdas "+id);
    // }

    handlePageChange(offset) {
        console.log(offset);
        this.setState({ offset : offset});
        //fetch products
        // this.props.getCategoryById(this.state.catId)
        this.props.getCategoryProducts(this.state.catId, this.state.limit, offset)
        // this.render()
        console.log(offset)
      }

  componentWillMount(){
      const {id} = this.props.match.params;
      this.setState({catId:id});
      this.props.getCategoryById(id);  
      this.props.getCategoryProducts(id, this.state.limit, this.state.offset);

      console.log("CAtegory")
  }

  handleAddToCart = (product)=>{
      //Check if the product is already present in the carts
      // var existed_item = this.props.carts.length!==0 ? this.props.carts.
      //update the cart
      var existed_item = this.props.carts.length >=0 ? this.props.carts.filter(cart => cart.product.id === product.id) : null;
      if(existed_item && existed_item.length >=1){
        console.log(existed_item);
        var data = existed_item[0];
        data["quantity"]=existed_item[0]["quantity"]+1;
        this.props.updateCart(data);
      }else{
        this.props.addtoCart(product);
      }
       
      console.log("ADd to cart clicked")
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.category);
    console.log(this.props.products)

    console.log(this.props.carts);
    console.log(localStorage.getItem('cart'));

    const products = this.props.products;

    return (
      <React.Fragment>
          
          <CommonLayout style={{marginTop:65}}>
          
          <section id="filters" style={{textAlign:'center'}}>
            
          </section>
          <section id= "mainPage" style={{marginTop:65}} xs={12} className={classNames(classes.layout, classes.cardGrid)}>
              <main>
              {/* <h1>Category products page</h1> */}
              <BreadCrumb />
              {/* Hero unit */}
            <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <Typography component="h6" variant="h2" align="center" color="textPrimary" style={{ textTransform:'uppercase', fontWeight:'bold'}} gutterBottom>
                    {this.props.category && <div>{this.props.category.name}</div>}
                    </Typography>
                    <Typography variant="p" align="center" color="textSecondary" style={{ textTransform:'uppercase'}} paragraph>
                    {this.props.category && <div>{this.props.category.description}</div>}
                    </Typography>
                    
                    <div className={classes.heroButtons}>
                    
                    {/* <Grid container spacing={16} justify="center">
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
                    </Grid> */}
                    </div>
                </div>
            </div>

            <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          {/* <Paper className={classes.paper}> */}
          <Filters />
          {/* </Paper> */}
        </Grid>
        <Grid item xs={4}>
          {/* <Paper className={classes.paper}> */}
          
          {/* </Paper> */}
        </Grid>
        <Grid item xs={4} style={{textAlign:'center'}}>
          {/* <Paper className={classes.paper}> */}
                <h5>View 48 | 120</h5>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={4}>
          {/* <Paper className={classes.paper}> */}
                {/* <p>Page 1 of 9 <Button>Prev</Button> <Button>Next</Button></p>  */}
          {/* </Paper> */}
        </Grid>
        <Grid item xs={3}>
          {/* <Paper className={classes.paper}> */}
          {/* <a href="" className={classes.Links}> */}
                {this.state.offset<=0 && <Button variant="contained" color="primary" disabled>
                    Prev page
                </Button>}
                {this.state.offset>0 && <Button variant="contained" color="primary" onClick={(e) =>{
                    this.handlePageChange(this.state.offset-this.state.limit)
                }}>
                    Prev page
                </Button>}
            {/* </a> */}
          {/* </Paper> */}
        </Grid>
        <Grid item xs={6} style={{border:'none'}}>
          {/* <Paper className={classes.paper}> */}
            <MuiThemeProvider theme={pagination_theme}>
                <CssBaseline />
                <Pagination
                limit={this.state.limit}
                offset={this.state.offset}
                total={100}
                onClick={(e, offset) => this.handlePageChange(offset)}
                />
            </MuiThemeProvider>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={3} style={{textAlign:'right'}}>
          {/* <Paper className={classes.paper}> */}
            {/* <a href="" className={classes.Links}> */}
            <Button variant="contained" color="primary" onClick={(e) =>{
                    this.handlePageChange(this.state.offset+this.state.limit)
                }}>
                    Next page
                </Button>

                {/* {this.props.products && this.state.offset<this.props.products.length ?  : <div></div>} */}
            {/* </a> */}
          {/* </Paper> */}
        </Grid>

        <Grid item xs={3} style={{textAlign:'left'}}>
                <h1>Filters</h1>
        </Grid>

        <Grid item xs={9} style={{textAlign:"center"}}>
        
        {/* Products List Page */}
        <Grid container spacing={40}>
                {products && products.map(card => (
                <Grid item key={card.id} sm={6} md={4} lg={4}>
                    
                    <Card className={classes.card}>
                    <CardActionArea >
                      {card.product && <CardMedia
                          className={classes.cardMedia}
                          image={`/images/product_images/${card.product.image}`} // eslint-disable-line max-len
                          title={card.product.name}
                      />}
                    </CardActionArea>
                    {card.product && <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        <a href="" style={{textDecoration:'none'}}>{card.product.name}</a>
                        </Typography>
                        <Typography>
                        {card.product.description}
                        </Typography>
                        <Typography>
                          <h5 key="1">Price : <s>{card.product.price}</s></h5>
                          <h5 key="2">Discounted Price : {card.product.discounted_price}</h5>
                        </Typography>
                    </CardContent>}
                    <CardActions>
                        <Button size="small" color="primary" variant="outlined" onClick={(e)=>{
                          this.handleAddToCart(card.product);
                        }}>
                        Add to cart
                        </Button>
                        <a href={`/#/categories/products/${card.id}`}>
                          <Button size="small" color="primary">
                          View more
                          </Button>
                        </a>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
                </Grid>

        </Grid>
      </Grid>
    </div>
            

                

                
        {/* <GridList> */}
        
        {/* </GridList> */}

            {/* Products */}
            
              </main>
              
              
              <Footer />
              
              </section>
              

            <section>
                {/* products */}

                
            </section>
              
          </CommonLayout>
      </React.Fragment>
    )
  }
}


CategoryProducts.propTypes = {
    updateCart : PropTypes.func.isRequired,
    getCategoryById : PropTypes.func.isRequired,
    getCategoryProducts : PropTypes.func.isRequired,
    addtoCart : PropTypes.func.isRequired,
    category : PropTypes.object,
    products : PropTypes.array.isRequired,
    count : PropTypes.object.isRequired,
    carts : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    category : state.categories.item,
    products : state.categories.products,
    count : state.categories.count,
    carts : state.carts.items
})

export default connect(mapStateToProps, {getCategoryById, getCategoryProducts, addtoCart, updateCart})(withStyles(styles)(CategoryProducts));


// Add Filters as shown in shomate ui kit
// add pagination on top "==============="
// add sidebar filters 
// add products list
//add products list/grid filter
