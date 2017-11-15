import React, {Component} from 'react';
import {Container,Image} from 'semantic-ui-react';

class About extends Component{
  render(){
    return(
      <div>
        <Container textAlign='center'>
        <div className="ui vertical stripe center aligned segment">
          <div className='ui text container' style={{fontSize: '1.4rem', fontWeight: '2em'}}>
            <h1>About Pied Piper</h1>
            <p><b>Discover</b> new music.</p>
            <p><b>Track</b> your collection.</p>
            <p><b>Contribute</b> to the database.</p>
          </div>
        </div>
        </Container>
        <Image src='https://s3-eu-west-1.amazonaws.com/piedpipervinyl/cover.jpg' fluid style={{height: '350px', margin:'40px 0'}}/>
        <Container textAlign='center'>
        <div className="ui vertical stripe center aligned segment">
          <div className="ui text container" style={{fontSize: '1.4rem', fontWeight: '2em'}}>
          <p>We're on a mission to build the biggest and most comprehensive music database and marketplace. Imagine a site with discographies of all labels, all artists, all cross-referenced, and an international marketplace built off of that database. It's for the love of music, and we're getting closer every day.</p>
          <p>We share a passion for listening to, creating, and/or studying music.</p>
          <p>We are proactive in our pursuit of continuous improvement and excellence in our people, projects, products, services, and software.</p>
          <p>Pied Piper is a collaborative effort that wouldn't be possible without a community of music obsessives focused on a common goal.</p>
          </div>
        </div>
        </Container>
        <Image src='https://s3-eu-west-1.amazonaws.com/piedpipervinyl/cover5.jpg' fluid style={{height: '350px', margin:'40px 0'}}/>
      </div>
    )
  }
}

export default About;