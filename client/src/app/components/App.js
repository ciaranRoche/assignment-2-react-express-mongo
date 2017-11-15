import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import HeaderComponent from './Header';
import Footer from './Footer';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(<div>
        <Container textAlign='center'>
          <HeaderComponent/>
        </Container>
          {this.props.children}
        <Container textAlign='center'>
          <Footer/>
        </Container>;
      </div>
    )
  }
};

export default App;
