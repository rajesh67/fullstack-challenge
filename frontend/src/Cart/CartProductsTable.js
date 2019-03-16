import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';

import MySnackbarContentWrapper from "../_components/Snackbar";

import { updateCart } from "../_actions/cart.actions";

const TAX_RATE = 0.07;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
  qtybutton: {
    display:'inline-block',
    
  },
  textField : {
    display:'inline-block'
  },
  input: {
    display: 'none',
  },
});

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { id, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  ['Paperclips (Box)', 100, 1.15],
  ['Paper (Case)', 10, 45.99],
  ['Waste Basket', 2, 17.99],
].map((row, id) => createRow(id, ...row));

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

class SpanningTable extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        total : 0,
        taxRate : 7.5,
        subTotal : 0,

        errorOpen : false,
        successOpen : true,
      }
      this.handleIncreaseProductCount = this.handleIncreaseProductCount.bind(this);
      this.handleDecreaseProductCount = this.handleDecreaseProductCount.bind(this);
    }

    handleClick = () => {
      this.setState({ open: true });
    };
  
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({ open: false });
    };

    handleIncreaseProductCount = (cart) => {
      console.log(cart);
      var existed_item = this.props.carts.length >=0 ? this.props.carts.filter(cart => cart.id === cart.id) : null;
      if(existed_item && existed_item.length >=1){
        console.log(existed_item);
        var data = existed_item[0];
        data["quantity"]=existed_item[0]["quantity"]+1;
        // cart["quantity"]+=1;
        this.props.updateCart(data);
      }else{
        console.log("Error while updating cart item.")
      }
    }


    handleDecreaseProductCount = (cart) => {
      console.log(cart);
      var existed_item = this.props.carts.length >=0 ? this.props.carts.filter(cart => cart.id === cart.id) : null;
      if(existed_item && existed_item.length >=1){
        console.log(existed_item);
        var data = existed_item[0];
        data["quantity"]=existed_item[0]["quantity"]-1;
        // cart["quantity"]+=1;
        this.props.updateCart(data);
      }else{
        console.log("Error while updating cart item.")
      }
    }

    render() {
        const carts = JSON.parse(localStorage.getItem('cart'))
        const { classes } = this.props;
        var total = 0;
        var subTotal = 0;
        var tax=0;
        if(this.props.carts){
          this.props.carts.forEach(cart => {
            subTotal+=cart.quantity*cart.product.price;
          });

          //Calculate the tax
          tax = (this.state.taxRate*subTotal)/100;
          total+=subTotal+tax;

        }
        
    
        return (
          <Paper className={classes.root}>
            {this.props.carts.length !==0 && <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Price/unit</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.carts && this.props.carts.map(cart => (
                  <TableRow key={cart.id}>
                    <TableCell key={cart.id+"first"}>
      
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={`/images/product_images/${cart.product.image}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={cart.product.name}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" className={classes.inline} color="textPrimary">
                              Attributes : {cart.attributes}
                            </Typography>
                            {/* {row.product.description} */}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
            
                          </TableCell>
                          <TableCell align="right" key={cart.id+"second"} id={cart.id}>
                            <div>

                            <IconButton className={classes.qtybutton} aria-label="Delete" color="primary" primary={cart.id} key={cart.id} onClick={this.handleIncreaseProductCount}>
                                <AddIcon key={cart.id} id={cart.id}/>
                              </IconButton>
                              <span>{cart.quantity}</span>
                              <IconButton className={classes.qtybutton} aria-label="Delete" key={cart.id} onClick={this.handleDecreaseProductCount}>
                                <RemoveIcon key={cart.id} id={cart.id}/>
                              </IconButton>
                            </div>
                          </TableCell>
                          <TableCell align="right">{cart.product.price}</TableCell>
                          <TableCell align="right">{cart.product.price*cart.quantity}</TableCell>
                          <TableCell align="right">
                            <IconButton className={classes.button} aria-label="Delete">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{this.state.taxRate}%</TableCell>
                  <TableCell align="right">{tax}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>}

            {this.props.carts.length === 0 && <div style={{textAlign:'center'}}>
                      <h4>No items your cart</h4>
            </div>}

            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              onClose={this.handleClose}
              variant="success"
              message="This is a success message!"
            />
          </Snackbar>
          </Paper>
        );
      }
}

SpanningTable.propTypes = {
  updateCart : PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
    carts : state.carts.items,
    cart : state.carts.item
})

export default connect(mapStateToProps, {updateCart})(withStyles(styles)(SpanningTable));