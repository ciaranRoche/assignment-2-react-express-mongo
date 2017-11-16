import React, {Component} from 'react';
import {Link, Redirect, Route} from 'react-router';
import {Container,Button,Form} from 'semantic-ui-react';
import HeaderComponent from './Header';
const request = require('request-promise')

class SignIn extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      email : '',
      password : '',
      status : 'signIn'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => {
    this.setState({status: 'check'})
    let options = { method: 'GET',
      url: 'http://localhost:8000/api/users/email/' + this.state.email,
      headers: 
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json' } };
    let _ = this;    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode == 200){
        let data = JSON.parse(body);
        if(data.email == _.state.email && data.password == _.state.password){
          sessionStorage.setItem('userId', data._id)
          setTimeout(() => _.setState({status: 'success'}), 1000)
        }
      }
    });
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value});
  }

  buildButton(){
    let content;
    let status = this.state.status;
    if(status == 'signIn'){
      content = <Button basic type='submit' onClick={this.handleClick.bind(this)}>SignIn</Button>
    }
    if(status == 'check'){
      content = <Button basic loading>Loading</Button>
    }
    if(status == 'success'){
      content = <Link to='app' ><Button basic color='green'>Success</Button></Link>
    }
    if(status == 'fail'){
      content = <div>
        <p>Looks like something went wrong, please try again</p>
        <Button basic color='red' type='submit' onClick={this.handleClick.bind(this)}>SignIn</Button>
      </div>
    }
    return content;
  }

  buildForm(){
    return <Form>
      <Form.Field>
        <label>Email</label>
        <input name='email' placeholder="email" onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input name='password' type='password' placeholder='password' onChange={this.handleChange}/>
      </Form.Field>
      {this.buildButton()}
    </Form>
  }

  render() {
    return (
      <Container textAlign='center'>
        {this.buildForm()}
      </Container>
    )
  }
}

export default SignIn