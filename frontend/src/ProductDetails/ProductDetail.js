import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

import CommonLayout from "../CommonLayout/CommonLayout";
import BreadCrumb from "../_components/BreadCrumb";
import Footer from "../_components/Footer";
import MediaCard from "../_components/MediaCard";

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { addtoCart } from "../_actions/cart.actions";
import { getProduct } from "../_actions/product.actions";
// import { addtoCart } from "../_actions/cart.actions";

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
      backgroundImage : 'url(https://thumbs.dreamstime.com/b/shopping-woman-holding-red-bag-black-friday-holiday-beautiful-young-make-girl-dark-background-104350636.jpg)',
      backgroundRepeat : 'none',
      backgroundSize : 'contain',
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
    //   height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border : 'none'
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
    },
    button: {
        margin: theme.spacing.unit,
        textTransform:'uppercase'
    },

  });

  const pagination_theme = createMuiTheme();


class CategoryProducts extends Component {

    constructor(props){
        super(props);
        this.state={
            offset:0,
            limit : 10,
            catId : 1,

            color : 0,
            disabled:false,
            selected : "S",
            currentImage : null,
        }
    }


  componentWillMount(){
      const {id} = this.props.match.params;
      this.props.getProduct(id);      
  }

  handleAddToCart = (product)=>{
      this.props.addtoCart(product); 
      console.log("ADd to cart clicked");
      this.setState({disabled:true});
  }

  handleSizeChoice = (size)=>{
    this.setState({selected : size}); 
    console.log("ADd to cart clicked");
  //   this.setState({disabled:true});
}

  handleImageChange = (name) => {
      this.setState({currentImage:name})
      console.log(name)
      console.log("handle image change clicked")
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    console.log(this.props.category);
    console.log(this.props.products)

    console.log(this.props.carts);
    console.log(localStorage.getItem('cart'));
    
    return (
      <React.Fragment>
          
          <CommonLayout style={{marginTop:65}}>
            <section id= "mainPage" style={{marginTop:65}} xs={12} className={classNames(classes.layout, classes.cardGrid)}>
                <main>
                    {/* <h1>Category products page</h1> */}
                    <BreadCrumb />
                    {/* Hero unit */}
                    <div className={classes.heroUnit}>
                        <div className={classes.heroContent}>
                            <Typography component="h6" variant="h2" align="center" color="textPrimary" style={{ textTransform:'uppercase', fontWeight:'bold'}} gutterBottom>
                            {/* {this.props.category && <div></div>} */}
                            <h5 style={{color:"white"}}>product Details</h5>
                            </Typography>
                            <Typography variant="p" align="center" color="textSecondary" style={{ textTransform:'uppercase'}} paragraph>
                            {this.props.category && <div>{this.props.category.description}</div>}
                            </Typography>
                            
                            {/* <div className={classes.heroButtons}>
                            
                            </div> */}
                        </div>
                    </div>
                
                    {/* Page Body */}
                    <div className={classes.root}>
                          {this.props.product && <Grid container spacing={40}>
                            {/* <Grid item md={1}></Grid> */}
                            <Grid item xs={6}  style={{textAlign:'center'}}>
                                {/* <Paper className={classes.paper}> */}
                                    {/* Images section */}
                                    <Card className={classes.card}>
                                    
                                        <CardMedia
                                        className={classes.media}
                                        image={`/images/product_images/${this.props.product}`}
                                        title="Paella dish"
                                        />
                                        <CardContent>
                                        {/* <CardActionArea style={{margin:'auto 5px auto 5px'}}> */}
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={`/images/product_images/${this.state.currentImage ? this.state.currentImage: this.props.product.image}`} // eslint-disable-line max-len
                                                title="Image name"
                                                style={{width:'100%', height:20, backgroundSize:'contain', margin:'10px auto 10px auto'}}/>
                                        {/* </CardActionArea> */}

                                        <div className="images" style={{marginTop:50}}>
                                        
                                            {[this.props.product.image,this.props.product.image_2,this.props.product.thumbnail].map(image=>{
                                                return (
                                                    <CardActionArea style={{width:'30%', display:"inline-block", margin:'5px 5px auto 5px'}} key={image} onClick={(e)=>{
                                                        this.handleImageChange(image);
                                                    }}>
                                                        <CardMedia
                                                            className={classes.cardMedia}
                                                            image={`/images/product_images/${image}`} // eslint-disable-line max-len
                                                            title={this.props.product.name}
                                                            style={{backgroundSize:'contain', margin:'10px auto 10px auto'}}
                                                        />
                                                    </CardActionArea>
                                                )
                                            })}
                                        
                                        </div>
                                        </CardContent>

                                    </Card>
                                {/* </Paper> */}
                            </Grid>

                            <Grid item xs={6} >
                                {/* <Paper className={classes.paper}> */}
                                    <h1>{this.props.product.name}</h1>    
                                    <h3 style={{fontWeight:'bold'}} color="secondary">$ {this.props.product.price}</h3>
                                    <div className="sizeSection">
                                        <h4>Choose Color:</h4>
                                        <RadioGroup
                                            name="color"
                                            aria-label="Spacing"
                                            value={this.state.size}
                                            onChange={this.handleChange('color')}
                                            row
                                            >
                                            <FormControlLabel value="0" control={<Radio color="primary"/>} label="Red"/>
                                            <FormControlLabel value="8" control={<Radio />} label="Black"/>
                                            <FormControlLabel value="16" control={<Radio color="contained"/>} label="Grey"/>
                                            <FormControlLabel value="24" control={<Radio />} label="Pink"/>
                                        </RadioGroup>
                                    </div>

                                    {/* Size buttons */}
                                    <div className="sizeButtons">
                                        <h4>Select Size:</h4>
                                        {["S", "M", "L", "XL", "XXL", "XXXL"].map(size=>{
                                            return (
                                                <span>
                                                {this.state.selected==size ? <Button variant="contained" className={classes.button} color="primary">{size}</Button>
                                                                        : <Button variant="contained" className={classes.button} onClick={(e)=>{
                                                                            this.handleSizeChoice(size)
                                                                        }}>{size}</Button>}
                                            </span>
                                            )
                                        })}
                                        
                                    </div>

                                    {/* CTA buttons */}
                                    <div className="CTA">
                                        <h4>Qty: 1</h4>
                                        {this.state.disabled ? <Button 
                                            variant="contained" 
                                            color="primary" 
                                            className={classes.button}
                                            disabled
                                            >
                                            Add to cart
                                        </Button> : <Button 
                                            variant="contained" 
                                            color="primary" 
                                            className={classes.button}
                                            onClick={(e)=>{
                                                this.handleAddToCart(this.props.product)
                                            }}
                                            >
                                            Add to cart
                                        </Button>}
                                        <Button variant="contained" color="secondary" className={classes.button}>Add to watchlist</Button>
                                    </div>
                                {/* </Paper> */}
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>}  
                    </div>
            
                </main>
                
                <Footer />
                
              </section>
          </CommonLayout>
      </React.Fragment>
    )
  }
}


CategoryProducts.propTypes = {
    getProduct : PropTypes.func.isRequired,
    addtoCart : PropTypes.func.isRequired,
    product : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product : state.products.item
})

export default connect(mapStateToProps, {getProduct, addtoCart})(withStyles(styles)(CategoryProducts));
