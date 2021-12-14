import {Redirect, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../../store/actions/session.actions';
import React, { Component } from 'react';
import Layout from '../Layout';

class PrivateRoute extends Component {
  state = {
    tokenIsValid: true,
  }

  componentDidMount() {
    this.props.verifyTokenRequest();
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.auth.tokenIsValid) {
      this.setState({ tokenIsValid: false });
    }
  }
  
  render() {
    const { component: Component} = this.props;
    const { computedMatch, params, location, path } = this.props;
    const rest = {
      computedMatch, params, location, path
    };
    return(
      <Route {...rest} render={props => (
        !!localStorage.getItem("@token") && this.state.tokenIsValid ?   
            <Layout {...props} title={props.title}>
              <Component {...props} />
            </Layout>
            :
          <Redirect to="/" />
        )
      } />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
