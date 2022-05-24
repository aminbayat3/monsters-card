import React from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      monsters : [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => ({monsters: users})))
      .catch((error) => console.log(error));
  }

  onSearchChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({searchField: value})); //there is also a wrong way for handling this without having searchField property in state
    //the second way(remember that we dont have searchField)
    // const filteredMonsters = this.state.monsters.filter((monster) => monster.name.toLowerCase().includes(value.toLowerCase()));

    // this.setState(() => ({monsters: filteredMonsters}))  // we are actually making the monsters array smaller and smaller
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => monster.name.toLowerCase().includes(searchField.toLowerCase()));
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>

        <SearchBox className='monsters-search-box' value={searchField} type='search' placeholder='search monsters' onChangeHandler={onSearchChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

}

export default App;
