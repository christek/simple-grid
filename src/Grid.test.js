import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { shallow, mount } from 'enzyme';
import Grid from './Grid';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Grid />, div);
    ReactDOM.unmountComponentAtNode(div);
});


it('shows loading message by default', () => {
    // Render a checkbox with label in the document
    const grid = shallow(<Grid columnDefs={[{
        headerName: "Id", field: "id"
    }, {
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
    expect(grid.html()).toEqual('<div>Loading...</div>');
});


xit('when rendering Grid, fetch is called once', done => { // 1
    // https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Grid />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    //expect(global.fetch).toHaveBeenCalledWith('http://localhost:3004/data?_page=1&_limit=undefined&_sort=undefined');

    process.nextTick(() => { // 6
        global.fetch.mockClear(); // 7
        done(); // 8
    });
});

it('when rendering Grid, fetch is called once', done => { // 1
    // https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
    const mockSuccessResponse = {
        "data": [
          {
              "id": 1,
              "CompanyName": "Super Mart of the West",
              "Address": "702 SW 8th Street",
              "City": "Bentonville",
              "State": "Arkansas",
              "Zipcode": 72716,
              "Phone": "(800) 555-2797",
              "Fax": "(800) 555-2171",
              "Website": "http://www.nowebsitesupermart.com"
          }]};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Grid columnDefs={[{
        headerName: "Id", field: "id"
    }, {
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

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3004/data?_page=1&_limit=10&_sort=id&_order=asc');

    console.log(wrapper.html());

    process.nextTick(() => { // 6
        global.fetch.mockClear(); // 7
        done(); // 8
    });

    expect(wrapper.html()).toEqual('<div>Loading...</div>');
});
