import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Button from './components/Button';
import Table from './components/Table';


const DEFAULT_QUERY = 'redux'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id; 
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ 
      // result: Object.assign({}, this.state.result, { hits: updatedHits })
      result: { ...this.state.result, hits: updatedHits }
    });
  }


  render() {
    console.log(this.state)
    const { searchTerm, result } = this.state;

    if (!result) { return null; }
    return (
      <div className="page">
        <div className="interactions">        
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
              Search
          </Search>
          
          { result &&
            <Table 
              list={result.hits}
              pattern={searchTerm}
              onDismiss={this.onDismiss}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
