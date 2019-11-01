
// ------------------------------ IMPORTS


// *    Library imports
import React, { Component } from "react";
import PropTypes from 'prop-types';


// *    Component imports

// *    Style imports

import './styles.css';


// ----------------------------- END IMPORTS

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peoples: [
        { name: "Tyagi", age: 41, height: 4.6 },
        { name: "Joshi", age: 24, height: 6.6 },
        { name: "Prakash", age: 24, height: 5.6 },
        { name: "Kumar", age: 24, height: 6 },
        { name: "Belle", age: 30, height: 11 }
      ],
      sortType: '',
      sortColumn: '',
      searchValue: ''
    }
  }



  // --------------------------------------------------------- listeners


  onSort = (column) => {
    const { peoples, sortType, sortColumn } = this.state;
    if (column != "name") {
      this.setState({
        peoples: sortType === 1 && sortColumn === column ? peoples.sort((a, b) => b[column] - a[column]) : peoples.sort((a, b) => a[column] - b[column]),
        sortType: sortType === 1 && sortColumn === column ? 0 : 1,
        sortColumn: column
      });
    }
    else {
      this.setState({
        peoples: sortType === 1 && sortColumn === column ? peoples.sort((a, b) => a[column].localeCompare(b[column])).reverse() : peoples.sort((a, b) => a[column].localeCompare(b[column])),
        sortType: sortType === 1 && sortColumn === column ? 0 : 1,
        sortColumn: column
      });
    }
  };

  onChangeHandler = (event) => {
    this.setState({
      searchValue: event.target.value
    });
  };

  // --------------------------------------------------------- render
  render() {
    const { peoples, sortType, sortColumn, searchValue } = this.state;
    let filteredList = [];

    if (searchValue) {
      filteredList = peoples.filter(people => {
        return people.name.toString().toLowerCase().indexOf(searchValue) !== -1 || people.age.toString().toLowerCase().indexOf(searchValue) !== -1 || people.height.toString().toLowerCase().indexOf(searchValue) !== -1
      });
    }
    else {
      filteredList = peoples
    }

    return (
      <div className="app-wrapper">
        <h1>Sorting and Searching</h1>
        <input type="text" value={searchValue} onChange={this.onChangeHandler} placeholder={"Type name or age or height"} />
        <table>
          <thead>
            <tr>
              <th onClick={() => this.onSort('name')}>Name<span>↕️</span></th>
              <th onClick={() => this.onSort('age')}>Age<span>↕️</span></th>
              <th onClick={() => this.onSort('height')}>Height<span>↕️</span></th>
            </tr>
          </thead>
          <tbody>
            {
              filteredList.map((people, index) => {
                return (
                  <tr>
                    <td>{people.name}</td>
                    <td>{people.age}</td>
                    <td>{people.height}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}


App.propTypes = {

};


App.defaultProps = {

};

export default App;