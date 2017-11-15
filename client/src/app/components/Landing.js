import React, {Component} from 'react';
import {Container, Header, Image, Icon, Button} from 'semantic-ui-react';
import SignIn from './SignIn';
import SignUp from './SignUp';

class Landing extends Component{
  constructor(props){
    super(props);
    this.state = {
      signUpOption : false
    }
  }

  handleSignUp = () => {
    this.setState({signUpOption: true})
  }

  handleLogIn = () => {
    this.setState({signUpOption: false})
  }

  buildContent = () => {
    let content;
    this.state.signUpOption ? content = <SignUp/> : content = <SignIn/>
    return content
  }

  render(){
    return(<div>
      <Container textAlign='center'>
        <Header as='h1' icon textAlign='center'>
          <Icon name='pied piper alternate' size='massive' color='green' />
          <Header.Content>
            Welcome to Pied Piper
          </Header.Content>
            <Header.Subheader>
              The Internets No1 Content Website
            </Header.Subheader>
        </Header>
        <Button.Group>
          <Button onClick={this.handleSignUp}>Sign Up</Button>
          <Button.Or />
          <Button positive onClick={this.handleLogIn}>Log In</Button>
        </Button.Group>
        <br/><br/>
        {this.buildContent()}
      </Container>
      <br/>
      <Image fluid src='https://s3-eu-west-1.amazonaws.com/piedpipervinyl/cover2.jpeg' style={{height: '400px'}}/>
      </div>
    )
  }
}

export default Landing;