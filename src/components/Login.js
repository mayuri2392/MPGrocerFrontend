import React from 'react';
import { login } from '../repository';
import { Link, Route } from 'react-router-dom';
export default class Login extends React.Component{

  constructor() {
    super();
    this.state = { email: '', password: '' };
    this.handleInputChange =this.handleInputChange.bind(this);
    this.submitLogin =this.submitLogin.bind(this);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitLogin(event){
    event.preventDefault();
    login(this.state)
      .then(token => window.location = '/')
      .catch(err => alert(err));
  }

  render() {
     return (
      <div className="container">
      <hr/>
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Log in </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control" name="email" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleInputChange}/>
                </div>
                <p>
                <button type="submit" className="btn btn-default">Submit</button>
                <Link to="/register">New User?</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
