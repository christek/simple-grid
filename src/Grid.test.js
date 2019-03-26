import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';




import Grid from './Grid';
import ColumnSorter from './ColumnSorter';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Grid />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  

test('desc', () => {
  // Render a checkbox with label in the document
  const grid = shallow(<Grid columnDefs={[{
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
  }]}
  pageSize={10}
  sortCol={"id"}
  />);

  expect(grid.find(ColumnSorter)).to.have.lengthOf(9);
});