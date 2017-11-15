import React, {Component} from 'react';
import {Link} from 'react-router';
import {Container, Image, Grid, Segment, Rail, Sticky, Header, Icon, Feed, Form, TextArea, Radio, Button, Divider, Confirm} from 'semantic-ui-react';
import Loading from './Loading';

const request = require('request-promise')


class Album extends Component{
  constructor(props){
    super(props);
    this.state = {
      id : '',
      artist : '',
      album : '',
      image : '',
      genre : '',
      year : '',
      notes : '',
      likes : 0,
      reviews : [],
      user : [],
      userReview : '',
      status : 'collection',
      open: false
    }
    this.handleReview = this.handleReview.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
    this.handleCollection = this.handleCollection.bind(this);
  }

  componentDidMount(){
  var options = { method: 'GET',
    url: 'http://localhost:3000/vinyl/' + this.props.params.id,
    headers: 
    { 
      'cache-control': 'no-cache',
      'content-type': 'application/json' } };
  let _ = this;
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let album = JSON.parse(body)
    if(response.statusCode == 200){
      _.setState({
        id : album.id,
        artist : album.artist,
        album : album.album,
        image : album.image,
        genre : album.genre,
        year : album.year,
        notes : album.notes,
        likes : album.likes,
        reviews : album.reviews
      })
    }
  }).then(() => {
    var options = { method: 'GET',
      url: 'http://localhost:3000/users/' + sessionStorage.getItem('userId'),
      headers: 
      {
        'cache-control': 'no-cache',
        'content-type': 'application/json' }};

    let _ = this;
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode == 200){
        body = JSON.parse(body)
        _.setState({
          user:body
        })
      }
    });
  });
}

  handleCollection(e){
    e.preventDefault();
    this.setState({
      status:'check'
    })
    this.state.user.collection.push(this.state.id)
    let options = { method: 'PATCH',
      url: "http://localhost:3000/users/" + this.state.user.id,
      headers: 
      { 'postman-token': 'c0777f44-572d-7e52-9c75-851c819ccb95',
        'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body: { collection: this.state.user.collection },
      json: true };

    let _ = this;  
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode == 200){
        setTimeout(() => _.setState({status : 'success'}), 1000)
      }
    });
  }

  handleReview(e){
    this.setState({userReview: e.target.value})
  }

  handleSubmitReview(e){
    e.preventDefault();
    let d = new Date();
    let date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    let newReview = {
      "user": this.state.user.id, 
      "name" : this.state.user.firstname, 
      "date" : date, 
      "image" : this.state.user.profile_image,
      "summary" : this.state.userReview
    }
    this.state.reviews.push(newReview)

    var options = { method: 'PATCH',
      url: 'http://localhost:3000/vinyl/' + this.state.id,
      headers: 
      { 
        'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body: 
      { reviews: this.state.reviews },
      json: true };

    let _ = this;
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode == 200){
        _.setState({
          userReview: ''
        })
      }
    });
  }

  leaveReview(){
    let content;
    if(sessionStorage.getItem('userId') == null){
      content = <div></div>
    }else{
      content = <div>
        <Form>
          <Form.Field control={TextArea} label='Leave A Review' placeholder='Tell us if you like the album...' onChange={this.handleReview} />
          <Button basic onClick={this.handleSubmitReview}>Submit</Button>
        </Form>
      </div>
    }
    return content
  }

  buildReviews(){
    let content;
    if(this.state.reviews.length == 0){
      content = <div></div>
    }else{
      content = <div>
        <h3>Reviews</h3>
        <Feed events={this.state.reviews} />
      </div>
    }
    return content
  }

  buildCollection(){
    let content;
    let status = this.state.status;
    if(status == 'collection'){
      content = <Button basic onClick={this.handleCollection}>Add To Collection</Button>
    }
    if(status == 'check'){
      content = <Button basic loading>Loading</Button>
    }
    if(status == 'success'){
      content = <Link to='/profile'><Button basic color='green'>Album Added</Button></Link>
    }
    return content;
  }

  show = () => this.setState({ open: true })
  handleConfirm = () => {
    var options = {
      method: 'DELETE',
      url: 'http://localhost:3000/vinyl/' + '/' + this.state.id,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      }
    };
    let _ = this;
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode == 200){
        _.setState({ 
          open: false,
          album : ''
        })
      }
    });
  }
  handleCancel = () => this.setState({ open: false })

  buildDelete(){
    return(
      <div>
        <h3>Danger Zone</h3>
        <Button basic color='red' onClick={this.show}>Delete</Button>
        <Confirm
          open={this.state.open}
          header='Delete Album :('
          content='Are you sure you want to kill off this album?'
          cancelButton='No not yet'
          confirmButton="Let's do it"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }


  render(){
    if(this.state.album == ''){
      return(
        <Container textAlign='center'>
          <h1>Aww No Dog, Nothing to Show</h1>
          <Link to='app'><Button basic>Return</Button></Link>
        </Container>
      )
    }
    return(
      <div>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={10}>
                <Image fluid src={this.state.image}/>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header as='h1'>
                  {this.state.artist}
                  <Header.Subheader>
                    {this.state.album}
                  </Header.Subheader>
                </Header>
                  <p><b>Genre : </b>{this.state.genre}</p>
                  <p><b>Released : </b>{this.state.year}</p>
                  <p><b>About : </b>{this.state.notes}</p>
                  <p><b>Likes : </b>{this.state.likes}</p>
                  {this.buildCollection()}
                  <Divider/>
                  {this.buildReviews()}
                  {this.leaveReview()}
                  <Divider/>
                  {this.buildDelete()}
              </Grid.Column>
            </Grid.Row>
            
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Album;