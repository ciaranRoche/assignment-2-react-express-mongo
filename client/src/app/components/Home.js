import React, {Component} from 'react';
import {Card, Icon, Image, Container, Button, Input} from 'semantic-ui-react';
import {Link} from 'react-router';
import Loading from './Loading';
import VinylCards from './vinylCards';
import _ from 'lodash';

const request = require('request-promise')

class CardList extends Component{
  constructor(props){
    super(props);
    this.state = {
      vinyls : [],
      ogVinyls: []
    }
    this.searchVinyls = this.searchVinyls.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount(){
    this.getVinyl();
  }

  getVinyl(){
    var options = { method: 'GET',
      url: 'http://localhost:3000/vinyl/',
      headers: 
      { 'postman-token': 'b420fb08-a1ef-baeb-e41b-95f19338ab07',
        'cache-control': 'no-cache',
        'content-type': 'application/json' } };
    
    let _ = this;
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode == 200){
        let vinyl = JSON.parse(body);
        _.setState({
          vinyls : vinyl,
          ogVinyls : vinyl
        })
      }
    });
  }

  handleLike(like, id){
    let newLike = parseInt(like) + 1
    let newUrl = "http://localhost:3000/vinyl" + '/' + id
    let options = { method: 'PATCH',
      url: newUrl,
      headers: 
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body: { likes: newLike },
      json: true };
      let _ = this;
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if(response.statusCode == 200){
          _.getVinyl()
        }
      });
    
  }

  searchVinyls(e){
    let updatedVinyls = this.state.ogVinyls;
    updatedVinyls = updatedVinyls.filter(function (item){
      return item.artist.toLowerCase().search(
        e.target.value.toLowerCase()
      ) !== -1;
    });
    this.setState({vinyls : updatedVinyls})
  }

  render(){
    return(<div>
        <h1>Albums</h1>
        <Input fluid focus onChange={this.searchVinyls} placeholder='Search by Artist...' />
        <br/>
        <VinylCards vinyls={this.state.vinyls} likeHandler={this.handleLike} location='home'/>
      </div>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <Container textAlign='center'>
          <CardList/>
      </Container>
    )
  }
}

export default Home;