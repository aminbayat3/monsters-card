import { useState, useEffect, useRef } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]); // we can use destructuring because useState gives us back an array of two values
  const [searchField, setSearchField] = useState("");
  const [message, setMessage] = useState([]); // this is just for demonstrating why we need to use useEffect for filteredMonsters too. because for every render it's going to filter the monsters array again . you can just test that with a console.log.
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  const [count, setCount] = useState(1);
  const prevCount = useRef();

  //solution #1
  // useEffect(() => {
  //   console.log("useEffect");
  //   fetch("https://jsonplaceholder.typicode.com/users") // this users array is coming from an outside API and as we know objects and arrays are reference types meaning that everytime we say setSearchField it consider this array as a new one so the component gets re-rendered again eventhoug the array has the same value and that causes an infinit loop
  //     .then((response) => response.json())
  //     .then((users) => setMonsters(users)) //this setState is an asynchronous call so it's going to continue rendering the next useEffect, that's why we used setTimeout for the second useEffect
  //     .catch((error) => console.log(error));
  // }, []); // dependencies are most likely going to be state values or prop values

  // Solution # 2
  // useEffect(() => {
  //   let mounted = true;
  //   try {
  //     (async () => {
  //       const response = await fetch("https://jsonplaceholder.typicode.com/users");
  //       const users = await response.json();
  //       if(mounted) {
  //         setMonsters(users);
  //       }
  //     })();
  //   } catch(error) {
  //     console.log(error.message);
  //   }

  //   return () => mounted = false;
  // }, []);

  //Solution # 3
  useEffect(() => { 
    console.log('useEffect')
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      (async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", { signal });
        const users = await response.json();
        setMonsters(users);
      })();
    } catch(error) {
      if(error.name == 'AbortError') {
        console.log('fetch aborted!');
      } else {
        console.log('error occured', error.message);
      }
    }
    return () => {
      controller.abort();
      console.log('aborted')
    }

  }, []);

  useEffect(() => {
    let mounted = true;
    // if we don't use a useEffect for this it will get rerendered constantly because setState has an array.  if we wanna use the version that we used in class components without using a useEffect and setState, this line of code will get built unnecessarly.
    // since we cannot access the newFilteredMonsters array outside of this useEffect block we need to have another state property to handle this
    setTimeout(() => {
      console.log("the second useEffect");
      const newFilteredMonsters = monsters.filter((monster) => {
        return monster.name.toLowerCase().includes(searchField.toLowerCase());
      });
      if(mounted) {
        setFilteredMonsters(newFilteredMonsters);
      }
    }, 1000);

    return () => mounted = false;
  }, [ searchField, monsters ]);

  useEffect(() => {
    prevCount.current = count;
  }, [count])

  

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchField(value);
  };

  const handleClick = () => {
    setMessage(["amin"]);
  };

  const onHandleClick = () => {
    setCount(count + 1);
  }

  console.log("render");
  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <button onClick={handleClick}>Message</button>
      <button onClick={onHandleClick}>change Count</button>
      <p>Now: {count} Previous: {prevCount.current}</p>

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
