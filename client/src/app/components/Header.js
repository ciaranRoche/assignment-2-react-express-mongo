import React, {Component} from 'react';
import {Menu, Segment, Header, Icon} from 'semantic-ui-react';
import {Link} from 'react-router'

class HeaderComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeItem: 'home',
    }
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render(){
    const {activeItem} = this.state
    let profileLink = 'profile/' + sessionStorage.getItem('userId')
    return(<div>
        <Header as='h1' icon textAlign='center'>
          <Icon name='pied piper alternate' size='massive' color='green' />
          <Header.Content>
            Welcome to Pied Piper
            <Header.Subheader>
              The Internets Vinyl Collection
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Menu stackable pointing secondary>
          <Menu.Item as={Link} to='app' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}/>
          <Menu.Item as={Link} to='about' name='About' active={activeItem === 'About'} onClick={this.handleItemClick}/>
          <Menu.Item as={Link} to='/profile' name='Profile' active={activeItem === 'Profile'} onClick={this.handleItemClick}/> 
          <Menu.Item as={Link} to='/add' name='Add Album' active={activeItem === 'Add Album'} onClick={this.handleItemClick}/>
        </Menu>
      </div>
    )
  }
}

export default HeaderComponent;