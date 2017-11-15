import React, {Component} from 'react';
import {Link} from 'react-router';
import {Divider, Icon} from 'semantic-ui-react';
import styles from '../assets/style.css';



class Footer extends Component{
  render(){
    return(<div>
        <div className='ui vertical segment'>
        <Divider/>
          <Link to='app'><span>Home</span></Link> | <Link to='/about'><span>About</span></Link> | <Link to='/profile'><span>Profile</span></Link> | <Link to='/add'><span>Add Album</span></Link>
          <p><Icon name='pied piper alternate' size='large' color='green' /></p>

      </div>
    </div>
    )
  }
}

export default Footer;