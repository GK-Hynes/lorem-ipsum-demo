import React, { Component } from "react";
import parse from "html-react-parser";
import triforce from "./Triforce.png";
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
        <button
          className="button"
          onClick={this.handleClick("generate-lorem-ipsum")}
        >
          {loading ? "Loading..." : "Generate Lorem Ipsum"}
        </button>

        <div className="lorem-ipsum-container">{msg && parse(msg)}</div>
      </p>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Generate some Zelda-themed lorem ipsum</h1>
          <img
            src={triforce}
            className="App-logo"
            alt="Triforce - from Wikimedia Commons"
          />
          <LambdaCall />
        </header>
      </div>
    );
  }
}

export default App;
