import React, { Component } from 'react';
import './gamePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component 
{

     constructor(props)
    {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUserID = this.onChangeUserID.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            userID: "",
            password: ""
        }
    }

    onChangeUserID(e) {
        
        this.setState({ userID: e.target.value });
    }

    onChangePassword(e) {

        this.setState({ password: e.target.value });
    }
  
    onSubmit(e) {

        e.preventDefault();

        const userLogs = {

            userID: this.state.userID,
            password: this.state.password
        };


        axios.post('http://localhost:3001/user/login', userLogs)
            .then(res => console.log(res.data));
    }
    render(){
        return(
            <div className="intro">
            <form onSubmit = {this.onSubmit}>
                <fieldset>
                <legend>Login Form</legend>
                <label><strong>User ID:</strong></label>
                <input type = "text" value = {this.state.userID} 
                    onChange = {this.onChangeUserID}/><br/>                
                    <label><strong>Password:</strong></label>
                <input type = "password" value = {this.state.password} 
                    onChange = {this.onChangePassword}/><br/>
                <input type = "submit" value = 'Submit'/>
                </fieldset>
            </form>
            </div>
        )}
    }


export default Login;