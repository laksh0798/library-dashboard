import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'
class Navbar extends Component{
  togglehandle = () => {
    
  }
    render(){
    return(
        <div> 
        <nav class="navbar navbar-expand-lg navbar-light shadow" style={{"backgroundColor":"#81abde","borderRadius":"20px","marginTop":"4px","padding":"5px 15px"}}>
        <a class="navbar-brand" href="#">PARALAXIOM</a>
          <div class="container-fluid">

            <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{"font-size":"15px"}}>
              <ul class="nav navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onClick={this.props.logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}
}
const mapDispatchToProps = dispatch => {
    return{
      logout: () => dispatch(actions.logout())
    }
}
  
export default connect(null,mapDispatchToProps)(Navbar)
