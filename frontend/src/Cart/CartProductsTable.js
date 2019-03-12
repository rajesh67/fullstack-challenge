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
        subTotal : 0
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
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Price/unit</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.carts && this.props.carts.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>
      
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={`/images/product_images/${row.product.image}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={row.product.name}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" className={classes.inline} color="textPrimary">
                            {row.attributes}
                          </Typography>
                          {row.product.description}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
            
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">{row.product.price}</TableCell>
                          <TableCell align="right">{row.product.price*row.quantity}</TableCell>
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
            </Table>
          </Paper>
        );
      }
}

SpanningTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
    carts : state.carts.items
})

export default connect(mapStateToProps, {})(withStyles(styles)(SpanningTable));