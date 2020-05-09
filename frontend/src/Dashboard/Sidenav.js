import React, { Component } from 'react'
import {Link , NavLink, withRouter} from 'react-router-dom'
import Logo from '../user.png'

class Sidenav extends Component {
    render(){
        return(
            <nav id="sidebar">
				<div class="p-4 pt-5">
		  		{/* <a href="#" class="img logo rounded-circle mb-5" style={{"background-image": "url(images/logo.jpg)",border:"10px solid red" }}></a> */}
                <img class="avatar border-gray" src={Logo} alt="..." style={{width:"150px", marginLeft:"20%"}} />
            <ul class="list-unstyled components mb-5">
            <li>
                        <Link to="/booklist">
                            <i class="pe-7s-note2"></i>
                            <p>Book Lists</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="mybooks">
                            <i class="pe-7s-bookmarks"></i>
                            <p>Books in your account</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="user">
                            <i class="pe-7s-user"></i>
                            <p>User Profile</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="addbook">
                            <i class="pe-7s-user"></i>
                            <p>Add Book</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i class="pe-7s-monitor"></i>
                            <p>E-Books</p>
                        </Link>
                    </li>
	        </ul>


	      </div>
    	</nav>
        )
    }
}

export default Sidenav