import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions/auth'
import User from './Dashboard/user'
import BookList from './Dashboard/bookList'
import Mybooks from './Dashboard/mybooks'
import Addbook from './Dashboard/addbook'
import Login from './auth/login'
import Signup from './auth/signup'
import {BrowserRouter, Route} from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Login}/>
        <Route exact path='/booklist' component={BookList}/>
        <Route exact path='/user' component={User}/>
        <Route exact path='/mybooks' component={Mybooks}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/addbook' component={Addbook}/>
      </div>
    </BrowserRouter>
  );
}
}
const mapStateToProps = state => {
  return{
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup : () =>dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
