import React from 'react';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'
import Axios from 'axios'
class Login extends React.Component{
    state = {
        userName:"",
        password:"",
        error:""
    }
    handleSubmit = (e) => {
        this.setState({
            error:""
        })
        e.preventDefault()
        this.props.authStart();
        Axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username:this.state.userName,
            password:this.state.password,
        },(response)=>console.log(response))
        .then(res => {
            const token = res.data.key;
            const experationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('experationDate',experationDate);
            this.props.authSuccess(token);
            this.props.checkAuthTimeout(3600)
        })
        .catch(err => {
            this.setState({
                error:"Invalid Credientials"
            })
            this.props.authFail(err)
        })
    }
    handleChange = (e,name) => {
        this.setState({
            [name] :e.target.value
        })
    }
    render(){
        return(
            <div>
            {
            !this.props.isAuthenticated 
            ?
            <div>
            <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
                <h4 style={{color:"#308bdb"}}>Paralaxiom Library</h4>
            </div>
            </nav>
            <div id='LoginPage'style={{"margin-top":"10%"}}>
                <div class="card text-center border-primary" style={{"width": "35%","padding":"20px 20px", "margin-left":"35%"}}>
                <div>
                    <h4>Login For Paralaxiom Library</h4>
                </div>
                <div class="card-body ">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                        onChange={(e) => this.handleChange(e,'userName')} required/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                        onChange={(e) => this.handleChange(e,'password')} required/>
                    </div>
                        <p className='text-center' style={{color:"red"}}>{this.state.error}</p>
                    <button type="submit" class="btn btn-outline-warning" style={{"margin-right":"2%"}}>Login</button>
                    or
                    <NavLink style={{marginLeft: "5px"}} to='/signup/'>
                        SignUp
                    </NavLink>
                </form>
                </div>
                </div>
            </div>
            </div>
            :
            <Redirect to="/booklist"/>
            }
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
      isAuthenticated: state.token !== null,
      loading:state.loading,
      error:state.error
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return{
        onAuth: (userName, password) => dispatch(actions.authLogin(userName, password)),
        authStart : () => dispatch(actions.authStart()),
        authSuccess : (token) => dispatch(actions.authSuccess(token)),
        checkAuthTimeout : (time) => dispatch(actions.checkAuthTimeout(time)),
        authFail : (error) => dispatch(actions.authFail(error))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Login)