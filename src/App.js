import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_BASE}${PARAM_SEARCH}${DEFAULT_QUERY}`

class App extends Component {
  render() {
    return (
      <div className="App">
       
      </div>
    );
  }
}

export default App;
