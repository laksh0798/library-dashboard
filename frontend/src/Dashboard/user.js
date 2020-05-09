import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'
import { Redirect } from 'react-router';
import Axios from 'axios';
import Sidenav from './Sidenav'
import Navbar from './Navbar';
import Logo from '../user.png'
class user extends Component{
    state = {
        firstName:"",
        lastName:"",
        email:"",
        contactNo: "",
        position:"",
        token : localStorage.getItem('token'),
        updatefirstName:"",
        updatelastName:"",
        updateemail:"",
        updatecontactNo: "",
        updateposition:"",
    }
    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:8000/user/${this.state.token}`)
        .then(res => {
            const user = res.data.user
            this.setState({
                firstName: user.firstname,
                lastName:user.lastname,
                email:user.email,
                contactNo: user.contactno,
                position:user.position,
                updatefirstName:user.firstname,
                updatelastName:user.lastname,
                updateemail:user.email,
                updatecontactNo: user.contactno,
                updateposition:user.position,
            })
        })
    }
    updateUI = () => {
        Axios.get(`http://127.0.0.1:8000/user/${this.state.token}`)
        .then(res => {
            const user = res.data.user
            this.setState({
                firstName: user.firstname,
                lastName:user.lastname,
                email:user.email,
                contactNo: user.contactno,
                position:user.position,
                updatefirstName:user.firstname,
                updatelastName:user.lastname,
                updateemail:user.email,
                updatecontactNo: user.contactno,
                updateposition:user.position,
            })
        })
    }
    handleChange = (e,name) => {
        this.setState({
            [name] :e.target.value
        })
    }  
    handleUpdate = (e) => {
        e.preventDefault()
        if(this.state.firstName===this.state.updatefirstName && this.state.lastName=== this.state.updatelastName && this.state.contactNo===this.state.updatecontactNo && this.state.email===this.state.updateemail && this.state.position===this.state.updateposition)
        {
            this.props.notify('Fail','Nothing to update')
            return null
        }
        Axios.put('http://127.0.0.1:8000/create-user/',{
            token : localStorage.getItem('token'),
            firstName:this.state.updatefirstName,
            lastName:this.state.updatelastName,
            email:this.state.updateemail,
            contactno: this.state.updatecontactNo,
            position:this.state.updateposition
        })
        .then(res=>{
            this.updateUI()
            const status = res.data.success ? 'Success' : 'Fail'
            this.props.notify(status,res.data.msg)
        })
    }
    render(){
    return(
        <div>
            {
            this.props.isAuthenticated === false ? 
            <Redirect to="/" />
            :
            <div> 
                <div class="wrapper d-flex align-items-stretch">
                <Sidenav/>

                <div id="content" class="p-4 p-md-5">
                    <Navbar/>
                    <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title" >Edit Profile</h4>
                                </div>
                                <div class="card-body">
                                    <form style={{'margin-left':"10%"}} onSubmit={this.handleUpdate}>
                                        <div class="row">
                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <b><h5 style={{'color':'black'}}>First Name</h5></b>
                                                    <input type="text" class="form-control" value={this.state.updatefirstName} onChange={(e) => this.handleChange(e,'updatefirstName')}/>
                                                </div>
                                            </div>
                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <b><h5 style={{'color':'black'}}>Last Name</h5></b>
                                                    <input type="text" class="form-control" value={this.state.updatelastName} onChange={(e) => this.handleChange(e,'updatelastName')}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <b><h5 style={{'color':'black'}}>E-mail</h5></b>
                                                    <input type="text" class="form-control" value={this.state.updateemail}onChange={(e) => this.handleChange(e,'updateemail')}/>
                                                </div>
                                            </div>
                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <b><h5 style={{'color':'black'}}>Contact No.</h5></b>
                                                    <input type="text" class="form-control" value={this.state.updatecontactNo} onChange={(e) => this.handleChange(e,'updatecontactNo')}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-5 pr-1">
                                                <div class="form-group">
                                                    <b><h5 style={{'color':'black'}}>Position</h5></b>
                                                    <input type="text" class="form-control" value={this.state.updateposition} onChange={(e) => this.handleChange(e,'updateposition')}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row' style={{'margin-left':"20%"}}>
                                            <div class="col-md-5 pr-1">
                                            <button type="submit" class="btn btn-info btn-fill pull-right">Update Profile</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card card-user" >
                                <div class="card-body">
                                    <div class="author">
                                        <a href="#">
                                            <img class="avatar border-gray" src={Logo} alt="..." style={{width:"150px", marginLeft:"20%"}} />
                                            <h5 class="text-center">
                                                {this.state.firstName} {this.state.lastName}
                                            </h5>
                                        </a>
                                        <p class="description" style={{marginLeft:"40%"}}>
                                            {this.state.position}
                                        </p>
                                    </div>
                                    <p class="description text-center">
                                        {this.state.email}
                                        <br/> {this.state.contactNo}
                                    </p>
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
                </div>
            </div>
            }
        </div>
    )
}
}
const mapStateToProps = state => {
    return{
      isAuthenticated: state.token !== null
    }
}
  
const mapDispatchToProps = dispatch => {
return{
    notify : (status,message) => dispatch(actions.notify(status,message)),
    onTryAutoSignup : () =>dispatch(actions.authCheckState())
}
}

export default connect(mapStateToProps,mapDispatchToProps)(user);