import React, { Component } from 'react';
import './Grid.css';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 1,
      totalCount: 0,
    };

    this.incrementPagination = this.incrementPagination.bind(this);
    this.decrementPagination = this.decrementPagination.bind(this);
    this.changePagination = this.changePagination.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    fetch(`http://localhost:3004/data?_page=${this.state.page}`).then((res) => {
      console.log(res.headers.get( 'X-Total-Count' ));
      this.setState({
        totalCount: parseInt(res.headers.get( 'X-Total-Count' ))
      });
      return res;
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  incrementPagination() {
    if (this.state.page * 10 < (Math.ceil((this.state.totalCount+1)/10)*10)) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchData();
      });
    }
  }

  logKey(event) {
    console.log(event.target.key); // combine this into one object
    console.log(event.target.id);
  }

  decrementPagination() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        this.fetchData();
      });
    }
  }

  changePagination(event) {
    if (!(parseInt(event.target.value) * 10 <= (Math.ceil((this.state.totalCount+1)/10)*10))) return;
    if (event.target.value === '') return; 
    this.setState({ page: parseInt(event.target.value) }, () => {
      this.fetchData();
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table>
          <tbody>
          <tr>
            {this.props.columnDefs.map(item => (
              <th key={item.headerName}>{item.headerName}</th>
            ))}
          </tr>
          {items.map(item => (
            <tr key={item.id}>
              {Object.keys(item).map(key => (<td key={key} onClick={this.logKey} id={item.id}>{item[key]}</td>))}
            </tr>
          ))}
          <tr>
            <td>
              <input type="button" name="increment" value="-" onClick={this.decrementPagination} />
              <input type="text" name="pagination" value={this.state.page} onChange={this.changePagination} />
              <input type="button" name="decrement" value="+" onClick={this.incrementPagination} />
            </td>
          </tr>
          </tbody>
        </table>
      );
    }
  }
}