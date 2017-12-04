# Assignment 1 - ReactJS app.
Name: Ciaran Roche

## Overview.
![logo](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/logo.png)

The app titled 'Pied Piper' is a database for vinyl albums. The idea is to allow users add albums and maintain the database, while also giving users their own collection to maintain.
The single page app is a react app, compiled by webpack using a babel loader. For the back end a json-server is used, to provide CRUD endpoints.
On loading of the app, A user must sign in or create a profile before gaining access to the application.
Once user sign's in, the home page shows a list of albums from the database, which are ordered by popularity. A user can also search the list by artist name. This list of albums are hyperlinked bringing the user to the album page, where they can leave a review, add it to the collection or delete the album.
There is also a profile page which shows the users profile, their details and their collection of albums

#### User Features

 + Sign In 
 + Sign Up
 + Like an Album
 + Review an Album
 + Add an Album
 + Search Albums by Artist
 + Delete Album
 + Add Album to a Collection

## Installation requirements.
 #### Software user to develop the app
+ ReactJS - ^16.0.0
+ React-Dom - ^16.0.0
+ React-Router - ^3.2.0
+ Request-Promise - ^4.2.2
+ Semantic-UI-React - ^0.75.0
+ Babel-Core - ^6.26.0
+ Babel-Loader - ^7.1.2
+ Babel-Preset_es2015 - ^6.24.1
+ Babel-Preset-React - ^6.24.1
+ Babel-Preset-Stage-2 - ^6.24.1
+ Css-Loader - ^0.28.7
+ Json-Loader - ^0.5.7
+ Json-Server - ^0.12.0
+ Style-Loader - ^0.19.0
+ Webpack - ^3.6.0
+ Webpack-Combine-Loaders - ^2.0.3
+ Webpack-Dev-Server - ^2.9.1

Ensure an instance of mongoDB is running locally

Clone Project and `cd` into the `client` directory.
```
$ npm install
$ npm start
```
Open a seperate terminal and `cd` into the `server` directory
```
$ npm install
// run seed
$ npm run-script seed
$ npm start
```
To run tests on the express server, `cd` into the `server` directory
```
$ npm test
```

The SPA is hosted at the webpack default server of 8080

## Data Model Design.
The Json server is comprised of two entities, vinyl and users, and example of both can be seen below
#### vinyl
```json
{
  "vinyl": [
    {
      "id": 0,
      "artist": "Sleep",
      "album": "Holy Mountain",
      "image": "https://s3-eu-west-1.amazonaws.com/piedpipervinyl/sleep.jpg",
      "genre": "Doom",
      "year": 1992,
      "notes": "Sleeps Holy Mountain is the second studio album by the American band Sleep.It was released in November1992 in Europe, and March1993 in the USA through Earache Records.",
      "likes": 18,
      "reviews": [
        {
          "user": 1,
          "name": "Gardner",
          "date": "5/7/17",
          "image": "https://randomuser.me/api/portraits/men/11.jpg",
          "summary": "Love this album"
        },
        {
          "user": 2,
          "name": "Sondra",
          "date": "18/8/17",
          "image": "https://randomuser.me/api/portraits/women/13.jpg",
          "summary": "My Favorite Album"
        }
      ]
    },
```
#### users
```json
  "users": [
    {
      "id": 1,
      "firstname": "Gardner",
      "surname": "Golden",
      "gender": "male",
      "email": "gardnergolden@earwax.com",
      "password": "sit",
      "address": "729 Benson Avenue, Ballico, Mississippi, 4383",
      "about": "Adipisicing excepteur ea consectetur aliquip. Qui do tempor sit nostrud do Lorem eu. Magna do enim ipsum minim reprehenderit ipsum deserunt Lorem id ex pariatur ipsum. Est ex voluptate sunt dolor ut culpa nulla ea ullamco deserunt culpa officia aliquip mollit.\r\n",
      "collection": [
        9,
        8,
        3,
        2,
        5
      ],
      "profile_image": "https://randomuser.me/api/portraits/men/11.jpg"
    },
```

## App Component Design.

![image](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/state-diagram.png)

## UI Design.
#### login page
![image3](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/login.png)
___
#### sign up page
![image4](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/signup.png)
___
#### home page
![image5](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/home.png)
___
#### about page
![image6](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/about.png)
___
#### profile top half
![image7](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/profile1.png)
___
#### profile bottom half
![image8](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/profile2.png)
____
#### add top half
![image9](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/add1.png)
___
#### add bottom half
![image10](https://s3-eu-west-1.amazonaws.com/piedpipervinyl/screens/add2.png)

## Routing.


+ / - displays Landing Page (signin/signup)
+ /app/ - displays main app (header/footer/children)
+ /about/ - displays about page
+ /profile/ - displays logged in user
+ /add/ - displays add album page
+ /album/:id - displays particular album based on id


## Extra features
This app includes a webpack config which is an extra feature to the original spec of the assignment. In this config file, it bundles up all the react js files along with any associated css and compiles them using a babel loader, a css loader and a style loader

## Independent learning.
As can be seen in the commit history on this repo, the project went through a good few changes and iterations. Firstly I researched and used different types of React routing, I settled for the older react-router due to being able to use IndexRoute, overusing the react router dom has a handy Redirect feature.
Next, I threw my hand at webpack and wrote a config file to compile the javascript. This was time-consuming and lead to many problems, but through the problems, it forced me to get a better understanding of webpack.
I also researched Redux, but due to time I abandoned this idea, the research and examples can be seen at this [repo here.](https://github.com/ciaranRoche/redux-react-basics)










