import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class LambdaCall extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = (api) => (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then((response) => response.json())
      .then((json) => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;

    return (
      <p>
        <button onClick={this.handleClick("generate-lorem-ipsum")}>
          {loading ? "Loading..." : "Generate Lorem Ipsum"}
        </button>
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaCall />
        </header>
      </div>
    );
  }
}

export default App;
