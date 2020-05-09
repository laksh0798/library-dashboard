import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'
import { Redirect } from 'react-router';
import Sidenav from './Sidenav'
import Navbar from './Navbar';
import Axios from 'axios'
import Modal from 'react-modal';
import moment from 'moment'
class mybooks extends Component{
    state = {
        token:null,
        books: [],
        openDeleteModal: false,
        activeItemId: null, 
        setIsOpen : false,
        Review : "",
        activePage : 0,
        TOTAL_COUNT : null,
    }
    componentDidMount = () => {
        Axios.get(`http://127.0.0.1:8000/get-books/${"0"}/${localStorage.getItem('token')}`)
        .then(res => {
            const books = res.data.books;
            this.setState({
                books: books
        });
        })
    }
    update = () => {
        Axios.get(`http://127.0.0.1:8000/get-books/${this.state.activePage}/${localStorage.getItem('token')}`)
        .then(res => {
            const books = res.data.books;
            this.setState({
                books: books
            });
            })
    }
    returnBook = (e) => {
        e.preventDefault()
        console.log(localStorage.getItem('name'))
        Axios.put('http://127.0.0.1:8000/update_books_status/',{
            action:"return",
            id:this.state.activeItemId,
            Review: this.state.Review,
            token:localStorage.getItem('token'),
        })
        .then(res => {
            const status =res.data.success ? 'Success' : 'Fail'
            this.props.notify(status,res.data.msg)
            this.update()
        })
        this.closeModal()
    }
    handleChange = (e,name) => {
        console.log(this.state.Review)
        this.setState({
            [name] :e.target.value
        })
    } 
    handleid = (e,id) => {
        this.setState({
            modalIsOpen: true,
            activeItemId: id
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
        Axios.get(`http://127.0.0.1:8000/get-books/${this.state.activePage}/${localStorage.getItem('token')}`)
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
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width : "35%"
        }
        };
    let rows = this.state.books.length ?
    this.state.books.map((book, index) => (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{book.name}</td>
            <td>{book.owner}</td>
            <td>{book.dateOfIssue == null ? "--" : moment(book.dateOfIssue).format("DD MMM YYYY")}</td>
            <td>
                <button
                    className="btn btn-primary"
                    onClick={(e,id=book.id) => this.handleid(e,id)}>
                        Return Book
                </button>
            </td>
        </tr>
    ))
    :
    <p>No Books In your account</p>
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
                    <div>
                    <div class="card text-center border-primary">
                        <div class="card-header">
                            Books In your Account
                        </div>
                        <table class="table table-striped table-success">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Owner</th>
                            <th>Date of Issue</th>
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
                        <Modal
                        isOpen={this.state.modalIsOpen}  
                        style={customStyles}  
                        contentLabel="Example Modal"
                        >
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true" onClick={this.closeModal}>&times;</span>
                        </button>
                        <form onSubmit={this.returnBook}>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Enter Review For this Book</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                            onChange={(e) => this.handleChange(e,'Review')}>
                                
                            </textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                        </Modal>
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

export default connect(mapStateToProps,mapDispatchToProps)(mybooks);


