// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

//https://jsonplaceholder.typicode.com/posts

import React from "react";
import "./style.css";
import { useContext, useEffect } from "react";
import { createContext, useReducer, useState } from "react";

const reducer = (state, action) => {
  if (action.type == "Postdata") {
    return action.payload;
  }
};

const userData = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [Ele, setEle] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((res) => {
        dispatch({
          type: "Postdata",
          payload: res,
        });
      });
  }, []);

  let value = {
    state,
    ele: Ele,
    setEle: setEle,
  };

  return (
    <div className="App">
      <userData.Provider value={value}>
        <POSTList />
        <POSTDETAIL />
      </userData.Provider>
    </div>
  );
}

const POSTList = () => {
  const { state, setEle } = useContext(userData);
  console.log(state);

  const handlelist = (ele) => {
    setEle(ele);
  };

  return (
    <ul className="ul-list">
      {state.map((ele) => {
        return <li onClick={() => handlelist(ele)}>{ele.title}</li>;
      })}
    </ul>
  );
};

const POSTDETAIL = () => {
  const data = useContext(userData);
  const list = data.ele;

  return (
    <ul className="ul-body">
      <li>{list.id}</li>

      <li>{list.userId}</li>
      <li>{list.title}</li>
      <li>{list.body}</li>
    </ul>
  );
};
