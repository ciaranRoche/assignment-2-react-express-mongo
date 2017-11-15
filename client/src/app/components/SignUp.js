import React, {Component} from 'react';
import {Container, Form, Button} from 'semantic-ui-react';
import {Link} from 'react-router';
const request = require('request-promise')

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other'}
]

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName : '',
      surname : '',
      gender : '',
      email : '',
      password : '',
      address: '',
      about : '',
      picture : '',
      status : 'signUp',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleGender = this.handleGender.bind(this);
  }

  handleChange(event){
    const name = event.target.name;
    this.setState({[name] : event.target.value});
  }

  // handles change from gender drop down
  handleGender(event, {value}){
    this.setState({gender:value});
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({status : 'check'})
    var options = {
      method: 'POST',
      url : 'http://localhost:3000/users/',
      headers:{
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      body:{
        firstname: this.state.firstName.trim(),
        surname: this.state.surname.trim(),
        gender: this.state.gender.trim(),
        email: this.state.email.trim(),
        password: this.state.password.trim(),
        address: this.state.address.trim(),
        about: this.state.about.trim(),
        collection: [],
        profile_image: this.state.picture.trim()
      },
      json: true
    };

    let _ = this
    request(options, function(error, response, body){
      if(error) throw new Error(error);
      sessionStorage.setItem('userId', body.id);
      if(response.statusCode == 201){
        setTimeout(() => _.setState({status : 'success'}), 1000)
      }
    });

  }

  buildButton(){
    let content;
    if (this.state.status == 'signUp'){
      content = <Button basic type='submit' onClick={this.handleSubmit.bind(this)}>SignIn</Button>
    };
    if (this.state.status == 'check'){
      content = <Button basic loading>Loading</Button>
    };
    if (this.state.status == 'success'){
      content = <Link to='app' ><Button basic color='green'>Success</Button></Link>
    }
    return content;
  }

  render(){
    return(<div>
      <Container textAlign='center'>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='First name' name='firstName' placeholder='First name' onChange={this.handleChange} />
            <Form.Input label='Last name' name='surname' placeholder='Last name' onChange={this.handleChange} />
            <Form.Select label='Gender' options={options} placeholder='Gender' name='gender' onChange={this.handleGender} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label='Email' name='email' placeholder='Email Address' onChange={this.handleChange} />
            <Form.Input type='password' name='password' label='Password' placeholder='Password' onChange={this.handleChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input type='address' name='address' label='Address' placeholder='Address' onChange={this.handleChange} />
            <Form.Input type='picture' name='picture' label='Profile Image' placeholder='Profile Picture' onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea label='About' name='about' placeholder='Tell us more about you...' onChange={this.handleChange}/>
          {this.buildButton()}
        </Form>
      </Container>
      </div>
    )
  }
}

export default SignUp