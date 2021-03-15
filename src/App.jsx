import React from "react";
import './App.css';

import Particles from 'react-particles-js';
import Clarifai from "clarifai";

import Navigation from "./components/Navigation/navigation.component";
import Logo from "./components/Logo/logo.component";
import Rank from "./components/Rank/rank.component";
import ImageLinkForm from "./components/ImageLinkForm/imageLinkForm.component";
import FaceRecognition from "./components/FaceRecognition/facerecognition.component"; 
import SignIn from "./components/Signin/signin.component";
import Register from "./components/Register/register.component";


const app = new Clarifai.App({
  apiKey: "44ed95665d944659b13c6e627a1a26f4"
})

const particleVar={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  userInput: "",
  imageUrl: "",
  box: {},
  route: "signin",
  user:{
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: new Date()
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");

    const width = Number(image.width);
    const height = Number(image.height);

    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({
      box: box
    });
  }

  onInputChange = (event) =>{
    const {value} = event.target;
    this.setState({
      userInput: value
    })
  }

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.userInput
    });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.userInput).then(
      (response) => {
        if(response){
          fetch('https://warm-inlet-91768.herokuapp.com/image',{
              method: "put",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: this.state.user.id
              })
          })
          .then(res => res.json())
          .then(count=> this.setState({
            user: {
              ...this.state.user,
              entries: count
            }
          }))
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      }
    ).catch(error => console.log(error));

    this.setState({
      userInput: ""
    })
  }

  routeChange = (page) => {
    if(page==="signin"){
      this.setState(initialState)
    }else{
      this.setState({
        route: page
      })
    }
  }

  render(){
    return (
      <div className="App">
        <Particles 
          className="particles"
          params={particleVar} />
        <Navigation onRouteChange={this.routeChange} page={this.state.route}/>
        {
        this.state.route === "home" ?
        ( <div>
            <Logo />
            <Rank name={this.state.user.name} rank={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} value={this.state.userInput}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        )
        :(
          this.state.route === "signin" ? 
            (<SignIn onRouteChange={this.routeChange} loadUser={this.loadUser}/>):
            (<Register onRouteChange={this.routeChange} loadUser={this.loadUser}/>)
        )
          
        }
      </div>
    );
  }
}

export default App;
