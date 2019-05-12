import React from 'react';
import { register } from '../repository';

export default class Register extends React.Component{

  constructor() {
    super();
    this.state = { name:'', email: '', password: '' };
    this.handleInputChange =this.handleInputChange.bind(this);
    this.submitRegister =this.submitRegister.bind(this);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitRegister(event){
    event.preventDefault();
    register(this.state)
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
              <h3>Register</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitRegister}>
              <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control" name="email" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleInputChange}/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
