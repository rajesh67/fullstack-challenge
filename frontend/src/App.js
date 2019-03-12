import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PrimarySearchAppBar from "./_components/PrimarySearchAppBar";
import MediaCard from "./_components/MediaCard";
import ImageGridList from "./_components/ImageGridList";
// import TitleBarGridList from "./_components/TitleBarGridList";
import GutterGrids from "./_components/GutterGrids";
import FrontPage from "./_components/FrontPage";
import SignIn from "./Signin/SignIn";

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App">
          {/* <img src={logo} className="App-logo" alt="logo" />
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
          </a> */}
          <PrimarySearchAppBar />
        </header>
        <section id="body" style={{textAlign:"center"}}>
          {/* <MediaCard /> */}
          {/* <TitleBarGridList /> */}
          {/* <ImageGridList /> */}
          {/* <h1>Shop by department</h1> */}
          {/* <GutterGrids /> */}
        </section>

        <section id="shopByCategories">
          {/* <h1>Shop by category</h1> */}
          {/* <GutterGrids /> */}
          {/* <GutterGrids /> */}
        </section>

        <section id= "mainPage" style={{marginTop:65}}>
          {/* <Router>
          <div>
           
          </div>
          </Router> */}
          <FrontPage />
          {/* <div>
            <FrontPage />
          </div> */}

          {/* <div>
            <SignIn />
          </div> */}
        </section>
      </div>
    );
  }
}

export default App;
