import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, SetFilteredHeroes] = useState(heroes);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const getHeroes = async () => {
        const response = await fetch("https://swapi.py4e.com/api/people", {
          signal,
        });
        const people = await response.json();
        setHeroes(people.results);
      };

      getHeroes();
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("fetch aborted!");
      } else {
        console.log("error occured", error.message);
      }
    }

    return () => {
      controller.abort();
      console.log("aborted");
    };
  }, []);


  useEffect(() => {
    const newFilteredHeroes = heroes.filter((hero) => {
        return hero.name.toLowerCase().includes(searchField.toLowerCase());
    });
    SetFilteredHeroes(newFilteredHeroes);
  }, [searchField, heroes]);

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchField(value);
  };

  return (
    <div className="App">
      <h1 className="app-title">Star Wars Heroes</h1>
      <SearchBox
        className="monsters-search-box"
        value={searchField}
        type="search"
        placeholder="search Heroes"
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredHeroes} />
    </div>
  );
};

export default App;
