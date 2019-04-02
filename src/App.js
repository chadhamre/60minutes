import React, { Component } from "react";
import "./App.css";
import "./skeleton.css";
const _ = require("underscore");

class App extends Component {
  constructor() {
    super();
    this.state = {
      investor: {},
      investors: [],
      filtered: [],
      fields: [
        "Firstname",
        "Lastname",
        "Firmname",
        "Position",
        "Minimum",
        "Target",
        "Maxium"
      ]
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
    investors.push(this.state.investor);
    this.setState({ investors: investors, filtered: investors });
    this.setState({ investor: {} });
    document.getElementById("intake").reset();
  };

  // sort list of investors
  sortBy = field => {
    //TODO: geralize
    this.setState({ filtered: this.state.investors });
    let data = this.state.filtered;
    let sorted = _.sortBy(data, item => item[field]);
    this.setState({ filtered: sorted });
  };

  // capture input text on change
  onFilter = e => {
    let filtered = this.state.investors.map(item => {
      let found = false;

      this.state.fields.forEach(field => {
        if (item[field]) {
          if (
            item[field].toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1
          )
            found = true;
        }
      });
      if (found) return item;
    });
    this.setState({ filtered: filtered });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="one-third column">{this.renderForm()}</div>
          <div className="one-half column">{this.renderTable()}</div>
        </div>
      </div>
    );
  }

  renderForm = () => {
    return (
      <div>
        <form id="intake">
          {this.state.fields.map(field => {
            return (
              <div key={field}>
                <label>{field}</label>
                <input
                  type="text"
                  placeholder={field}
                  name={field}
                  id={field}
                  onChange={this.onChange}
                />
              </div>
            );
          })}
          <div>
            <button className="button-primary" onClick={e => this.onSubmit(e)}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };

  renderTable = () => {
    return (
      <div>
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
          </div>
        </div>
      );
  };

  renderList = () => {
    if (this.state.filtered.length)
      return (
        <div>
          {this.renderHeadings()}
          {this.renderBody()}
        </div>
      );
  };

  renderHeadings = () => {
    return this.state.fields.map(field => {
      return (
        <th>
          <a className="filter" key={field} onClick={e => this.sortBy(field)}>
            {field}
          </a>
        </th>
      );
    });
  };

  renderBody = () => {
    return this.state.filtered.map(item => <tr>{this.renderCell(item)}</tr>);
  };

  renderCell = item => {
    return this.state.fields.map(field => {
      if (item) {
        if (item[field]) return <td>{item[field]}</td>;
        else return <td />;
      }
    });
  };
}

export default App;
