import { useState, useEffect, useRef, ChangeEvent } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import { getData } from "./utils/data.utils";
import "./App.css";

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [searchField, setSearchField] = useState(""); // we dont need to use a generic for this one because it can infer the type
  const [filteredMonsters, setFilteredMonsters] = useState(monsters); // it can also infer the type since we has set the type of monters before
  // const [count, setCount] = useState(1);
  // const prevCount = useRef();

  //Solution # 3
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      (async () => {
        const users = await getData<Monster[]>(
          "https://jsonplaceholder.typicode.com/users",
          signal
        );
        setMonsters(users); // never type is the opposite of any type
      })();
    } catch (error) {
      console.log("catch block");
      let message: string;
      error instanceof Error
        ? (message = error.message)
        : (message = String(error));
      console.log(message);
    }
    return () => controller.abort();
  }, []);

  useEffect(() => {
    // if we don't use a useEffect for this it will get rerendered constantly because setState has an array.  if we wanna use the version that we used in class components without using a useEffect and setState, this line of code will get built unnecessarly.
    // since we cannot access the newFilteredMonsters array outside of this useEffect block we need to have another state property to handle this
    // const timeoutId = setTimeout(() => {
      const newFilteredMonsters = monsters.filter((monster) => {
        return monster.name.toLowerCase().includes(searchField.toLowerCase());
      });

      setFilteredMonsters(newFilteredMonsters);
    // }, 1000);

    return () => {
      // clearTimeout(timeoutId);
    };
  }, [searchField, monsters]);

  // useEffect(() => {
  //   prevCount.current = count;
  // }, [count])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchField(value);
  };

  // const onHandleClick = () => {
  //   setCount(count + 1);
  // }

  console.log("render");
  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      {/* <button onClick={onHandleClick}>change Count</button> */}
      {/* <p>Now: {count} Previous: {prevCount.current}</p> */}
      <SearchBox
        className="monsters-search-box"
        value={searchField}
        type="search"
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;

// episode 67 is really important(it's about reflow), you need to watch that again *****************\
// reflow: occures when components being added or removed from the page(mount or unmount)
