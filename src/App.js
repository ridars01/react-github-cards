import React from 'react';
import './App.css';
const axios = require('axios')




class Form extends React.Component {
  userNameInput = React.createRef();
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.get(`https://api.github.com/users/${this.userNameInput.current.value}`);
      this.props.onSubmit(resp.data);
      this.userNameInput.current.value = '';
      // console.log('submitted');
      // console.log(this.userNameInput.current.value);
      // console.log(resp.data);
    } catch (error){
      console.error(error);
      console.log('Houston we have a problem!');
    }
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        placeholder="Github username" 
        ref={this.userNameInput} 
        required/>
        <button>Add card</button>
      </form>
    );
  }
}


const CardList = (props) => (
<div>
 {props.profiles.map(profile => <Card key= {profile.id} {...profile}/>)}
</div>
)




class App extends React.Component{
constructor(props) {
  super(props); 
    this.state = {
      profiles: []
    }; 
}

/*state = {
  profiles: testData
}*/

addNewProfileData = (profileData) =>{
  this.setState(prevState => ({profiles: [...prevState.profiles , profileData] , 
  })); 
  console.log('App' , profileData )
}

  render(){
    return (
    <div>
    <div className="header"> {this.props.title} </div>
     <Form onSubmit = {this.addNewProfileData}/>
     <CardList profiles={this.state.profiles} />
    </div>
    )
  }
}



class Card extends React.Component{
  render(){
    const profile = this.props; 
    return (
      <div className = "github-profile">
        <img src ={profile.avatar_url} />
        <div className = "info">
        <div className = "name">{profile.name}</div>
        <div className = "company">{profile.company}</div>
        </div>
      </div>
    )
  }
}

/*const App = ({title}) => (
  <div className="header">{title}</div>
)*/
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
/*
class ConditionalStyle extends React.Component{
  render(){
    return (
      <div style = {{color: Math.random() < 0.5 ? 'greenn' : 'red'}}> Looka te me . I change Colors</div>
    )
  }
}*/

export default App;
