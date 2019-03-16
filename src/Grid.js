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
      };

      this.incrementPagination = this.incrementPagination.bind(this);
      this.decrementPagination = this.decrementPagination.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
      console.log(this.state.page);
      fetch(`http://localhost:3004/data?_page=${this.state.page}`).then((res) => {
        console.log(this.state.page);
        return res;
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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
      ).then(() => {
        console.log('done fetching');
      })
    }

    incrementPagination() {
      this.setState({page: this.state.page+1});
      console.log('set state done');
      this.fetchData();
    }

    decrementPagination() {
      this.setState({page: this.state.page-1});
      this.fetchData();
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
            <tr>
            {this.props.columnDefs.map(item => (
                <th>{item.headerName}</th>
            ))}
            </tr>
            {items.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => (<td>{item[key]}</td>))}
              </tr>
            ))}
            <tr>
               <td>
                 <input type="button" name="name" value="-" onClick={this.decrementPagination} />
                 <input type="button" name="name" value="+" onClick={this.incrementPagination} />
               </td>
            </tr>
          </table>
        );
      }
    }
  }