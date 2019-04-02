import React, { Component } from "react";
import "./App.css";
import "./skeleton.css";
const _ = require("underscore");

class App extends Component {
  constructor() {
    super();
    this.state = {
      investor: {},
      investors: []
    };
  }

  // capture input text on change
  onChange = e => {
    const state = this.state;
    state.investor[e.target.name] = e.target.value;
    this.setState(state);
  };

  // save form data
  onSubmit = e => {
    e.preventDefault();
    // TODO: add form validation here
    let investors = this.state.investors;
    console.log(investors);
    investors.push(this.state.investor);
    this.setState({ investors: investors });
    this.setState({ investor: {} });
  };

  // sort list of investors
  sortBy = field => {
    //TODO: geralize
    let data = this.state.investors;
    let sorted = _.sortBy(data, item => item.Firstname);
    this.setState({ investors: sorted });
  };

  // capture input text on change
  onFilter = e => {
    console.log(e);
  };

  render() {
    return (
      <div>
        {this.renderForm()}
        {this.renderTable()}
      </div>
    );
  }

  renderForm = () => {
    console.log(this.state);
    return (
      <div className="container">
        <label>Firstname</label>
        <input
          type="text"
          placeholder="Firstname"
          name="Firstname"
          id="Firstname"
          onChange={this.onChange}
        />
        <label>Lastname</label>
        <input
          type="text"
          placeholder="Lastname"
          name="Lastname"
          id="Lastname"
          onChange={this.onChange}
        />
        <label>Firmname</label>
        <input
          type="text"
          placeholder="Firmname"
          name="Firmname"
          id="Firmname"
          onChange={this.onChange}
        />
        <label>Position</label>
        <input
          type="text"
          placeholder="Position"
          name="Position"
          id="Position"
          onChange={this.onChange}
        />
        <label>Minimum</label>
        <input
          type="text"
          placeholder="Minimum"
          name="Minimum"
          id="Minimum"
          onChange={this.onChange}
        />
        <label>Target</label>
        <input
          type="text"
          placeholder="Target"
          name="Target"
          id="Target"
          onChange={this.onChange}
        />
        <label>Maximum</label>
        <input
          type="text"
          placeholder="Maximum"
          name="Maximum"
          id="Maximum"
          onChange={this.onChange}
        />
        <div>
          <button className="button-primary" onClick={e => this.onSubmit(e)}>
            Save
          </button>
        </div>
      </div>
    );
  };

  renderTable = () => {
    return (
      <div className="container">
        {this.renderActions()}
        {this.renderList()}
      </div>
    );
  };

  renderActions = () => {
    if (this.state.investors.length)
      return (
        <div>
          <div>
            <div>Filter By:</div>
            <input
              type="text"
              placeholder="query"
              name="query"
              id="query"
              onChange={this.onFilter}
            />
            <div>Sort By:</div>
            <button onClick={e => this.sortBy("Firstname")}>Firstname</button>
            <button onClick={e => this.sortBy("Lastname")}>LastName</button>
            <button onClick={e => this.sortBy("FirmName")}>FirmName</button>
          </div>
        </div>
      );
  };

  renderList = () => {
    if (this.state.investors.length)
      return this.state.investors.map(item => <p>{JSON.stringify(item)}</p>);
  };
}

export default App;
