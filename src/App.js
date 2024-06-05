import React, { Component } from "react";
import "./App.css";
export class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchField: "",
      imagefield: 0,
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resourse) => resourse.json())
      .then((result) =>
        this.setState(() => {
          return { users: result };
        })
      );
  }
  onSearchChange = (event) => {
    const searchData = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField: searchData };
    });
  };
  onImageChange = (event) => {
    const ImageData = event.target.value;
    this.setState(() => {
      return { imagefield: ImageData };
    });
  };

  render() {
    console.log(this.state.users);
    const filteredUser = this.state.users.filter((user) => {
      return user.name.toLocaleLowerCase().includes(this.state.searchField);
    });

    return (
      <div>
        <h1 className="app-title">FRIENDS</h1>
        <input
          type="search"
          placeholder="search"
          className="searchBox"
          onChange={this.onSearchChange}
        />
        <input
          type="number"
          placeholder="Enter a number to change images"
          className="number"
          onChange={this.onImageChange}
        />
        {filteredUser.length > 0 ? (
          <div className="card-list">
            {filteredUser.map((user) => (
              <div className="card-container" key={user}>
                <div>
                  <img
                    src={`https://robohash.org/${user.id}?set=set${this.state.imagefield}`}
                    className="img"
                  />
                </div>
                <div className="names">
                  <h3>{user.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>Search Not Found</h1>
        )}
      </div>
    );
  }
}

export default App;
