import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GridLayout from 'react-grid-layout';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class MyPokemon extends Component {
  componentDidMount() {
    this.load(this.props.pokeNum)
  }

  load(pokeNum) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokeNum + '/'
    console.log(url);
    fetch(url).then(
    results => {return results.json();}).then(data => {
      console.log(data)
      this.setState({
        name: capFirst(data['name']),
        img: data['sprites']['front_default']
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    // Prevent an unneeded render
    if (nextProps.pokeNum) {
      this.load(nextProps.pokeNum)
    }
  }

  render() {
    console.log(this);
    if (!this.state) { return (<div>Loading...</div>) }
    return (<div><div>{this.state.name}</div><div><img src={this.state.img} /></div></div>)
  }
}

class MyInput extends Component {

  render() {
    return (
      <input value={this.props.pokeNum} onChange={evt => this.props.update(evt)}/>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeNum: '2'
    }
  }

  updatePokeNum(e) {
    let num = e.target.value.replace ( /[^\d.]/g, '' );
    this.setState({pokeNum: num})
  }

  render() {
    return (
      <div className="App">
	    <MyPokemon pokeNum={this.state.pokeNum}/>
        <MyInput pokeNum={this.state.pokeNum} update={this.updatePokeNum.bind(this)}/>
      </div>
    );
  }
}

export default App;
