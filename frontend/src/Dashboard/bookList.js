import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'
import { Redirect } from 'react-router-dom'
import Sidenav from './Sidenav'
import Navbar from './Navbar';
import Axios from 'axios';
import Modal from 'react-modal'
import moment from 'moment'
class bookList extends Component{
    state = {
        books: [],
        modalIsOpen: false,
        activeItemId: null,
        Reviews:[],
        activePage : 0,
    }
    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:8000/get-books/${"0"}/${"null"}`)
        .then(res => {
            const books = res.data.books;
            console.log(res.data.count)
            this.setState({
              books: books,
            });
          })
    }
    update = () => {
        Axios.get(`http://127.0.0.1:8000/get-books/${this.state.activePage}/${"null"}`)
        .then(res => {
            const books = res.data.books;
            console.log(res.data.count)
            this.setState({
              books: books,
            });
          })
    }
    getBook = (e,id) => {
        Axios.put('http://127.0.0.1:8000/update_books_status/',{
            action:"get",
            token:localStorage.getItem('token'),
            id:id,
        })
        .then(res => {
            console.log(res)
            const status = res.data.success ? 'Success' : 'Fail'
            this.props.notify(status,res.data.msg)
            this.update()
        })
        
    }
    openReviews = (e,id) => {
        this.setState({
            modalIsOpen: true,
            activeItemId: id
         })
        Axios.get(`http://127.0.0.1:8000/get-book-review/${id}`)
        .then(res =>{
            console.log(res)
            this.setState({
                Reviews:res.data.Reviews
            },()=>console.log(this.state.Reviews))
        })
    }
    closeModal = () => {
        if(this.state.modalIsOpen){
            this.setState({
                modalIsOpen: false,
                activeItemId: null,
            })
        }
    }
    handlePageChange = (e,pageaction) => {
        if(pageaction == "next")
        {
            this.setState({
                activePage: this.state.activePage+=1
            },console.log(this.state.activePage))
        }
        else{
            if(pageaction == "prev")
            {
                this.setState({
                    activePage: this.state.activePage -= 1
                },console.log(this.state.activePage))
            }
        }
        Axios.get(`http://127.0.0.1:8000/get-books/${this.state.activePage}/${"null"}`)
        .then(res => {
            const books = res.data.books;
            this.setState({
              books: books,
            });
          })
    }
    render(){
    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width : "35%",
            hight: "5%",
            color:"black",
            overflow: 'auto',
        }
        };
    
    let page_end = (this.state.activePage +1) * 5
    let page_start = page_end - 5 
    const rows = this.state.books.length ? 
    this.state.books.map((book,index) => (
        <tr>
            <th scope="row">{page_start=page_start+1}</th>
            <td onClick={(e,id=book.id) => this.openReviews(e,id)} style={{cursor: 'pointer'}}>
                {book.name}
            </td>
            <td>{book.owner}</td>
            <td>
                {book.bookIssueTo == null ?  "--" : book.bookIssueTo}
            </td>
            <td>{book.dateOfIssue == null ? "--" : moment(book.dateOfIssue).format("DD MMM YYYY")}</td>
            <td>
                <button 
                    disabled={book.bookIssueTo != null ? "true" : ""} 
                    className="btn btn-primary"
                    onClick={(e,id=book.id) => this.getBook(e,id)}>
                        Get Book
                </button>
            </td>
        </tr>
    ))
    :
    <p>No Books Availale</p>


    const review_list = this.state.Reviews.length ? 
    this.state.Reviews.map((review, index) => (
            <div>
                <h6><b>{review.name}</b></h6>
                <p>{review.user_Review}</p>
            </div>
    ))
    :
    <p>No Review Availale</p>
    return(
        <div>
            {this.props.isAuthenticated === false?
            <Redirect to="/"/>
            :
            <div> 
                <div class="wrapper d-flex align-items-stretch">
                <Sidenav/>

                <div id="content" class="p-4 p-md-5">
                    <Navbar/>
                    <div>
                    <div class="card text-center border-primary">
                        <div class="card-header">
                            Paralaxiom Library
                        </div>
                        <table class="table table-striped table-success">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Owner</th>
                            <th>Current having</th>
                            <th>Date Of Issue</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                        </table>
                        <div class="card-footer text-muted" style={{height:"50px",backgroundColor:"#c6d3f5"}}>
                            <div style={{marginLeft:"90%"}}>
                            <button type="button" class="btn " onClick={(e,action='prev') => this.handlePageChange(e,action)}>
                                <i class="fa fa-caret-left"></i>
                            </button>
                            <button type="button" class="btn" onClick={(e,action='next') => this.handlePageChange(e,action)}>
                                <i class="fa fa-caret-right"></i>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}  
                        style={customStyles}  
                        contentLabel="Example Modal"
                        >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true" onClick={this.closeModal}>&times;</span>
                        </button>
                        {review_list}
                    </Modal>
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
export default connect(mapStateToProps,mapDispatchToProps)(bookList);
