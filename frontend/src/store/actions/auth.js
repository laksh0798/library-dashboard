
import React from 'react'
import * as actionTypes from './actionsTypes'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error :error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('experationDate');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = experationTime =>{
    return dispatch =>{
        setTimeout(()=> {   
            dispatch(logout());
        }, experationTime*1000)
    } 
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        Axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username:username,
            password:password
        })
        .then(res => {
            console.log(res)
            const token = res.data.key;
            const experationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('experationDate',experationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1,password2) => {
    return dispatch => {
        dispatch(authStart());
        Axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
            username:username,
            email: email,
            password1 : password1,
            password2:password2
        })
        .then(res => {
            const token = res.data.key;
            const experationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token',token);
            localStorage.setItem('experationDate',experationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout());
        }
        else{
            const experationDate = new Date(localStorage.getItem('experationDate'));
            if(experationDate <= new Date()){
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((experationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}

export const notify = (status,message) => {
    return dispatch => {
        if(status=="Success"){
            toast.success(message)
        }
        else{
            if(status=="Fail")
            {
                toast.error(message)
            }
        }
        
    }
}