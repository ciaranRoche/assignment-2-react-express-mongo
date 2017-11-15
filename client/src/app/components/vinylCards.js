import React, {Component} from 'react';
import {Card, Icon, Image, Container, Button} from 'semantic-ui-react';
import {Link} from 'react-router';
import Loading from './Loading';
import _ from 'lodash';

const request = require('request-promise');

class VinylCards extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
    this.handleLike = this.handleLike.bind(this)
  }

  handleLike(e){
    e.preventDefault();
    this.props.likeHandler(e.target.value, e.target.name)
  }

  buildButton(id, likes){
    let content;
    let home = <Button basic color='blue' onClick={this.handleLike} name={id} value={likes}>
          <i className="thumbs outline up icon"></i>
          {likes} 
        </Button>
    let profile = <div><b>Likes :</b> {likes}</div>

    this.props.location == 'home' ? content = home : content = profile
    
    return content
  }

  buildCards(){
    let imageStyle = {
      height:'200px',
      width:'100%'
    }
    let albums = _.sortBy(this.props.vinyls, function(vinyl){
      return -vinyl.likes
    })
    return albums.map((data) => {
      return <Card key={data.id}>
        <Link to={'album/' + data.id}><Image src={data.image} style={imageStyle}/></Link>
        <Card.Content>
          <Card.Header>
            <Link to={'album/' + data.id}>{data.album}</Link>
          </Card.Header>
          <Card.Description>
            <p><b>Artist : </b>{data.artist}</p>
            <p><b>Released : </b>{data.year}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        {this.buildButton(data.id, data.likes)}
        </Card.Content>
      </Card>
    })
  }

  buildContent(){
    let content;
    if(this.props.vinyls == 0){
      content = <div><Loading/></div>
    }else{
      content = <div>
        <Card.Group stackable itemsPerRow={3}>
          {this.buildCards()}
        </Card.Group>
      </div>
    }
    return content;
  }

  render(){
    return(
      <div>
      {this.buildContent()}
      </div>
    )
  }
}

export default VinylCards;