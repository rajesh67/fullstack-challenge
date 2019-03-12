import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      // padding: theme.spacing.unit * 6,
  
      marginTop: theme.spacing.unit * 8,
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit * 6}px 0`,
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


class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
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
    )
  }
}


export default withStyles(styles)(Footer)