import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

// var paypal = require('paypal-rest-sdk');
// paypal.configure({
//     'mode': 'sandbox', //sandbox or live
//     'client_id': 'rajeshmeena.iitkgp@gmail.com',
//     'client_secret': 'access_token$production$txm5fz6krc22j59p$6d81a0a6fdfc93503e20d40dafcf19cc'
//   });

//   paypal.payment

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    window.React = React;
    window.ReactDOM = ReactDOM;

    this.state = {
      showButton: false,
      env: 'sandbox', // Or 'sandbox'
      client: {
        sandbox:    'sb', // sandbox client ID
        production: 'rajeshmeena.iitkgp@gmail.com' // production client ID
      },
      commit: true, // Show a 'Pay Now' button
    };
  }
  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }
 
  render() {
    const {
        total,
        currency,
        env,
        commit,
        client,
        onSuccess,
        onError,
        onCancel,
      } = this.props;
  
      const {
        showButton,
      } = this.state;
  
      const payment = () =>
      
        paypal.rest.payment.create(env, client, {
          transactions: [
            {
              amount: {
                total,
                currency,
              }
            },
          ],
        });
  
      const onAuthorize = (data, actions) =>
        actions.payment.execute()
          .then(() => {
            const payment = {
              paid: true,
              cancelled: false,
              payerID: data.payerID,
              paymentID: data.paymentID,
              paymentToken: data.paymentToken,
              returnUrl: data.returnUrl,
            };
  
            onSuccess(payment);
          });

          console.log(this.props)
  
      return (
        <div>
          {showButton && <paypal.Button.react
            env={env}
            client={client}
            commit={commit}
            amount={10}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />}
        </div>
      );
    }
};
 
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);