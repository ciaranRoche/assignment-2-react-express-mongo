import React, {Component} from 'react';
import {Link} from 'react-router';
import {Container, Form, Image, Button} from 'semantic-ui-react';


const request = require('request-promise');

class AddAlbum extends Component{
  constructor(props){
    super(props);
    this.state = {
      artist : '',
      album : '',
      genre : '',
      year : '',
      image : '',
      note : '',
      likes : 0,
      review : [],
      status : 'add'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    const name = event.target.name;
    this.setState({[name] : event.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({status: 'check'})
    let a = this.state.artist.trim();
    let al = this.state.album.trim();
    let i = this.state.image.trim();
    let g = this.state.genre.trim();
    let y = this.state.year.trim();
    let n = this.state.note.trim();
    let l = this.state.likes;
    let r = this.state.review;
    if(!a || !al || !i || !g || !y || !n){
      return;
    }
    var options = { method: 'POST',
      url: "http://localhost:3000/vinyl",
      headers: 
      { 
        'cache-control': 'no-cache',
        'content-type': 'application/json' },
      body: 
      { artist: a,
        album: al,
        image: i,
        genre: g,
        year: y,
        notes: n,
        likes: l,
        reviews: r },
      json: true };
    
    let _ = this;
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if(response.statusCode == 201){
        setTimeout(() => _.setState({status: 'success'}) ,1000);
      }
    });
  }

  buildButton(){
    let content;
    let status = this.state.status;
    if(status == 'add'){
      content = <Button basic onClick={this.handleSubmit}>Submit</Button>
    }
    if(status == 'check'){
      content = <Button basic loading>Loading</Button>
    }
    if(status == 'success'){
      content = <Link to='app'><Button basic color='green'>Success</Button></Link>
    }
    return content
  }

  buildImage(){
    let content;
    this.state.image != '' ? content = this.state.image : content = 'https://s3-eu-west-1.amazonaws.com/piedpipervinyl/cover1.jpg'
    return content
  }

  render(){
    const { value } = this.state
    return (<div>
        <Container textAlign='center'>
          <div className="ui vertical stripe center aligned segment">
            <div className='ui text container' style={{fontSize: '1.4rem', fontWeight: '2em'}}>
              <h1>Add an Album</h1>
              <p><b>Contribute</b> to the database.</p>
              <p><b>Add</b> an album </p>
              <p><b>Help</b> build a better collection</p>
            </div>
          </div>
        </Container>
        <Image src={this.buildImage()} fluid style={{height: '350px', margin:'40px 0'}}/>
        <Container textAlign='center'>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input label='Artist' name='artist' placeholder='Artist' onChange={this.handleChange} />
              <Form.Input label='Album' name='album' placeholder='Album' onChange={this.handleChange} />
              <Form.Input label='Genre' name='genre' placeholder='Genre' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Year' name='year' placeholder='Year' onChange={this.handleChange} />
              <Form.Input label='Image' name='image' placeholder='Image' onChange={this.handleChange} />
            </Form.Group>
            <Form.TextArea label='Note' name='note' placeholder='Tell us more about the album...' onChange={this.handleChange} />
            {this.buildButton()}
          </Form>
        </Container>
        </div>
    )
  }
}

export default AddAlbum;