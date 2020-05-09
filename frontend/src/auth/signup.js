import React from 'react';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import Axios from 'axios'
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'

class Signup extends React.Component {
    state = {
        firstName:"",
        lastName:"",
        email:"",
        contactNo: "",
        position:"",
        password1:"",
        password2:"",
        passworderror:"",
        contactnoerror:"",
        emailerror:"",
        usererror:"",
    }
    handleSubmit = (e) => {
        this.setState({
            passworderror:"",
            contactnoerror:"",
            emailerror:"",
            usererror:"",
        })
        e.preventDefault()
        const phoneno = /^\d{10}$/;
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!this.state.email.match(emailformat)){
            this.setState({
                emailerror: "Invalid email"
            })
            return null
        }
        else{
            if((!this.state.contactNo.match(phoneno)))
            {
                this.setState({
                    contactnoerror:"Invalid mobile Number"
                })
                return null
            }
            else{
                if(this.state.password1!=this.state.password2)
                {
                    this.setState({
                        passworderror:"Password must be same"
                    })
                    return null
                }
            }
        }
        Axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
            username:this.state.email,
            email: this.state.email,
            password1 : this.state.password1,
            password2:this.state.password2
        })
        .then(res => {
            const token = res.data.key;
            Axios.post('http://127.0.0.1:8000/create-user/',{
                token : token,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                contactno: this.state.contactNo,
                position:this.state.position
            })
            .then(res=>{
                const status = res.data.success ? "Success" : "Fail"
                this.props.notify(status,res.data.msg)
                if(res.data.success){
                    this.props.history.push('/')
                }
            })
        })
        .catch(err => {
            this.setState({
                usererror:"User Already Exists"
            })
        })
      }
      handleChange = (e,name) => {
        this.setState({
            [name] :e.target.value
        })
    }
    render(){
        return(
            <div id='LoginPage'>
            <div>
            <nav class="navbar navbar-default navbar-fixed shadow" style={{borderBottom:"gray 1px solid"}}>
            <div class="container-fluid">
                <h4 style={{color:"#308bdb"}}>Paralaxiom Library</h4>
            </div>
            </nav>
            <div id='LoginPage'style={{"margin-top":"2%"}}>
                <div class="card border-primary" style={{"width": "35%","padding":"20px 20px", "margin-left":"35%"}}>
                <div class="card-body">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="First name" onChange={(e) => this.handleChange(e,'firstName')} required/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Last name" onChange={(e) => this.handleChange(e,'lastName')} required/>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
                        onChange={(e) => this.handleChange(e,'email')} required/>
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control"
                        placeholder="Enter Contact Number"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        onChange={(e) => this.handleChange(e,'contactNo')}  required/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your position"
                        onChange={(e) => this.handleChange(e,'position')}  required/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                        onChange={(e) => this.handleChange(e,'password1')}  required/>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirmed Password"
                        onChange={(e) => this.handleChange(e,'password2')}  required/>
                    </div>
                    <p className="text-center" style={{color:"red"}}>{this.state.emailerror}</p>
                    <p className="text-center" style={{color:"red"}}>{this.state.contactnoerror}</p>
                    <p className="text-center" style={{color:"red"}}>{this.state.passworderror}</p>
                    <p className="text-center" style={{color:"red"}}>{this.state.usererror}</p>
                    <button type="submit" class="btn btn-outline-warning" style={{"margin-left":"40%", "margin-right":"2%"}}>Sign Up</button>
                    or
                    <NavLink style={{marginLeft: "5px"}} to='/'>
                        Login
                    </NavLink>
                    </form>
                </div>
                </div>
            </div>
            </div>
            
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
            notify : (status,message) => dispatch(actions.notify(status,message)),
            onTryAutoSignup : () =>dispatch(actions.authCheckState())
    }
}
    
export default connect(null,mapDispatchToProps)(Signup);