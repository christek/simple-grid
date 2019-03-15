import React, { Component } from 'react';
import './App.css';

import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid columnDefs={[{
          headerName: "Id", field: "id"
        },{
          headerName: "CompanyName", field: "CompanyName"
        }, {
          headerName: "Address", field: "Address"
        }, {
          headerName: "City", field: "City"
        }, {
          headerName: "State", field: "State"
        }, {
          headerName: "Zipcode", field: "Zipcode"
        }, {
          headerName: "Phone", field: "Phone"
        }, {
          headerName: "Fax", field: "Fax"
        }, {
          headerName: "Website", field: "Website"
        }]} />
      </div>
    );
  }
}

export default App;
