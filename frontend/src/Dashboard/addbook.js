import React from 'react'
import { Component } from 'react'
import Axios from 'axios'
import Sidenav from './Sidenav'
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'
class Addbook extends Component{
    state = {
        bookname:"",
        owner:"",
    }
    handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://127.0.0.1:8000/add-book/',{
            bookname:this.state.bookname,
            owner:this.state.owner,
        })
        .then(res => {
            const status = res.data.success ? 'Success' : 'Fail'
            this.props.notify(status,res.data.msg)
            this.setState({
                bookname:"",
                owner:"",
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
            <div>
                {
                    this.props.isAuthenticated === false ?
                    <Redirect to='/' />
                    :
                    <div> 
                    <div class="wrapper d-flex align-items-stretch">
                    <Sidenav/>

                    <div id="content" class="p-4 p-md-5">
                        <Navbar/>
                        <div class="card">
                <div class="card-header">
                    Add Book
                </div>
                <div class="card-body">
                    <form class="needs-validation" novalidate onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label for="validationCustom01">Book Name</label>
                            <input type="text" class="form-control" id="validationCustom01" placeholder="Book Name"  required onChange={(e) => this.handleChange(e,'bookname')} value={this.state.bookname}/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="validationCustom02">Book Owner</label>
                            <input type="text" class="form-control" id="validationCustom02" placeholder="Book Owner" required onChange={(e) => this.handleChange(e,'owner')} value={this.state.owner}/>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Submit form</button>
                    </form>
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

export default connect(mapStateToProps,mapDispatchToProps)(Addbook);